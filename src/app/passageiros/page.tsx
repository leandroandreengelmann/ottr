import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Search,
    Phone,
    ChevronRight,
    UserPlus,
    Calendar,
    Car,
    Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function PassageirosPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch rides to derive passengers
    // Ideally we would want a dedicated table, but following currently recorded data
    const { data: corridas, error } = await supabase
        .from("corridas")
        .select("nome_passageiro, telefone_passageiro, cpf_passageiro, created_at")
        .eq("motorista_id", user.id)
        .not("nome_passageiro", "is", null)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching passengers from rides:", error);
    }

    // Aggregate unique passengers
    const passengersMap = new Map();

    corridas?.forEach(ride => {
        const key = `${ride.nome_passageiro}-${ride.telefone_passageiro || ''}`;
        if (!passengersMap.has(key)) {
            passengersMap.set(key, {
                nome: ride.nome_passageiro,
                telefone: ride.telefone_passageiro,
                cpf: ride.cpf_passageiro,
                ultimaCorrida: ride.created_at,
                totalCorridas: 1
            });
        } else {
            const existing = passengersMap.get(key);
            existing.totalCorridas += 1;
            // Since it's ordered by desc, the first one is already the last ride
        }
    });

    const uniquePassengers = Array.from(passengersMap.values());

    return (
        <AppShell>
            <div className="min-h-full bg-gray-25/50 pb-20">
                {/* Header Section */}
                <div className="shrink-0 px-6 py-8 md:py-12 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    Passageiros
                                    <span className="size-2.5 rounded-full bg-primary animate-pulse mt-2" />
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Gerencie seus clientes e fidelize passageiros recorrentes OTTR.
                                </p>
                            </div>
                        </div>

                        {/* Search Bar - Premium Focus */}
                        <div className="mt-8 relative max-w-md group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <Search className="size-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por nome ou telefone..."
                                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-gray-100 border focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-6 py-10">
                    <div className="max-w-5xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Meus Clientes</h2>
                            </div>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none font-black px-3 py-1">
                                {uniquePassengers.length} registrados
                            </Badge>
                        </div>

                        {uniquePassengers.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                                <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
                                    <Users className="size-10" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Inicie sua rede</h3>
                                <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                                    Salve o nome dos passageiros ao finalizar suas corridas para gerenciar sua carteira de clientes aqui.
                                </p>
                                <Link href="/home" className="mt-8 inline-block">
                                    <button className="h-14 px-8 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                                        Iniciar Primeira Corrida
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {uniquePassengers.map((p, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/passageiros/${encodeURIComponent(`${p.nome}-${p.telefone || ''}`)}`}
                                        className="block"
                                    >
                                        <div
                                            className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:border-primary/20 hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                {/* Avatar with Iniciais or Icon Fallback */}
                                                <div className="size-14 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-lg border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    {p.nome && p.nome.trim().length > 0 ? (
                                                        p.nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
                                                    ) : (
                                                        <Users className="size-6" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <h3 className="text-base font-black text-gray-900 truncate pr-2 tracking-tight">
                                                        {p.nome || "Passageiro S/N"}
                                                    </h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        {p.telefone && (
                                                            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                                                                <Phone className="size-3" />
                                                                {p.telefone}
                                                            </span>
                                                        )}
                                                        <Badge className="bg-success/10 text-success border-none text-[9px] font-black uppercase px-2 h-4 tracking-tighter">
                                                            {p.totalCorridas} {p.totalCorridas === 1 ? 'VIAGEM' : 'VIAGENS'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 ml-2 shrink-0">
                                                {p.totalCorridas >= 5 && (
                                                    <Star className="size-5 text-warning fill-warning" />
                                                )}
                                                <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                    <ChevronRight className="size-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Action Tip - Standardized Informative Card */}
                        {uniquePassengers.length > 0 && (
                            <div className="mt-12 p-6 rounded-[24px] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-5 text-center md:text-left transition-colors hover:bg-primary/[0.07]">
                                <div className="size-14 rounded-[20px] bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                                    <UserPlus className="size-7" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-black text-gray-900 text-sm tracking-tight flex items-center gap-2 justify-center md:justify-start">
                                        Dica de Ouro OTTR
                                        <Star className="size-3 text-warning fill-warning" />
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium max-w-md leading-relaxed">
                                        Clientes frequentes (5+ viagens) ganham destaque automático. Use isso para oferecer um tratamento exclusivo e garantir mais corridas particulares.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
