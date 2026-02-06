"use client";

import React from "react";
import {
    Play,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapComponent } from "./GoogleMapComponent";

export function HomeLivre() {
    return (
        <div className="flex flex-col h-full bg-background">
            {/* Contexto Principal: Mapa (Full Height) */}
            <div className="flex-1 relative w-full h-full overflow-hidden">
                <GoogleMapComponent />

                {/* Overlay Gradient para integração */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

                {/* CTA Flutuante Principal */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <Button
                        onClick={() => useRaceStore.getState().startDeslocamento()}
                        className="h-14 px-8 text-base font-bold uppercase tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground transition-all rounded-xl shadow-lg shadow-primary/25"
                    >
                        Iniciar deslocamento
                    </Button>
                </div>
            </div>
        </div>
    );
}
