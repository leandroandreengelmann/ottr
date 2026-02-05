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
        elapsedTime,
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
        passengerPhone,
        routePoints
    } = useRaceStore();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    const paymentOptions: { id: PaymentMethod; label: string; icon: any }[] = [
        { id: "PIX", label: "Pix", icon: QrCode },
        { id: "DINHEIRO", label: "Dinheiro", icon: Banknote },
        { id: "CARTAO", label: "Cartão", icon: CreditCard },
        { id: "OUTRO", label: "Outro", icon: Wallet },
    ];

    return (
        <div className="flex flex-col h-full bg-background overflow-y-auto">
            {/* Header Simples */}
            <div className="shrink-0 pt-6 pb-2 px-4 flex items-center gap-3">
                <Button variant="ghost" size="icon" className="-ml-2 rounded-full" onClick={() => backToDeslocamento()}>
                    <ChevronLeft className="size-6 text-gray-500" />
                </Button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-none">
                        Finalizar Corrida
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Confirme os dados do pagamento
                    </p>
                </div>
            </div>

            <div className="flex-1 container px-4 py-4 space-y-6 pb-32">
                {/* Resumo Card */}
                <Card className="border-gray-100 shadow-sm rounded-2xl bg-gray-50/50">
                    <CardContent className="p-4 flex items-center justify-around divide-x divide-gray-200">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <Clock className="size-5 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900 leading-none">
                                {formatTime(elapsedTime)}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Duração</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <DollarSign className="size-5 text-success" />
                            <span className="text-lg font-bold text-success leading-none">
                                R$ {currentValue || "0"}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Valor Input area */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-900">
                        Valor Final (R$)
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">R$</div>
                        <input
                            type="number"
                            placeholder="0,00"
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-xl font-bold text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-300"
                            onChange={(e) => setRaceValue(Number(e.target.value))}
                            value={currentValue || ""}
                        />
                    </div>
                </div>

                {/* Pagamento */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-900">
                        Forma de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {paymentOptions.map((opt) => (
                            <Button
                                key={opt.id}
                                onClick={() => setPaymentMethod(opt.id)}
                                variant="outline"
                                className={cn(
                                    "h-14 rounded-xl border-gray-200 justify-start px-4 gap-3 transition-all hover:bg-gray-50",
                                    paymentMethod === opt.id
                                        ? "bg-primary/5 border-primary text-primary hover:bg-primary/10"
                                        : "bg-white text-gray-600"
                                )}
                            >
                                <opt.icon className={cn("size-5", paymentMethod === opt.id ? "text-primary" : "text-gray-400")} />
                                <span className={cn("text-xs font-bold uppercase tracking-wide", paymentMethod === opt.id ? "text-primary" : "text-gray-600")}>{opt.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-900">
                        Status do Pagamento
                    </label>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setPaymentStatus("PAGO")}
                            className={cn(
                                "flex-1 h-12 rounded-xl text-xs font-bold uppercase tracking-wide transition-all shadow-none",
                                paymentStatus === "PAGO" ? "bg-success text-white hover:bg-success/90" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            Pago Agora
                        </Button>
                        <Button
                            onClick={() => setPaymentStatus("PENDENTE")}
                            className={cn(
                                "flex-1 h-12 rounded-xl text-xs font-bold uppercase tracking-wide transition-all shadow-none",
                                paymentStatus === "PENDENTE" ? "bg-warning text-white hover:bg-warning/90" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            Pendente (Fiado)
                        </Button>
                    </div>
                </div>

                {/* Passageiro */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-900">
                        Nome do Passageiro
                    </label>
                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm px-4">
                        <div className="size-10 shrink-0 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                            <User className="size-5" />
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
                                duracao_segundos: elapsedTime,
                                status_pagamento: paymentStatus || 'PAGO',
                                nome_passageiro: passengerName,
                                cpf_passageiro: passengerCPF,
                                telefone_passageiro: passengerPhone,
                                rota: routePoints
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
                        <>
                            <Receipt className="size-5 mr-2" />
                            Concluir Corrida
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
