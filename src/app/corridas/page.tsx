import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    PlayCircle,
    Users,
    Wallet,
    Calendar,
    Clock,
    ChevronRight,
    MapPin,
    DollarSign,
    Car,
    History,
    BadgeCheck,
    TrendingUp,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function CorridasPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch rides
    const { data: corridas, error } = await supabase
        .from("corridas")
        .select("*")
        .eq("motorista_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching rides:", error);
    }

    // Calculations
    const totalRides = corridas?.length || 0;
    const totalRevenue = corridas?.reduce((acc, ride) => acc + (ride.valor || 0), 0) || 0;
    const pendingRevenue = corridas?.filter(r => r.status_pagamento === "PENDENTE")
        .reduce((acc, ride) => acc + (ride.valor || 0), 0) || 0;

    return (
        <AppShell>
            {/* Content Container - Let AppShell handle scrolling if possible, 
                but here we want the header fixed or just a single scroll flow.
                Removing 'overflow-y-auto' from inner div to avoid nested scroll. */}
            <div className="min-h-full bg-gray-25/50 pb-20">
                {/* Header Section */}
                <div className="shrink-0 px-6 py-8 md:py-12 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    Corridas
                                    <span className="size-2.5 rounded-full bg-primary animate-pulse mt-2" />
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Histórico de faturamento e registro de viagens OTTR.
                                </p>
                            </div>
                        </div>

                        {/* Summary Stats - Rigid Hierarchy */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            {/* RECEBIDO - Most Positive / Success */}
                            <div className="p-5 rounded-3xl bg-success/5 border-2 border-success/10 flex items-center gap-4 shadow-sm shadow-success/5">
                                <div className="size-14 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                                    <BadgeCheck className="size-7" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-success uppercase tracking-wider">Recebido</span>
                                    <span className="text-2xl font-black text-gray-900">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue - pendingRevenue)}
                                    </span>
                                </div>
                            </div>

                            {/* PENDENTE - Warning / Secondary */}
                            <div className="p-5 rounded-3xl bg-warning/5 border border-warning/10 flex items-center gap-4">
                                <div className="size-14 rounded-2xl bg-warning/10 flex items-center justify-center text-warning">
                                    <Clock className="size-7" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-warning uppercase tracking-wider">Pendente</span>
                                    <span className="text-2xl font-black text-gray-900">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pendingRevenue)}
                                    </span>
                                </div>
                            </div>

                            {/* TOTAL - Neutral / Info */}
                            <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                                <div className="size-14 rounded-2xl bg-gray-200/50 flex items-center justify-center text-gray-500">
                                    <History className="size-7" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Total Corridas</span>
                                    <span className="text-2xl font-black text-gray-900">{totalRides}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - List of Rides */}
                <div className="px-6 py-10">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Últimas Viagens</h2>
                            </div>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none font-black px-3 py-1">
                                {totalRides} viagens
                            </Badge>
                        </div>

                        {totalRides === 0 ? (
                            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-4">
                                    <Car className="size-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Tudo pronto!</h3>
                                <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1">
                                    Suas corridas aparecerão aqui assim que você finalizar a primeira viagem.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {corridas?.map((ride) => (
                                    <div
                                        key={ride.id}
                                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "size-12 rounded-xl flex items-center justify-center",
                                                ride.status_pagamento === "PAGO" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                                            )}>
                                                {ride.metodo_pagamento === 'PIX' ? <DollarSign className="size-5" /> : <Wallet className="size-5" />}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-gray-900 truncate max-w-[140px]">
                                                        {ride.nome_passageiro || "Passageiro Eventual"}
                                                    </span>
                                                    <Badge className={cn(
                                                        "h-4 px-1 rounded text-[8px] font-black uppercase tracking-tighter border-none",
                                                        ride.status_pagamento === "PAGO" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                                                    )}>
                                                        {ride.status_pagamento || "PAGO"}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mt-0.5">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="size-3" />
                                                        {new Date(ride.created_at).toLocaleDateString('pt-BR')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3" />
                                                        {new Date(ride.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-base font-black text-gray-900">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ride.valor || 0)}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                                {ride.metodo_pagamento || "PIX"}
                                            </p>
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
