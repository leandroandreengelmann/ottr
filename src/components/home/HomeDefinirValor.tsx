"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    Check,
    Eraser,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRaceStore } from "@/store/useRaceStore";
import { cn } from "@/lib/utils";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { SOSButton } from "./SOSButton";

export function HomeDefinirValor() {
    const { currentValue, setRaceValue, goToFinalize, state } = useRaceStore();
    const [inputValue, setInputValue] = useState(currentValue?.toString() || "");

    const chips = [10, 15, 20, 25, 30];

    const handleSave = () => {
        setRaceValue(Number(inputValue));
        if (state === "EM_CORRIDA" || state === "AGUARDANDO_EMBARQUE") {
            goToFinalize();
        } else {
            goToFinalize();
        }
    };

    const handleClear = () => {
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full bg-gray-50/50">
            {/* Mapa ao fundo com overlay escuro para foco no input */}
            <div className="flex-1 relative w-full overflow-hidden">
                <GoogleMapComponent />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                {/* Botão Voltar Absoluto */}
                <div className="absolute top-4 left-4 z-20">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => goToFinalize()}
                        className="rounded-full bg-white/90 shadow-sm hover:bg-white"
                    >
                        <ChevronLeft className="size-5 text-gray-900" />
                    </Button>
                </div>

                {/* SOS Button Flutuante */}
                <SOSButton />
            </div>

            {/* Painel de Entrada */}
            <div className="shrink-0 bg-background border-t border-gray-100 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] -mt-6 relative z-10">
                <div className="container px-4 py-8 space-y-8">

                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            Quanto foi combinado?
                        </h2>
                        <p className="text-sm font-medium text-muted-foreground">
                            Digite o valor acordado com o passageiro
                        </p>
                    </div>

                    {/* Input Gigante */}
                    <div className="relative max-w-xs mx-auto">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">R$</div>
                        <input
                            type="number"
                            autoFocus
                            placeholder="0,00"
                            className="w-full h-20 bg-gray-50 border border-gray-200 rounded-2xl pl-16 pr-12 text-4xl font-bold text-gray-900 text-center focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-300"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        {inputValue && (
                            <button
                                onClick={handleClear}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <Eraser className="size-5 text-gray-400" />
                            </button>
                        )}
                    </div>

                    {/* Chips Rápidos */}
                    <div className="space-y-3">
                        <div className="grid grid-cols-5 gap-2">
                            {chips.map((val) => (
                                <Button
                                    key={val}
                                    variant="outline"
                                    onClick={() => setInputValue(val.toString())}
                                    className={cn(
                                        "h-12 rounded-xl text-base font-bold transition-all p-0 border-gray-200",
                                        inputValue === val.toString()
                                            ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                            : "text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {val}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Ação Principal */}
                    <Button
                        onClick={handleSave}
                        disabled={!inputValue}
                        className="w-full h-14 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all shadow-md shadow-primary/20"
                    >
                        <Check className="size-5 mr-2" />
                        Confirmar Valor
                    </Button>
                </div>
            </div>
        </div>
    );
}
