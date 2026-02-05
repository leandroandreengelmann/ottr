"use client";

import React from "react";
import {
    Play,
    Zap,
    Mic,
    ClipboardList,
    Clock,
    CircleDollarSign,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { RideInfoDialog } from "./RideInfoDialog";
import { cn } from "@/lib/utils";

export function HomeLivre() {
    const { passengerName, passengerCPF, passengerPhone, currentValue } = useRaceStore();
    const [infoOpen, setInfoOpen] = React.useState(false);

    const hasAnyDetail = !!(passengerName || passengerCPF || passengerPhone || (currentValue && currentValue > 0));
    const hasAllDetails = !!(passengerName && passengerCPF && passengerPhone && (currentValue && currentValue > 0));
    return (
        <div className="flex flex-col h-full bg-gray-50/50">
            {/* Contexto Principal: Mapa (Major Area) */}
            <div className="flex-1 relative w-full overflow-hidden">
                <GoogleMapComponent />

                {/* Overlay Gradient para integração */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

                {/* Alerta de Operação Flutuante */}
                <div className="absolute top-4 left-4 right-4 animate-in slide-in-from-top-4 duration-700">
                    <div className="bg-white/90 backdrop-blur-md border border-orange-100 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                        <AlertCircle className="size-5 text-primary shrink-0" />
                        <p className="text-xs font-medium text-gray-700 leading-snug">
                            Operação <span className="font-bold text-orange-700">Parceiros do Centro</span> ativa.
                        </p>
                    </div>
                </div>
            </div>

            {/* Painel de Controle (Bottom Sheet look-alike) */}
            <div className="shrink-0 bg-background border-t border-gray-100 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] -mt-4 relative z-10">
                <div className="container px-4 py-6 space-y-6">

                    {/* Header + CTA Principal */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                Pronto para rodar
                            </h2>
                            <p className="text-sm font-medium text-muted-foreground">
                                Você está visível para novas corridas.
                            </p>
                        </div>

                        <Button
                            onClick={() => useRaceStore.getState().startDeslocamento()}
                            className="w-full h-14 text-base font-bold uppercase tracking-wide bg-primary hover:bg-primary/90 transition-all rounded-xl shadow-md shadow-primary/20"
                        >
                            <Play className="size-5 mr-2 fill-current" />
                            Iniciar deslocamento
                        </Button>
                    </div>

                    {/* Ações Rápidas (Grid Uniforme) */}
                    <div className="grid grid-cols-4 gap-2">
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-1.5 rounded-xl border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all p-0"
                        >
                            <Zap className="size-6 text-warning" />
                            <span className="text-[10px] font-bold text-gray-600">Rápida</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-1.5 rounded-xl border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all p-0"
                        >
                            <Mic className="size-6 text-primary" />
                            <span className="text-[10px] font-bold text-gray-600">Falar IA</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setInfoOpen(true)}
                            className={cn(
                                "h-20 flex-col gap-1.5 rounded-xl border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all p-0 relative overflow-hidden",
                                hasAllDetails ? "border-success/50 bg-success/5" : hasAnyDetail ? "border-primary/50 bg-primary/5" : ""
                            )}
                        >
                            <ClipboardList className={cn(
                                "size-6",
                                hasAllDetails ? "text-success" : hasAnyDetail ? "text-primary" : "text-success"
                            )} />
                            <span className={cn(
                                "text-[10px] font-bold text-gray-600",
                                hasAllDetails ? "text-success" : hasAnyDetail ? "text-primary" : ""
                            )}>Detalhes</span>

                            {hasAnyDetail && !hasAllDetails && (
                                <span className="absolute top-2 right-2 size-2 rounded-full bg-primary animate-pulse" />
                            )}
                            {hasAllDetails && (
                                <span className="absolute top-2 right-2 size-2 rounded-full bg-success" />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-1.5 rounded-xl border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all p-0"
                        >
                            <AlertCircle className="size-6 text-destructive" />
                            <span className="text-[10px] font-bold text-gray-600">Pendente</span>
                        </Button>
                    </div>

                    {/* Resumo Mini (Opcional, mas mantendo funcionalidade) */}
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center px-2">
                        <div className="flex items-center gap-2">
                            <Clock className="size-4 text-gray-400" />
                            <span className="text-sm font-bold text-gray-700">0 <span className="text-xs font-normal text-muted-foreground">corridas</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CircleDollarSign className="size-4 text-success" />
                            <span className="text-sm font-bold text-gray-700">R$ 0,00</span>
                        </div>
                    </div>
                </div>
            </div>

            <RideInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    );
}
