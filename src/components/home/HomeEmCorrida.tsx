"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    Flag,
    Pause,
    Play,
    Mic,
    Clock,
    MapPin,
    Navigation,
    ClipboardList,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { cn } from "@/lib/utils";
import { SOSButton } from "./SOSButton";
import { RideInfoDialog } from "./RideInfoDialog";
import { VoiceControl } from "./VoiceControl";
import { toast } from "sonner";

export function HomeEmCorrida() {
    const {
        elapsedTime, updateTimer, finishRace, pauseRace, isPaused, goToFinalize,
        passengerName, passengerCPF, passengerPhone, currentValue,
        setRaceValue, setPaymentMethod, goToSetValue
    } = useRaceStore();
    const [infoOpen, setInfoOpen] = useState(false);

    const hasAnyDetail = !!(passengerName || passengerCPF || passengerPhone || (currentValue && currentValue > 0));
    const hasAllDetails = !!(passengerName && passengerCPF && passengerPhone && (currentValue && currentValue > 0));

    useEffect(() => {
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [updateTimer]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [hrs, mins, secs]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    };

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Contexto: Mapa Full */}
            <div className="flex-1 relative w-full overflow-hidden">
                <GoogleMapComponent />

                {/* Overlay Gradient para integração */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

                {/* Status Bar Flutuante */}
                <div className="absolute top-4 left-4 right-4 z-20">
                    <div className="bg-primary text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-2.5">
                            <Navigation className="size-5 animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-wide">
                                Em corrida
                            </span>
                        </div>
                        <div className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md uppercase">
                            Em deslocamento
                        </div>
                    </div>
                </div>

                {/* Comando de Voz */}
                <VoiceControl hintText='"Finalizar com 20 reais no pix" ou "Pausa"' />

                {/* SOS Button (Standard Position bottom-6) */}
                <SOSButton />
            </div>

            {/* Painel Inferior */}
            <div className="shrink-0 bg-background border-t border-gray-100 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] -mt-6 relative z-10">
                <div className="container px-4 py-6 space-y-6">

                    {/* Grid de Métricas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl space-y-1">
                            <Clock className="size-4 text-primary" />
                            <span className="text-lg font-black text-gray-900">{formatTime(elapsedTime)}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Duração</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl space-y-1">
                            <MapPin className="size-4 text-gray-400" />
                            <span className="text-lg font-black text-gray-900">0,0 km</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Percorrido</span>
                        </div>
                    </div>

                    {/* CTA Primário */}
                    <Button
                        onClick={goToFinalize}
                        className="w-full h-14 rounded-xl text-base font-bold uppercase tracking-wide bg-primary hover:bg-primary/90 text-white transition-all shadow-md shadow-primary/20"
                    >
                        <Flag className="size-5 mr-3 fill-current" />
                        Finalizar corrida
                    </Button>

                    {/* Ações Secundárias Unificadas */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => setInfoOpen(true)}
                            variant="outline"
                            className={cn(
                                "h-12 rounded-xl text-xs font-bold uppercase border-gray-200 hover:bg-gray-50 relative overflow-hidden",
                                hasAllDetails ? "border-success/50 bg-success/5 text-success" : hasAnyDetail ? "border-primary/50 bg-primary/5 text-primary" : "text-gray-600"
                            )}
                        >
                            <ClipboardList className={cn(
                                "size-4 mr-2",
                                hasAllDetails ? "text-success" : hasAnyDetail ? "text-primary" : ""
                            )} />
                            Detalhes

                            {hasAnyDetail && !hasAllDetails && (
                                <span className="absolute top-1 right-1 px-1 bg-primary/10 rounded-full">
                                    <span className="size-1 rounded-full bg-primary animate-pulse inline-block" />
                                </span>
                            )}
                            {hasAllDetails && (
                                <span className="absolute top-1 right-1 px-1 bg-success/10 rounded-full">
                                    <CheckCircle2 className="size-2 text-success inline-block" />
                                </span>
                            )}
                        </Button>
                        <Button
                            onClick={pauseRace}
                            variant="outline"
                            className={cn(
                                "h-12 rounded-xl text-xs font-bold uppercase border-gray-200 transition-all",
                                isPaused ? "bg-warning border-warning text-white hover:bg-warning/90 hover:text-white" : "hover:bg-gray-50 text-gray-600"
                            )}
                        >
                            {isPaused ? (
                                <>
                                    <Play className="size-4 mr-2 fill-current" />
                                    Retomar
                                </>
                            ) : (
                                <>
                                    <Pause className="size-4 mr-2" />
                                    Pausar
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="pt-2 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                            Mantenha o foco. <span className="text-primary">Use comandos de voz</span>.
                        </p>
                    </div>
                </div>
            </div>

            <RideInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    );
}
