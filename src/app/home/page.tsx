"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HomeLivre } from "@/components/home/HomeLivre";
import { HomeDeslocamento } from "@/components/home/HomeDeslocamento";
import { HomeAguardandoEmbarque } from "@/components/home/HomeAguardandoEmbarque";
import { HomeEmCorrida } from "@/components/home/HomeEmCorrida";
import { HomeFinalizar } from "@/components/home/HomeFinalizar";
import { HomeDefinirValor } from "@/components/home/HomeDefinirValor";
import { HomeRecibo } from "@/components/home/HomeRecibo";
import { useRaceStore } from "@/store/useRaceStore";
import { GoogleMapsProvider } from "@/components/providers/GoogleMapsProvider";
import { RaceTracker } from "@/components/home/RaceTracker";
import { LocationTracker } from "@/components/home/LocationTracker";

export default function HomePage() {
    const { state } = useRaceStore();

    const renderContent = () => {
        switch (state) {
            case "EM_DESLOCAMENTO":
                return <HomeDeslocamento />;
            case "AGUARDANDO_EMBARQUE":
                return <HomeAguardandoEmbarque />;
            case "EM_CORRIDA":
                return <HomeEmCorrida />;
            case "FINALIZANDO":
                return <HomeFinalizar />;
            case "DEFINIR_VALOR":
                return <HomeDefinirValor />;
            case "RECIBO":
                return <HomeRecibo />;
            default:
                return <HomeLivre />;
        }
    };

    return (
        <GoogleMapsProvider>
            <RaceTracker />
            <LocationTracker />
            <AppShell
                activeOperation="Parceiros do Centro"
                driverStatus={state === "LIVRE" ? "Livre" : "Operando"}
            >
                {renderContent()}
            </AppShell>
        </GoogleMapsProvider>
    );
}
