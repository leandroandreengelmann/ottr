"use client";

import React, { useEffect } from "react";
import {
    Navigation,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { SOSButton } from "./SOSButton";
import { RideInfoDialog } from "./RideInfoDialog";
import { cn } from "@/lib/utils";

export function HomeDeslocamento() {
    const {
        elapsedTime, updateTimer, arriveAtPickup, cancelRace,
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
            <div className="flex-1 relative w-full h-full overflow-hidden">
                <GoogleMapComponent />

                {/* Overlay Gradient para integração */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

                {/* Status Bar Flutuante */}
                <div className="absolute top-4 left-4 right-4 z-20">
                    <div className="bg-blue-600/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-2.5">
                            <Navigation className="size-5 animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-wide">
                                Em deslocamento
                            </span>
                        </div>
                        <div className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-md uppercase">
                            A caminho
                        </div>
                    </div>
                </div>

                {/* Grupo de Ações Inferior (Cancelar, Detalhes, Cheguei) */}
                <div className="absolute bottom-24 inset-x-0 flex items-center justify-center gap-3 z-40 px-4">
                    {/* Botão Cancelar (Compacto com Modal) */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-14 bg-background/80 hover:bg-destructive/10 text-destructive rounded-xl shadow-sm backdrop-blur transition-all"
                            >
                                <X className="size-6" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Cancelar operação?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ao cancelar, o deslocamento atual será interrompido e será necessário iniciar o processo novamente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Continuar operação</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={cancelRace}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Cancelar operação
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Botão Detalhes */}
                    <Button
                        variant="ghost"
                        onClick={() => setInfoOpen(true)}
                        className="flex-none h-14 px-6 bg-background text-primary hover:bg-gray-50 rounded-xl uppercase font-bold tracking-wide transition-all shadow-sm"
                    >
                        Detalhes
                    </Button>

                    {/* CTA Cheguei no Local (Green/Success) */}
                    <Button
                        onClick={arriveAtPickup}
                        className="flex-1 h-14 bg-success text-success-foreground hover:bg-success/90 rounded-xl text-base font-bold uppercase tracking-wide shadow-lg transition-all"
                    >
                        Cheguei no local
                    </Button>
                </div>

                {/* SOS Button Flutuante */}
                <SOSButton className="bottom-[26rem] right-4" />

                {/* Painel Inferior: Estatísticas Minimalistas */}
                <div className="absolute bottom-0 inset-x-0 bg-background/95 backdrop-blur-md pt-2 pb-5 z-50 rounded-t-xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
                    <div className="flex justify-center items-center gap-8">
                        {/* Distância */}
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Distância</span>
                            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">0,0 km</span>
                        </div>

                        {/* Divisor Visual Discreto */}
                        <div className="h-6 w-px bg-gray-200" />

                        {/* Tempo */}
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tempo</span>
                            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">{formatTime(elapsedTime)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <RideInfoDialog open={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    );
}
