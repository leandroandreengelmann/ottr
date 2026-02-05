"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    ShieldCheck,
    Users,
    Bell,
    Settings,
    MapPin,
    Moon,
    ShieldAlert,
    ChevronRight,
    UserPlus,
    Clock,
    Eye,
    Zap,
    Loader2,
    Copy,
    Check,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getSecurityDataAction,
    updateSecurityConfigsAction,
    createSecurityGroupAction,
    joinSecurityGroupAction,
    deleteSecurityGroupAction,
    leaveSecurityGroupAction,
    SecurityConfigs
} from "@/app/actions/security";
import { toast } from "sonner";

export default function SegurancaPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [configs, setConfigs] = useState<SecurityConfigs>({
        compartilhar_rota: true,
        modo_noturno: false,
        localizacao_aproximada: false
    });
    const [groups, setGroups] = useState<any[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [inviteCode, setInviteCode] = useState("");
    const [newGroupName, setNewGroupName] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const activeGroup = groups.find(g => g.id === selectedGroupId);

    // Initial Load
    useEffect(() => {
        async function loadData() {
            try {
                const data = await getSecurityDataAction();
                if (data) {
                    setConfigs(data.configs as SecurityConfigs);
                    setGroups(data.groups || []);
                    setUserId(data.userId);
                    if (data.groups && data.groups.length > 0) {
                        setSelectedGroupId(data.groups[0].id);
                    }
                }
            } catch (error) {
                console.error("Error loading security data:", error);
                toast.error("Erro ao carregar dados de segurança");
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // Handle Toggle Changes
    const handleToggle = async (key: keyof SecurityConfigs, value: boolean) => {
        try {
            setConfigs(prev => ({ ...prev, [key]: value }));
            await updateSecurityConfigsAction({ [key]: value });
            toast.success("Preferência atualizada");
        } catch (error) {
            setConfigs(prev => ({ ...prev, [key]: !value }));
            toast.error("Erro ao salvar preferência");
        }
    };

    // Handle Group Creation
    const handleCreateGroup = async () => {
        console.log("Botão 'Criar Grupo' clicado");

        const groupName = newGroupName.trim() || "Meus Parceiros OTTR";
        setIsActionLoading(true);

        toast.promise(createSecurityGroupAction(groupName), {
            loading: 'Criando seu grupo de segurança...',
            success: (newGroup) => {
                const updatedGroups = [...groups, { ...newGroup, members: [] }];
                setGroups(updatedGroups);
                setSelectedGroupId(newGroup.id);
                setNewGroupName("");
                setIsActionLoading(false);
                return `Grupo "${groupName}" criado!`;
            },
            error: (err) => {
                setIsActionLoading(false);
                console.error("Erro detalhado ao criar grupo:", err);
                return `Não foi possível criar o grupo: ${err.message || 'Erro desconhecido'}`;
            }
        });
    };

    // Handle Joining Group
    const handleJoinGroup = async () => {
        if (!inviteCode || inviteCode.length < 4) {
            toast.error("Insira um código válido");
            return;
        }

        setIsActionLoading(true);

        toast.promise(joinSecurityGroupAction(inviteCode), {
            loading: 'Entrando no grupo...',
            success: async () => {
                const data = await getSecurityDataAction();
                if (data) {
                    setGroups(data.groups || []);
                    // Find the group we just joined by looking for the one that wasn't in our list before
                    const newGroup = data.groups.find((g: any) => !groups.find((existing: any) => existing.id === g.id));
                    if (newGroup) setSelectedGroupId(newGroup.id);
                }
                setInviteCode("");
                setIsActionLoading(false);
                return "Você entrou no grupo!";
            },
            error: (err) => {
                setIsActionLoading(false);
                console.error("Erro detalhado ao entrar no grupo:", err);
                return err.message || "Erro ao entrar no grupo";
            }
        });
    };

    // Handle Leave or Delete Group
    const handleLeaveOrDeleteGroup = async () => {
        if (!activeGroup) return;

        const isCreator = activeGroup.criador_id === userId;
        const actionLabel = isCreator ? "excluir" : "sair do";
        const confirmMsg = isCreator
            ? `Tem certeza que deseja EXCLUIR o grupo "${activeGroup.nome}"? Esta ação é permanente e removerá todos os membros.`
            : `Tem certeza que deseja sair do grupo "${activeGroup.nome}"?`;

        if (!window.confirm(confirmMsg)) return;

        setIsActionLoading(true);

        const action = isCreator
            ? deleteSecurityGroupAction(activeGroup.id)
            : leaveSecurityGroupAction(activeGroup.id);

        toast.promise(action, {
            loading: isCreator ? "Excluindo grupo..." : "Saindo do grupo...",
            success: () => {
                const updatedGroups = groups.filter(g => g.id !== activeGroup.id);
                setGroups(updatedGroups);
                setSelectedGroupId(updatedGroups.length > 0 ? updatedGroups[0].id : null);
                setIsActionLoading(false);
                return isCreator ? "Grupo excluído com sucesso" : "Você saiu do grupo";
            },
            error: (err) => {
                setIsActionLoading(false);
                console.error(`Erro ao ${actionLabel} grupo:`, err);
                return `Erro ao ${actionLabel} grupo: ${err.message}`;
            }
        });
    };

    // Copy Code Logic
    const handleCopyCode = () => {
        if (activeGroup?.codigo_convite) {
            navigator.clipboard.writeText(activeGroup.codigo_convite);
            setIsCopied(true);
            toast.success("Código copiado!");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <AppShell>
                <div className="min-h-full flex items-center justify-center bg-gray-25/50 pb-20">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="size-10 text-primary animate-spin" />
                        <p className="text-sm font-bold text-gray-400">Protegendo sua conta...</p>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="min-h-full bg-gray-25/50 pb-20">
                {/* Header Section */}
                <div className="shrink-0 px-6 py-8 md:py-12 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    Segurança
                                    <span className="size-2.5 rounded-full bg-primary animate-pulse mt-2" />
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Configurações de proteção e monitoramento em tempo real.
                                </p>
                            </div>
                        </div>

                        {/* Top Indicator */}
                        <div className="mt-8 p-4 rounded-2xl bg-success/5 border border-success/10 flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-success/10 flex items-center justify-center text-success shrink-0">
                                <ShieldCheck className="size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black text-success uppercase tracking-wider">Ambiente Protegido</span>
                                <span className="text-xs font-bold text-gray-500">Criptografia OTTR de ponta a ponta ativa.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 py-10">
                    <div className="max-w-5xl mx-auto w-full space-y-8">

                        {/* 1. Group Section */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Rede de Confiança</h2>
                                </div>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-lg">
                                    {groups.length} {groups.length === 1 ? 'Grupo' : 'Grupos'}
                                </Badge>
                            </div>

                            {/* Group Switcher Tabs */}
                            {groups.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
                                    {groups.map((group) => (
                                        <button
                                            key={group.id}
                                            onClick={() => setSelectedGroupId(group.id)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                                                selectedGroupId === group.id
                                                    ? "bg-primary text-white border-primary shadow-sm"
                                                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                                            )}
                                        >
                                            {group.nome}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setSelectedGroupId(null)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border border-dashed",
                                            selectedGroupId === null
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 hover:text-gray-500"
                                        )}
                                    >
                                        + Novo Grupo
                                    </button>
                                </div>
                            )}

                            {!activeGroup ? (
                                /* Empty State with Dual Action */
                                <div className="space-y-4">
                                    <Card className="p-8 border-dashed border-2 border-gray-200 bg-white/50 text-center rounded-[32px] overflow-hidden relative group">
                                        <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6 transition-transform group-hover:scale-110">
                                            <Users className="size-10" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Proteção Colaborativa</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                                            Adicione motoristas de confiança para que eles possam acompanhar suas rotas.
                                        </p>

                                        <div className="mt-8 flex flex-col gap-3 items-center">
                                            <div className="w-full max-w-xs space-y-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-left ml-1">Nome do Grupo</span>
                                                <Input
                                                    placeholder="EX: EQUIPE ALPHA"
                                                    value={newGroupName}
                                                    onChange={(e) => setNewGroupName(e.target.value.toUpperCase())}
                                                    className="h-12 bg-gray-50 border-none font-black tracking-widest rounded-xl focus-visible:ring-primary text-center"
                                                />
                                            </div>

                                            <Button
                                                onClick={() => {
                                                    console.log("CLIQUE NO BOTÃO CRIAR GRUPO DETECTADO");
                                                    handleCreateGroup();
                                                }}
                                                disabled={isActionLoading}
                                                className="h-14 w-full max-w-xs rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                            >
                                                {isActionLoading ? <Loader2 className="size-4 animate-spin" /> : "Criar Meu Grupo"}
                                            </Button>
                                        </div>

                                        {/* Decoration */}
                                        <div className="absolute -right-8 -top-8 size-24 bg-primary/5 rounded-full blur-2xl" />
                                    </Card>

                                    <Card className="p-6 border-gray-100 bg-white rounded-[32px] shadow-sm">
                                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Já tem um código?</h4>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="CÓDIGO"
                                                value={inviteCode}
                                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                                className="h-12 bg-gray-50 border-none font-black text-center tracking-widest rounded-xl focus-visible:ring-primary"
                                            />
                                            <Button
                                                onClick={handleJoinGroup}
                                                disabled={isActionLoading}
                                                className="h-12 px-6 rounded-xl bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest"
                                            >
                                                {isActionLoading ? <Loader2 className="size-3 animate-spin" /> : "Entrar"}
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                /* Active Group Card */
                                <Card className="p-6 border-gray-100 rounded-[32px] shadow-sm bg-white overflow-hidden">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                                {activeGroup.nome.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900 leading-none">{activeGroup.nome}</h3>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <Badge className="bg-success/10 text-success border-none text-[9px] font-black uppercase px-2">
                                                        {activeGroup.members?.length || 1} MEMBROS
                                                    </Badge>
                                                    <span className="size-1 rounded-full bg-gray-300" />
                                                    <span className="text-[10px] font-bold text-gray-400">Grupo Ativo</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLeaveOrDeleteGroup}
                                            disabled={isActionLoading}
                                            className="size-10 rounded-xl bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-all disabled:opacity-50 shadow-sm shadow-destructive/10"
                                            title={activeGroup.criador_id === userId ? "Excluir Grupo" : "Sair do Grupo"}
                                        >
                                            <LogOut className="size-5" />
                                        </button>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Código de Convite</span>
                                            <span className="text-lg font-black text-gray-900 tracking-widest">{activeGroup.codigo_convite}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleCopyCode}
                                            className="h-10 px-4 rounded-xl bg-white border border-primary/10 text-primary font-black text-[10px] uppercase gap-2 hover:bg-primary/5"
                                        >
                                            {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
                                            {isCopied ? "Copiado" : "Copiar"}
                                        </Button>
                                    </div>


                                    <div className="flex flex-col gap-2">
                                        <p className="text-[10px] text-center text-muted-foreground font-medium mb-1">
                                            Compartilhe o código acima para adicionar amigos.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                const message = `Olá! Junte-se ao meu grupo de segurança no OTTR. Use o código: ${activeGroup.codigo_convite}`;
                                                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                                            }}
                                            className="w-full h-14 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest gap-2 shadow-sm hover:bg-primary/90 transition-all border-none"
                                        >
                                            <UserPlus className="size-5" />
                                            Enviar via WhatsApp
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </section>

                        {/* 2. Real-time Sharing Settings */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Privacidade & Compartilhamento</h2>
                            </div>

                            <Card className="divide-y divide-gray-50 rounded-[32px] border-gray-100 overflow-hidden shadow-sm bg-white">
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                            <MapPin className="size-5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">Compartilhar Corridas</p>
                                            <p className="text-[11px] text-muted-foreground font-medium">Motoristas amigos veem sua rota ao vivo.</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={configs.compartilhar_rota}
                                        onCheckedChange={(val) => handleToggle('compartilhar_rota', val)}
                                    />
                                </div>

                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                            <Moon className="size-5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">Apenas no Horário de Risco</p>
                                            <p className="text-[11px] text-muted-foreground font-medium">Compartilhar apenas das 18h às 06h.</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={configs.modo_noturno}
                                        onCheckedChange={(val) => handleToggle('modo_noturno', val)}
                                    />
                                </div>

                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center">
                                            <Eye className="size-5" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black text-gray-900 tracking-tight">Localização Aproximada</p>
                                            <p className="text-[11px] text-muted-foreground font-medium">Esconde o endereço exato para mais privacidade.</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={configs.localizacao_aproximada}
                                        onCheckedChange={(val) => handleToggle('localizacao_aproximada', val)}
                                    />
                                </div>
                            </Card>
                        </section>

                        {/* 3. SOS Information */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-destructive rounded-full" />
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Emergência & SOS</h2>
                            </div>

                            <div className="p-8 rounded-[36px] bg-destructive/5 border border-destructive/10 relative overflow-hidden flex flex-col items-center text-center">
                                <div className="size-16 rounded-full bg-destructive flex items-center justify-center text-white mb-6 animate-pulse shadow-xl shadow-destructive/20 relative z-10">
                                    <span className="font-black text-xl tracking-tighter">SOS</span>
                                </div>
                                <h4 className="text-lg font-black text-gray-900 relative z-10">Botão SOS Sempre Ativo</h4>
                                <p className="text-sm text-muted-foreground mt-2 max-w-xs font-medium relative z-10">
                                    Em qualquer tela da operação, toque no botão vermelho flutuante por **2 segundos** para alertar seu grupo em massa.
                                </p>

                                <div className="mt-8 flex gap-3 relative z-10">
                                    <Badge variant="outline" className="bg-white border-gray-100 py-1.5 px-4 rounded-full font-black text-[10px] text-gray-600">
                                        GATILHO: 2s PRESS
                                    </Badge>
                                    <Badge variant="outline" className="bg-white border-gray-100 py-1.5 px-4 rounded-full font-black text-[10px] text-gray-600">
                                        ALERTA: GRUPO + ADMIN
                                    </Badge>
                                </div>

                                {/* Abstract background circle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-destructive/5 rounded-full blur-3xl pointer-events-none" />
                            </div>

                            <div className="p-6 rounded-[24px] bg-white border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                        <Zap className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black text-gray-900 tracking-tight">Testar Botão SOS</p>
                                        <p className="text-[11px] text-muted-foreground font-medium">Verifique se o seu alerta está funcionando.</p>
                                    </div>
                                </div>
                                <ChevronRight className="size-5 text-gray-300 group-hover:text-primary transition-colors" />
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </AppShell>
    );
}
