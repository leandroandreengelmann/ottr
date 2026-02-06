"use client";

import React from "react";
import {
    CheckCircle2,
    Clock,
    DollarSign,
    CreditCard,
    Banknote,
    QrCode,
    Receipt,
    User,
    ChevronRight,
    Wallet,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRaceStore, PaymentMethod } from "@/store/useRaceStore";
import { cn } from "@/lib/utils";
import { recordRideAction } from "@/app/actions/rides";
import { toast } from "sonner";

export function HomeFinalizar() {
    const {
        raceDuration,
        raceDistance,
        raceRoutePoints,
        displacementDuration,
        displacementDistance,
        displacementRoutePoints,
        currentValue,
        setRaceValue,
        paymentMethod,
        setPaymentMethod,
        paymentStatus,
        setPaymentStatus,
        confirmCheckout,
        backToDeslocamento,
        passengerName,
        setPassengerName,
        passengerCPF,
        passengerPhone
    } = useRaceStore();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    const paymentOptions: { id: PaymentMethod; label: string; icon: any }[] = [
        { id: "PIX", label: "Pix", icon: QrCode },
        { id: "DINHEIRO", label: "Dinheiro", icon: Banknote },
        { id: "CREDITO", label: "C. Crédito", icon: CreditCard },
        { id: "DEBITO", label: "C. Débito", icon: CreditCard },
        { id: "OUTRO", label: "Outros", icon: Wallet },
    ];

    return (
        <div className="flex flex-col h-full bg-background overflow-hidden font-sans">
            {/* Header Simples */}
            <div className="shrink-0 pt-4 pb-2 px-4 flex items-center gap-3">
                <Button variant="ghost" size="icon" className="-ml-2 rounded-full" onClick={() => backToDeslocamento()}>
                    <ChevronLeft className="size-6 text-gray-500" />
                </Button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-none">
                        Finalizar Corrida
                    </h1>
                </div>
            </div>

            <div className="flex-1 container px-4 py-2 space-y-4">
                {/* Resumo Clean (3 Colunas) */}
                <div className="grid grid-cols-3 gap-0 border-b border-gray-100 pb-4">
                    {/* Distância */}
                    <div className="flex flex-col items-center gap-1 border-r border-gray-100 px-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Distância</span>
                        <span className="text-lg font-black text-gray-900 leading-none">{(raceDistance / 1000).toFixed(1)} km</span>
                    </div>
                    {/* Duração */}
                    <div className="flex flex-col items-center gap-1 border-r border-gray-100 px-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Duração</span>
                        <span className="text-lg font-black text-gray-900 leading-none">
                            {formatTime(raceDuration)}
                        </span>
                    </div>
                    {/* Total */}
                    <div className="flex flex-col items-center gap-1 px-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</span>
                        <span className="text-lg font-black text-success leading-none">
                            R$ {currentValue || "0"}
                        </span>
                    </div>
                </div>

                {/* Valor Input area */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900">
                        Valor Final (R$)
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-gray-400">R$</div>
                        <input
                            type="number"
                            placeholder="0,00"
                            className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-300"
                            onChange={(e) => setRaceValue(Number(e.target.value))}
                            value={currentValue || ""}
                        />
                    </div>
                </div>

                {/* Pagamento */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900">
                        Forma de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {paymentOptions.map((opt) => (
                            <Button
                                key={opt.id}
                                onClick={() => setPaymentMethod(opt.id)}
                                variant="outline"
                                className={cn(
                                    "h-12 rounded-xl border-gray-200 justify-start px-3 gap-2 transition-all hover:bg-gray-50",
                                    paymentMethod === opt.id
                                        ? "bg-primary/5 border-primary text-primary hover:bg-primary/10"
                                        : "bg-white text-gray-600"
                                )}
                            >
                                <opt.icon className={cn("size-4", paymentMethod === opt.id ? "text-primary" : "text-gray-400")} />
                                <span className={cn("text-[11px] font-bold uppercase tracking-wide truncate", paymentMethod === opt.id ? "text-primary" : "text-gray-600")}>{opt.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900">
                        Status do Pagamento
                    </label>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setPaymentStatus("PAGO")}
                            className={cn(
                                "flex-1 h-11 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all shadow-none",
                                paymentStatus === "PAGO" ? "bg-success text-white hover:bg-success/90" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            Pago Agora
                        </Button>
                        <Button
                            onClick={() => setPaymentStatus("PENDENTE")}
                            className={cn(
                                "flex-1 h-11 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all shadow-none",
                                paymentStatus === "PENDENTE" ? "bg-warning text-white hover:bg-warning/90" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            Pendente (Fiado)
                        </Button>
                    </div>
                </div>

                {/* Passageiro */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-900">
                        Nome do Passageiro
                    </label>
                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 shadow-sm px-3 h-12">
                        <div className="size-8 shrink-0 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                            <User className="size-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Nome do cliente (opcional)"
                            className="flex-1 bg-transparent border-none text-sm font-bold text-gray-900 focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
                            value={passengerName}
                            onChange={(e) => setPassengerName(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Footer Fixo */}
            <div className="shrink-0 p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-20">
                <Button
                    onClick={async () => {
                        setIsSubmitting(true);
                        try {
                            const result = await recordRideAction({
                                valor: currentValue || 0,
                                metodo_pagamento: paymentMethod || 'OUTRO',
                                duracao_segundos: raceDuration,
                                distancia_metros: raceDistance,
                                status_pagamento: paymentStatus || 'PAGO',
                                nome_passageiro: passengerName,
                                cpf_passageiro: passengerCPF,
                                telefone_passageiro: passengerPhone,
                                rota: {
                                    displacement: {
                                        duration: displacementDuration,
                                        distance: displacementDistance,
                                        points: displacementRoutePoints
                                    },
                                    race: {
                                        duration: raceDuration,
                                        distance: raceDistance,
                                        points: raceRoutePoints
                                    }
                                }
                            });

                            if (result.success) {
                                toast.success("Corrida registrada com sucesso!");
                                confirmCheckout();
                            } else {
                                toast.error(result.error || "Erro ao salvar corrida");
                            }
                        } catch (error) {
                            toast.error("Erro inesperado ao salvar corrida");
                        } finally {
                            setIsSubmitting(false);
                        }
                    }}
                    disabled={!paymentMethod || isSubmitting}
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? (
                        <>
                            <Clock className="size-5 mr-2 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        "CONCLUIR CORRIDA"
                    )}
                </Button>
            </div>
        </div>
    );
}
