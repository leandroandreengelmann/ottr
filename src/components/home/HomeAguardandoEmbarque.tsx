"use client";

import React, { useEffect } from "react";
import {
    Play,
    UserPlus,
    DollarSign,
    ArrowLeft,
    Clock,
    MapPin,
    AlertTriangle,
    ClipboardList,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { SOSButton } from "./SOSButton";
import { RideInfoDialog } from "./RideInfoDialog";
import { cn } from "@/lib/utils";

export function HomeAguardandoEmbarque() {
    const {
        elapsedTime, updateTimer, startRace, backToDeslocamento, goToSetValue,
        passengerName, passengerCPF, passengerPhone, currentValue
    } = useRaceStore();
    const [infoOpen, setInfoOpen] = React.useState(false);

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
        <div className="flex flex-col h-full bg-background font-sans">
            {/* Contexto: Mapa Full */}
            <div className="flex-1 relative w-full overflow-hidden">
                <GoogleMapComponent />

                {/* Overlay Gradient para integração */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

                {/* Status Bar Flutuante */}
                <div className="absolute top-4 left-4 right-4 z-20">
                    <div className="bg-warning text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-2.5">
                            <Clock className="size-5 animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-wide">
                                Aguardando embarque
                            </span>
                        </div>
                        <div className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md uppercase">
                            No local
                        </div>
                    </div>
                </div>

                {/* SOS Button Flutuante */}
                <SOSButton />
            </div>

            {/* Painel Inferior */}
            <div className="shrink-0 bg-background border-t border-gray-100 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] -mt-6 relative z-10">
                <div className="container px-4 py-6 space-y-6">

                    {/* Grid de Métricas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl space-y-1">
                            <Clock className="size-4 text-warning" />
                            <span className="text-lg font-black text-gray-900">{formatTime(elapsedTime)}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Tempo espera</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl space-y-1">
                            <MapPin className="size-4 text-gray-400" />
                            <span className="text-lg font-black text-gray-900">0,0 km</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Distância</span>
                        </div>
                    </div>

                    {/* CTA Primário */}
                    <Button
                        onClick={startRace}
                        className="w-full h-14 rounded-xl text-base font-bold uppercase tracking-wide bg-success hover:bg-success/90 text-white transition-all shadow-md shadow-success/20"
                    >
                        <Play className="size-5 mr-2 fill-current" />
                        Iniciar corrida
                    </Button>

                    {/* Ação de Informações Unificada */}
                    <Button
                        variant="outline"
                        onClick={() => setInfoOpen(true)}
                        className={cn(
                            "w-full h-12 rounded-xl text-xs font-bold uppercase border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 relative overflow-hidden",
                            hasAllDetails ? "border-success/50 bg-success/5 text-success" : hasAnyDetail ? "border-primary/50 bg-primary/5 text-primary" : "text-gray-600"
                        )}
                    >
                        <ClipboardList className={cn(
                            "size-4",
                            hasAllDetails ? "text-success" : hasAnyDetail ? "text-primary" : ""
                        )} />
                        Detalhes da Corrida

                        {hasAnyDetail && !hasAllDetails && (
                            <span className="absolute top-1.5 right-2 px-1 py-0.5 bg-primary/10 rounded-full flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                            </span>
                        )}
                        {hasAllDetails && (
                            <span className="absolute top-1.5 right-2 px-1 py-0.5 bg-success/10 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="size-3 text-success" />
                            </span>
                        )}
                    </Button>

                    <div className="pt-2 flex flex-col gap-2">
                        <Button
                            onClick={backToDeslocamento}
                            variant="outline"
                            className="w-full h-12 text-xs font-bold uppercase tracking-wide border-primary text-primary hover:bg-primary/5 hover:text-primary transition-all rounded-xl"
                        >
                            <ArrowLeft className="size-4 mr-2" />
                            Voltar para deslocamento
                        </Button>
                    </div>
                </div>
            </div>

            <RideInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    );
}
