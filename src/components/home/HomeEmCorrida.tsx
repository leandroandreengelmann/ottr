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
                <VoiceControl
                    hintText='"Finalizar com 20 reais no pix" ou "Pausa"'
                    className="bottom-80"
                />

                {/* SOS Button Flutuante (Above Voice) */}
                <SOSButton className="bottom-[26rem] right-4" />

                {/* Botões de Ação Flutuantes (Acima dos dados da corrida) */}
                <div className="absolute bottom-24 inset-x-0 flex items-center justify-center gap-4 z-40 px-4">
                    <Button
                        variant="ghost"
                        onClick={() => setInfoOpen(true)}
                        className="flex-1 h-14 bg-background text-primary hover:bg-gray-50 rounded-xl uppercase font-bold tracking-wide transition-all shadow-sm"
                    >
                        Detalhes
                    </Button>

                    <Button
                        onClick={goToFinalize}
                        className="flex-1 h-14 bg-primary text-white hover:bg-primary/90 rounded-xl uppercase font-bold tracking-wide shadow-lg transition-all"
                    >
                        Finalizar
                    </Button>
                </div>

                {/* Painel Inferior: Estatísticas Minimalistas (Exatamente na base) */}
                <div className="absolute bottom-0 inset-x-0 bg-background/95 backdrop-blur-md pt-2 pb-5 z-50 rounded-t-xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
                    <div className="flex justify-center items-center gap-8">
                        {/* Distância */}
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Percorrido</span>
                            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">0,0 km</span>
                        </div>

                        {/* Divisor Visual Discreto */}
                        <div className="h-6 w-px bg-gray-200" />

                        {/* Duração */}
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duração</span>
                            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">{formatTime(elapsedTime)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <RideInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    );
}
