"use client";

import React from "react";
import {
    CheckCircle,
    MapPin,
    User,
    CreditCard,
    Share2,
    Plus,
    FileText,
    Download,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRaceStore } from "@/store/useRaceStore";
import { getDriverProfileAction, DriverProfile } from "@/app/actions/rides";
import { generateReceiptPDF } from "@/app/actions/generateReceiptPDF";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function HomeRecibo() {
    const {
        currentValue,
        passengerName,
        passengerCPF,
        passengerPhone,
        raceDistance,
        raceDuration,
        paymentMethod,
        paymentStatus,
        raceEndTime,
        startNewRide
    } = useRaceStore();

    const [driver, setDriver] = React.useState<DriverProfile | null>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

    React.useEffect(() => {
        getDriverProfileAction().then((result) => {
            if (result.data) {
                setDriver(result.data);
            }
        });
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatDate = (timestamp: number | null) => {
        if (!timestamp) return new Date().toLocaleString("pt-BR");
        return new Date(timestamp).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const paymentMethodLabel: Record<string, string> = {
        PIX: "PIX",
        DINHEIRO: "Dinheiro",
        CREDITO: "Cartão Crédito",
        DEBITO: "Cartão Débito",
        CARTAO: "Cartão",
        OUTRO: "Outros"
    };

    const handleDownloadPDF = async () => {
        if (!driver) {
            toast.error("Dados do motorista não carregados");
            return;
        }

        setIsGeneratingPDF(true);
        try {
            const result = await generateReceiptPDF({
                driver: {
                    nome: driver.nome,
                    cpf: driver.cpf
                },
                passenger: passengerName || passengerCPF || passengerPhone
                    ? {
                        name: passengerName || undefined,
                        cpf: passengerCPF || undefined,
                        phone: passengerPhone || undefined
                    }
                    : undefined,
                race: {
                    distance: raceDistance,
                    duration: raceDuration,
                    endTime: raceEndTime
                },
                payment: {
                    method: paymentMethod || "OUTRO",
                    status: paymentStatus || "PENDENTE",
                    value: currentValue || 0
                }
            });

            if (!result.success || !result.pdf) {
                throw new Error(result.error || "Erro ao gerar PDF");
            }

            // Converter base64 para Blob
            const byteCharacters = atob(result.pdf);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });

            // Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = result.fileName || `comprovante-corrida-${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success("PDF gerado com sucesso!");
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            toast.error("Erro ao gerar PDF");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleShare = () => {
        const text = `🚗 *COMPROVANTE DE CORRIDA - OTTR*

📅 *Data:* ${formatDate(raceEndTime)}

👤 *Motorista:* ${driver?.nome || "—"}
📄 *CPF:* ${driver?.cpf || "—"}

${passengerName ? `👥 *Passageiro:* ${passengerName}` : ""}
${passengerCPF ? `📄 *CPF:* ${passengerCPF}` : ""}
${passengerPhone ? `📱 *Telefone:* ${passengerPhone}` : ""}

📍 *Distância:* ${(raceDistance / 1000).toFixed(2)} km
⏱️ *Duração:* ${formatTime(raceDuration)}

💳 *Pagamento:* ${paymentMethodLabel[paymentMethod || "OUTRO"] || paymentMethod}
📊 *Status:* ${paymentStatus === "PAGO" ? "✅ Pago" : "⏳ Pendente"}

💰 *VALOR TOTAL: R$ ${currentValue?.toFixed(2) || "0,00"}*

—
_Gerado por SISTEM-OTTR_`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encodedText}`, "_blank");
    };

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background font-sans">
            {/* Header com sucesso */}
            <div className="shrink-0 pt-6 pb-4 px-4 text-center">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-success/10 mb-3">
                    <CheckCircle className="size-8 text-success" />
                </div>
                <h1 className="text-2xl font-black text-gray-900">
                    Corrida Finalizada!
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(raceEndTime)}
                </p>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto container px-4 py-2 space-y-4 pb-4 bg-background">
                {/* Valor em destaque */}
                <div className="text-center py-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Valor Total
                    </span>
                    <p className="text-5xl font-black text-primary mt-1">
                        R$ {currentValue?.toFixed(2) || "0,00"}
                    </p>
                    <div className={cn(
                        "inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                        paymentStatus === "PAGO"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                    )}>
                        {paymentStatus === "PAGO" ? "Pago" : "Pendente (Fiado)"}
                    </div>
                </div>

                {/* Card Motorista */}
                <Card className="border-gray-100 shadow-sm">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                            <FileText className="size-4 text-primary" />
                            Dados do Motorista
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground text-xs">Nome</span>
                                <p className="font-bold text-gray-900">{driver?.nome || "—"}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground text-xs">CPF</span>
                                <p className="font-bold text-gray-900">{driver?.cpf || "—"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Passageiro (se houver) */}
                {(passengerName || passengerCPF || passengerPhone) && (
                    <Card className="border-gray-100 shadow-sm">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                                <User className="size-4 text-primary" />
                                Dados do Passageiro
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {passengerName && (
                                    <div>
                                        <span className="text-muted-foreground text-xs">Nome</span>
                                        <p className="font-bold text-gray-900">{passengerName}</p>
                                    </div>
                                )}
                                {passengerCPF && (
                                    <div>
                                        <span className="text-muted-foreground text-xs">CPF</span>
                                        <p className="font-bold text-gray-900">{passengerCPF}</p>
                                    </div>
                                )}
                                {passengerPhone && (
                                    <div className="col-span-2">
                                        <span className="text-muted-foreground text-xs">Telefone</span>
                                        <p className="font-bold text-gray-900">{passengerPhone}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Card Corrida */}
                <Card className="border-gray-100 shadow-sm">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                            <MapPin className="size-4 text-primary" />
                            Detalhes da Corrida
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground text-xs">Distância</span>
                                <p className="font-bold text-gray-900">{(raceDistance / 1000).toFixed(2)} km</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground text-xs">Duração</span>
                                <p className="font-bold text-gray-900">{formatTime(raceDuration)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Pagamento */}
                <Card className="border-gray-100 shadow-sm">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                            <CreditCard className="size-4 text-primary" />
                            Pagamento
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground text-xs">Método</span>
                                <p className="font-bold text-gray-900">
                                    {paymentMethodLabel[paymentMethod || "OUTRO"] || paymentMethod}
                                </p>
                            </div>
                            <div>
                                <span className="text-muted-foreground text-xs">Status</span>
                                <p className={cn(
                                    "font-bold",
                                    paymentStatus === "PAGO" ? "text-success" : "text-warning"
                                )}>
                                    {paymentStatus === "PAGO" ? "Pago" : "Pendente"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ações */}
                <div className="space-y-3 pt-2 pb-[max(2rem,env(safe-area-inset-bottom))]">
                    <Button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold uppercase tracking-wide shadow-lg shadow-primary/20"
                    >
                        {isGeneratingPDF ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Gerando PDF...
                            </>
                        ) : (
                            <>
                                <Download className="size-4 mr-2" />
                                Baixar Comprovante PDF
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={handleShare}
                        variant="outline"
                        className="w-full h-12 rounded-xl border-success text-success hover:bg-success/5 text-sm font-bold uppercase tracking-wide"
                    >
                        <Share2 className="size-4 mr-2" />
                        Compartilhar via WhatsApp
                    </Button>

                    <Button
                        onClick={() => startNewRide()}
                        variant="outline"
                        className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5 text-sm font-bold uppercase tracking-wide"
                    >
                        <Plus className="size-4 mr-2" />
                        Nova Corrida
                    </Button>
                </div>
            </div>
        </div>
    );
}
