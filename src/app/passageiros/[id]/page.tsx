import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Phone,
    Calendar,
    Star,
    ArrowLeft,
    TrendingUp,
    MapPin,
    Clock,
    DollarSign,
    MessageCircle,
    Copy
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { EditPassengerSheet } from "@/components/passengers/edit-passenger-sheet";
import { getPassengerAction } from "@/app/actions/crm";

// Helper to format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export default async function PassengerDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const decodedId = decodeURIComponent(params.id);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // Fetch all rides to find matches
    // Note: In a real production app with millions of rows, we'd want a proper passengers table.
    // For this architecture, we filter in memory or fairly specific query.
    const { data: corridas, error } = await supabase
        .from("corridas")
        .select("*")
        .eq("motorista_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching passenger details:", error);
        return <div>Erro ao carregar dados do passageiro.</div>;
    }

    // Filter rides for this specific passenger
    const passengerRides = corridas?.filter(ride => {
        const key = `${ride.nome_passageiro}-${ride.telefone_passageiro || ''}`;
        return key === decodedId;
    }) || [];

    if (passengerRides.length === 0) {
        return (
            <AppShell>
                <div className="p-8 text-center text-gray-500">
                    Passageiro não encontrado ou sem corridas.
                    <Link href="/passageiros" className="block mt-4 text-primary font-bold hover:underline">
                        Voltar para lista
                    </Link>
                </div>
            </AppShell>
        );
    }

    // Extract Passenger Info (from the most recent ride)
    const lastRide = passengerRides[0];
    const rawName = lastRide.nome_passageiro || "Passageiro S/N";
    const rawPhone = lastRide.telefone_passageiro || "";

    // Try to fetch official CRM data
    const crmData = await getPassengerAction(rawName, rawPhone);

    // Prioritize CRM data for display
    const passengerName = crmData?.nome || rawName;
    const passengerPhone = crmData?.telefone || rawPhone;
    const passengerCpf = crmData?.cpf;
    const passengerEmail = crmData?.email;
    const passengerNotes = crmData?.anotacoes;

    // Calculate Stats
    const totalRides = passengerRides.length;
    const totalSpent = passengerRides.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);
    const avgTicket = totalSpent / totalRides;
    const firstRideDate = new Date(passengerRides[passengerRides.length - 1].created_at);
    const daysSinceFirstRide = Math.ceil((new Date().getTime() - firstRideDate.getTime()) / (1000 * 3600 * 24));

    // Determine Status
    let status = "Novo";
    if (totalRides > 5) status = "Frequente";
    if (totalRides > 15) status = "VIP";
    if (totalRides > 50) status = "Lenda";

    return (
        <AppShell>
            <div className="min-h-full bg-gray-50/50 pb-20">
                {/* Header with Actions */}
                <div className="bg-white border-b border-gray-100 px-6 py-6 sticky top-0 z-10">
                    <div className="max-w-3xl mx-auto w-full">
                        <div className="flex items-center gap-4 mb-6 justify-between">
                            <div className="flex items-center gap-4">
                                <Link href="/passageiros">
                                    <Button size="icon" variant="ghost" className="rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-900">
                                        <ArrowLeft className="size-6" />
                                    </Button>
                                </Link>
                                <h1 className="text-xl font-black text-gray-900 tracking-tight">Perfil do Cliente</h1>
                            </div>
                            <EditPassengerSheet
                                initialData={{
                                    id: crmData?.id,
                                    nome: passengerName,
                                    telefone: passengerPhone,
                                    cpf: passengerCpf,
                                    email: passengerEmail,
                                    anotacoes: passengerNotes,
                                }}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="size-16 rounded-[20px] bg-primary/5 flex items-center justify-center text-primary font-black text-2xl border border-primary/10 shrink-0">
                                    {passengerName.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{passengerName}</h2>
                                        {status !== "Novo" && (
                                            <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-none font-black uppercase tracking-widest text-[10px]">
                                                {status}
                                            </Badge>
                                        )}
                                    </div>
                                    {passengerPhone && (
                                        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                            <Phone className="size-3.5" />
                                            {passengerPhone}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                <Link href={`https://wa.me/55${passengerPhone.replace(/\D/g, '')}`} target="_blank" className="flex-1 md:flex-none">
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5 hover:text-primary font-black gap-2 transition-all active:scale-95">
                                        <MessageCircle className="size-4" />
                                        WhatsApp
                                    </Button>
                                </Link>
                                <Link href={`tel:${passengerPhone}`} className="flex-1 md:flex-none">
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5 hover:text-primary font-black gap-2 transition-all active:scale-95">
                                        <Phone className="size-4" />
                                        Ligar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-8">
                    <div className="max-w-3xl mx-auto w-full space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Gasto</p>
                                <p className="text-lg font-black text-gray-900 tracking-tight">{formatCurrency(totalSpent)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Corridas</p>
                                <p className="text-lg font-black text-gray-900 tracking-tight">{totalRides}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ticket Médio</p>
                                <p className="text-lg font-black text-gray-900 tracking-tight">{formatCurrency(avgTicket)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cliente Desde</p>
                                <p className="text-lg font-black text-gray-900 tracking-tight">{daysSinceFirstRide} {daysSinceFirstRide === 1 ? 'dia' : 'dias'}</p>
                            </div>
                        </div>

                        {/* CRM Extra Data */}
                        {(passengerNotes || passengerCpf || passengerEmail) && (
                            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                                {passengerNotes && (
                                    <div className="p-4 rounded-2xl bg-yellow-50/50 border border-yellow-100 text-yellow-900">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Anotações do Motorista</p>
                                        <p className="text-sm font-medium leading-relaxed">"{passengerNotes}"</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {passengerCpf && (
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">CPF</p>
                                            <p className="font-bold text-gray-900 font-mono">{passengerCpf}</p>
                                        </div>
                                    )}
                                    {passengerEmail && (
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                            <p className="font-bold text-gray-900">{passengerEmail}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Recent History */}
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                    <Clock className="size-5 text-primary" />
                                    Histórico de Viagens
                                </h3>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none font-bold">
                                    {totalRides} registros
                                </Badge>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {passengerRides.map((ride) => (
                                    <div key={ride.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                <Calendar className="size-3" />
                                                {new Date(ride.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                {new Date(ride.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-primary" />
                                                <p className="font-medium text-gray-900 text-sm truncate max-w-[200px] md:max-w-md">
                                                    {ride.origem_endereco || "Origem não registrada"}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-gray-300" />
                                                <p className="font-medium text-gray-500 text-sm truncate max-w-[200px] md:max-w-md">
                                                    {ride.destino_endereco || "Destino não registrado"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-base font-black text-gray-900 tracking-tight">{formatCurrency(Number(ride.valor))}</p>
                                            <Badge variant="outline" className="mt-1 border-gray-200 text-[9px] font-bold text-gray-500 uppercase">
                                                {ride.status_pagamento}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
