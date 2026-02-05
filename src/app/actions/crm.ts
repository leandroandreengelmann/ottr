'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type PassengerData = {
    id?: string
    nome: string
    telefone: string
    cpf?: string
    email?: string
    anotacoes?: string
}

export async function getPassengerAction(nome: string, telefone?: string) {
    if (!nome) return null

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Find passenger by name AND driver (and phone if provided)
    // We prioritize the CRM record over raw data
    let query = supabase
        .from('passageiros_crm')
        .select('*')
        .eq('motorista_id', user.id)
        .eq('nome', nome)

    if (telefone) {
        query = query.eq('telefone', telefone)
    }

    const { data, error } = await query.single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('Error fetching passenger:', error)
    }

    return data
}

export async function savePassengerAction(data: PassengerData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Usuário não autenticado' }
    }

    const passengerPayload = {
        motorista_id: user.id,
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        email: data.email,
        anotacoes: data.anotacoes,
        updated_at: new Date().toISOString()
    }

    let targetId = data.id;

    // If no ID provided (creation attempt), check for duplicates
    if (!targetId) {
        // First check by phone (strongest signal)
        if (data.telefone) {
            const { data: existingByPhone } = await supabase
                .from('passageiros_crm')
                .select('id')
                .eq('motorista_id', user.id)
                .eq('telefone', data.telefone)
                .single();

            if (existingByPhone) targetId = existingByPhone.id;
        }

        // If still no match and only name provided (fallback)
        if (!targetId && !data.telefone && data.nome) {
            const { data: existingByName } = await supabase
                .from('passageiros_crm')
                .select('id')
                .eq('motorista_id', user.id)
                .eq('nome', data.nome)
                .single();

            if (existingByName) targetId = existingByName.id;
        }
    }

    const { error } = await supabase
        .from('passageiros_crm')
        .upsert(
            targetId ? { ...passengerPayload, id: targetId } : passengerPayload,
            { onConflict: 'id' }
        )

    if (error) {
        console.error('Error saving passenger:', error)
        return { success: false, error: 'Erro ao salvar passageiro' }
    }

    revalidatePath('/passageiros')
    revalidatePath(`/passageiros/${encodeURIComponent(`${data.nome}-${data.telefone || ''}`)}`)

    return { success: true }
}

export async function searchPassengersAction(query: string) {
    if (!query || query.length < 2) return [];

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data } = await supabase
        .from('passageiros_crm')
        .select('*')
        .eq('motorista_id', user.id)
        .or(`nome.ilike.%${query}%,telefone.ilike.%${query}%`)
        .limit(5);

    return data || [];
}
