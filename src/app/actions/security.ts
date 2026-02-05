"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type SecurityConfigs = {
    compartilhar_rota: boolean;
    modo_noturno: boolean;
    localizacao_aproximada: boolean;
};

export async function getSecurityDataAction() {
    console.log("Ação: getSecurityDataAction iniciada");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.warn("getSecurityDataAction: Usuário não autenticado");
        return null;
    }

    console.log(`getSecurityDataAction: Buscando dados para o usuário ${user.id}`);

    // 1. Get configurations
    const { data: configs, error: configError } = await supabase
        .from("motorista_configuracoes")
        .select("*")
        .eq("motorista_id", user.id)
        .single();

    if (configError && configError.code !== 'PGRST116') {
        console.error("getSecurityDataAction: Erro ao buscar configs", configError);
    }

    // 2. Get all active memberships for the driver
    const { data: membership, error: memberError } = await supabase
        .from("seguranca_membros")
        .select("grupo_id")
        .eq("motorista_id", user.id)
        .eq("status", "ATIVO");

    if (memberError) {
        console.error("getSecurityDataAction: Erro ao buscar membros", memberError);
    }

    let groups = [];
    if (membership && membership.length > 0) {
        const groupIds = membership.map(m => m.grupo_id);
        console.log(`getSecurityDataAction: Usuário pertence a ${membership.length} grupos`);

        const { data: groupsData, error: groupFetchError } = await supabase
            .from("seguranca_grupos")
            .select("*, members:seguranca_membros(*)")
            .in("id", groupIds);

        if (groupFetchError) {
            console.error("getSecurityDataAction: Erro ao buscar grupos", groupFetchError);
        } else {
            groups = groupsData || [];
        }
    }

    const result = {
        configs: configs || {
            compartilhar_rota: true,
            modo_noturno: false,
            localizacao_aproximada: false,
        },
        groups,
        userId: user.id
    };

    console.log("getSecurityDataAction: Sucesso ao carregar dados");
    return result;
}

export async function updateSecurityConfigsAction(configs: Partial<SecurityConfigs>) {
    console.log("Ação: updateSecurityConfigsAction iniciada", configs);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    const { error } = await supabase
        .from("motorista_configuracoes")
        .upsert({
            motorista_id: user.id,
            ...configs,
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error("updateSecurityConfigsAction error:", error);
        throw error;
    }

    revalidatePath("/seguranca");
    console.log("updateSecurityConfigsAction: Sucesso");
}

export async function createSecurityGroupAction(nome: string) {
    console.log("Ação: createSecurityGroupAction iniciada", { nome });
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error("auth error:", authError);
        throw new Error("Sua sessão expirou. Faça login novamente.");
    }

    // Generate a simple 6-char random invite code
    const codigo_convite = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log(`Gerando grupo com código: ${codigo_convite}`);

    // 1. Create the group
    const { data: group, error: groupError } = await supabase
        .from("seguranca_grupos")
        .insert({
            nome,
            criador_id: user.id,
            codigo_convite
        })
        .select()
        .single();

    if (groupError) {
        console.error("createSecurityGroupAction: Erro ao criar grupo", groupError);
        throw new Error(`Erro no banco: ${groupError.message}`);
    }

    console.log("Grupo criado com sucesso. Adicionando criador como membro...");

    // 2. Add creator as a member
    const { error: memberError } = await supabase
        .from("seguranca_membros")
        .insert({
            grupo_id: group.id,
            motorista_id: user.id,
            status: "ATIVO"
        });

    if (memberError) {
        console.error("createSecurityGroupAction: Erro ao adicionar membro", memberError);
        throw new Error(`Grupo criado, mas erro ao ingressar: ${memberError.message}`);
    }

    console.log("Fluxo de criação finalizado com sucesso");
    revalidatePath("/seguranca");
    return group;
}

export async function joinSecurityGroupAction(codigo: string) {
    console.log("Ação: joinSecurityGroupAction iniciada", { codigo });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    // 1. Find the group
    const { data: group, error: groupError } = await supabase
        .from("seguranca_grupos")
        .select("id")
        .eq("codigo_convite", codigo.toUpperCase())
        .single();

    if (groupError || !group) {
        console.error("joinSecurityGroupAction: Grupo não encontrado", groupError);
        throw new Error("Código inválido ou grupo não encontrado");
    }

    // 2. Add as member
    const { error: memberError } = await supabase
        .from("seguranca_membros")
        .insert({
            grupo_id: group.id,
            motorista_id: user.id,
            status: "ATIVO"
        });

    if (memberError) {
        console.error("joinSecurityGroupAction: Erro ao ingressar", memberError);
        if (memberError.code === "23505") {
            throw new Error("Você já faz parte deste grupo");
        }
        throw new Error(`Erro ao entrar no grupo: ${memberError.message}`);
    }

    console.log("Ingressou no grupo com sucesso");
    revalidatePath("/seguranca");
    return { success: true };
}

export async function deleteSecurityGroupAction(groupId: string) {
    console.log("Ação: deleteSecurityGroupAction iniciada", { groupId });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    // 1. Verify if user is the creator
    const { data: group, error: groupError } = await supabase
        .from("seguranca_grupos")
        .select("criador_id")
        .eq("id", groupId)
        .single();

    if (groupError || !group) {
        throw new Error("Grupo não encontrado");
    }

    if (group.criador_id !== user.id) {
        throw new Error("Apenas o criador pode excluir o grupo");
    }

    // 2. Delete the group (cascades to members via foreign key)
    const { error: deleteError } = await supabase
        .from("seguranca_grupos")
        .delete()
        .eq("id", groupId);

    if (deleteError) {
        console.error("deleteSecurityGroupAction error:", deleteError);
        throw new Error(`Erro ao excluir grupo: ${deleteError.message}`);
    }

    revalidatePath("/seguranca");
    console.log("Grupo excluído com sucesso");
    return { success: true };
}

export async function leaveSecurityGroupAction(groupId: string) {
    console.log("Ação: leaveSecurityGroupAction iniciada", { groupId });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    // Remove the membership entry
    const { error: leaveError } = await supabase
        .from("seguranca_membros")
        .delete()
        .eq("grupo_id", groupId)
        .eq("motorista_id", user.id);

    if (leaveError) {
        console.error("leaveSecurityGroupAction error:", leaveError);
        throw new Error(`Erro ao sair do grupo: ${leaveError.message}`);
    }

    revalidatePath("/seguranca");
    console.log("Saiu do grupo com sucesso");
    return { success: true };
}

export async function triggerSOSAction(localizacao?: { lat: number, lng: number }) {
    console.log("Ação: triggerSOSAction iniciada", { localizacao });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    const { data: emergency, error } = await supabase
        .from("seguranca_emergencias")
        .insert({
            motorista_id: user.id,
            localizacao,
            status: "ATIVA"
        })
        .select()
        .single();

    if (error) {
        console.error("triggerSOSAction error:", error);
        throw new Error(`Falha ao disparar SOS: ${error.message}`);
    }

    console.log("SOS disparado com sucesso!", emergency.id);
    return emergency;
}

export async function resolveSOSAction(emergencyId: string) {
    console.log("Ação: resolveSOSAction iniciada", { emergencyId });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Não autorizado");

    const { error } = await supabase
        .from("seguranca_emergencias")
        .update({ status: "RESOLVIDA", updated_at: new Date().toISOString() })
        .eq("id", emergencyId)
        .eq("motorista_id", user.id);

    if (error) {
        console.error("resolveSOSAction error:", error);
        throw new Error(`Falha ao encerrar SOS: ${error.message}`);
    }

    console.log("SOS resolvido com sucesso");
    return { success: true };
}
