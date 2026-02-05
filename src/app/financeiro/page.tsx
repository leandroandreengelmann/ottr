import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    TrendingUp,
    Clock,
    AlertCircle,
    ChevronRight,
    ArrowUpRight,
    Calendar,
    Filter,
    CreditCard,
    DollarSign,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function FinanceiroPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch all rides for the driver to calculate totals and list pendencies
    const { data: corridas, error } = await supabase
        .from("corridas")
        .select("*")
        .eq("motorista_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching finance data:", error);
    }

    // Basic aggregation
    const totalRevenue = corridas?.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0) || 0;
    const pendingCorridas = corridas?.filter(c => c.status_pagamento === "PENDENTE") || [];
    const pendingRevenue = pendingCorridas.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0) || 0;
    const receivedRevenue = totalRevenue - pendingRevenue;
    const totalRides = corridas?.length || 0;

    return (
        <AppShell>
            <div className="min-h-full bg-gray-25/50 pb-20">
                {/* Header Section */}
                <div className="shrink-0 px-6 py-8 md:py-12 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    Financeiro
                                    <span className="size-2.5 rounded-full bg-primary animate-pulse mt-2" />
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Gestão de faturamento, recebimentos e pendências OTTR.
                                </p>
                            </div>

                            {/* Period Filter Toggle (UI only for now) */}
                            <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
                                {['Hoje', 'Semana', 'Mês'].map((period, i) => (
                                    <button
                                        key={period}
                                        className={cn(
                                            "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                            i === 2 ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Finance Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
                            {/* Card Recebido - Principal */}
                            <div className="sm:col-span-12 lg:col-span-5 p-6 rounded-[32px] bg-success border-2 border-white shadow-xl shadow-success/20 text-white relative overflow-hidden group">
                                <TrendingUp className="absolute -right-4 -bottom-4 size-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="size-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <Wallet className="size-6" />
                                        </div>
                                        <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black text-[10px] tracking-tighter px-3">
                                            RECEBIDO
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Saldo Total</p>
                                        <h2 className="text-4xl font-black tracking-tight">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receivedRevenue)}
                                        </h2>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold opacity-90">
                                            <CheckCircle2 className="size-4" />
                                            {totalRides - pendingCorridas.length} viagens pagas
                                        </div>
                                        <ArrowUpRight className="size-5 opacity-50" />
                                    </div>
                                </div>
                            </div>

                            {/* Card Pendente */}
                            <div className="sm:col-span-6 lg:col-span-4 p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="size-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center">
                                        <Clock className="size-6" />
                                    </div>
                                    <Badge className="bg-warning/10 text-warning border-none font-black text-[10px] tracking-tighter px-3">
                                        PENDENTE
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">A Receber</p>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pendingRevenue)}
                                    </h3>
                                </div>
                                <p className="mt-4 text-[10px] font-bold text-muted-foreground bg-gray-50 p-2 rounded-lg inline-flex items-center gap-2">
                                    <AlertCircle className="size-3 text-warning" />
                                    {pendingCorridas.length} pagamentos em aberto
                                </p>
                            </div>

                            {/* Card Volume/Média */}
                            <div className="sm:col-span-6 lg:col-span-3 p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                        <Calendar className="size-6" />
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-500 border-none font-black text-[10px] tracking-tighter px-3 uppercase">
                                        Volume
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Corridas</p>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                                        {totalRides}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-center gap-1">
                                    <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-2/3" />
                                    </div>
                                    <span className="text-[10px] font-black text-primary">68%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pendencies Section */}
                <div className="px-6 py-10">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-warning rounded-full" />
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Pendências Financeiras</h2>
                            </div>
                            <button className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                                Ver todas <ChevronRight className="size-3" />
                            </button>
                        </div>

                        {pendingCorridas.length === 0 ? (
                            <div className="py-16 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                                <div className="size-20 rounded-full bg-success/5 flex items-center justify-center text-success mx-auto mb-6">
                                    <CheckCircle2 className="size-10" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tudo em dia!</h3>
                                <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2 leading-relaxed font-medium">
                                    Você não tem pagamentos pendentes por enquanto. Ótimo trabalho!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingCorridas.map((c) => (
                                    <div
                                        key={c.id}
                                        className="group bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm hover:border-warning/30 transition-all flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            {/* Avatar Fallback */}
                                            <div className="size-14 shrink-0 rounded-2xl bg-warning/5 border border-warning/10 flex items-center justify-center text-warning font-black text-lg">
                                                {c.nome_passageiro ? c.nome_passageiro.substring(0, 2).toUpperCase() : "?"}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h3 className="text-base font-black text-gray-900 truncate pr-2">
                                                    {c.nome_passageiro || "Passageiro sem nome"}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                                                        <Calendar className="size-3" />
                                                        {new Date(c.created_at).toLocaleDateString('pt-BR')}
                                                    </span>
                                                    <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                                                        <CreditCard className="size-3" />
                                                        {c.metodo_pagamento}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2 ml-4">
                                            <span className="text-lg font-black text-gray-900">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.valor)}
                                            </span>
                                            <button className="h-8 px-4 rounded-full bg-warning/10 text-warning text-[9px] font-black uppercase tracking-wider hover:bg-warning/20 transition-all">
                                                Resolver
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AppShell>
    );
}
