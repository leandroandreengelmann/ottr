"use client";

import React, { useEffect, useState, useRef } from "react";
import { Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { processVoiceCommandAction } from "@/app/actions/ai";
import { useRaceStore } from "@/store/useRaceStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoiceControlProps {
    hintText: string;
    className?: string;
}

export function VoiceControl({ hintText, className }: VoiceControlProps) {
    const {
        isPaused, pauseRace, goToFinalize, setRaceValue, setPaymentMethod,
        setPassengerName, setPassengerCPF, setPassengerPhone,
        arriveAtPickup, startRace
    } = useRaceStore();

    const [showHint, setShowHint] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const micButtonRef = useRef<HTMLButtonElement>(null);

    const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    // Adicionar listeners de touch não-passivos para o botão de microfone
    useEffect(() => {
        const micBtn = micButtonRef.current;
        if (!micBtn) return;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            startRecording();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            stopRecording();
        };

        micBtn.addEventListener("touchstart", handleTouchStart, { passive: false });
        micBtn.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            micBtn.removeEventListener("touchstart", handleTouchStart);
            micBtn.removeEventListener("touchend", handleTouchEnd);
        };
    }, [startRecording, stopRecording]);

    // Processar áudio quando a gravação parar
    useEffect(() => {
        if (audioBlob && !isRecording) {
            handleProcessAudio(audioBlob);
        }
    }, [audioBlob, isRecording]);

    const handleProcessAudio = async (blob: Blob) => {
        setIsProcessing(true);
        const toastId = toast.loading("Processando voz...");

        try {
            const formData = new FormData();
            formData.append("audio", blob, "command.webm");

            const result = await processVoiceCommandAction(formData);

            if (result.action === "NONE") {
                toast.error(result.message || "Não entendi o comando.", { id: toastId });
                return;
            }

            // Executar ações baseadas na IA
            switch (result.action) {
                case "FINALIZE":
                    if (result.value) setRaceValue(result.value);
                    if (result.method) setPaymentMethod(result.method);
                    toast.success(result.message, { id: toastId });
                    goToFinalize();
                    break;
                case "SET_VALUE":
                    if (result.value) {
                        setRaceValue(result.value);
                        toast.success(`Valor definido: R$ ${result.value}`, { id: toastId });
                    }
                    break;
                case "PAUSE":
                    if (!isPaused) {
                        pauseRace();
                        toast.success("Corrida pausada", { id: toastId });
                    } else {
                        toast.dismiss(toastId);
                    }
                    break;
                case "RESUME":
                    if (isPaused) {
                        pauseRace();
                        toast.success("Corrida retomada", { id: toastId });
                    } else {
                        toast.dismiss(toastId);
                    }
                    break;
                case "ARRIVE":
                    arriveAtPickup();
                    toast.success("Chegada ao local registrada!", { id: toastId });
                    break;
                case "START_RIDE":
                    startRace();
                    toast.success("Corrida iniciada!", { id: toastId });
                    break;
                case "UPDATE_PASSENGER":
                    if (result.passengerName) setPassengerName(result.passengerName);
                    if (result.passengerCPF) setPassengerCPF(result.passengerCPF);
                    if (result.passengerPhone) setPassengerPhone(result.passengerPhone);
                    if (result.value) setRaceValue(result.value);
                    toast.success(result.message || "Dados atualizados!", { id: toastId });
                    break;
                default:
                    toast.info(result.message, { id: toastId });
            }
        } catch (error) {
            console.error("Erro ao processar voz:", error);
            toast.error("Erro ao processar áudio.", { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={cn("absolute bottom-24 right-4 z-40 flex flex-col items-end gap-3", className)}>
            {showHint && !isRecording && (
                <div className="bg-white/95 backdrop-blur-sm border border-orange-100 px-4 py-2 rounded-2xl shadow-xl animate-in slide-in-from-right-full duration-500 mb-2 max-w-[200px]">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider leading-tight">
                        Diga: <br />
                        <span className="text-gray-900 line-clamp-2">{hintText}</span>
                    </p>
                    <div className="absolute right-6 -bottom-1.5 size-3 bg-white rotate-45 border-r border-b border-orange-100" />
                </div>
            )}

            {isRecording && (
                <div className="bg-primary/90 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-2xl shadow-xl animate-pulse mb-2">
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                        Ouvindo...
                    </p>
                </div>
            )}

            <Button
                ref={micButtonRef}
                size="icon"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                onContextMenu={(e) => e.preventDefault()}
                disabled={isProcessing}
                style={{ touchAction: "none" }}
                className={cn(
                    "size-16 rounded-full shadow-xl transition-all active:scale-95 border-4 border-white",
                    isRecording ? "bg-red-500 hover:bg-red-600 scale-110" : "bg-primary hover:bg-primary/90",
                    isProcessing && "opacity-50 cursor-not-allowed"
                )}
            >
                {isProcessing ? (
                    <Loader2 className="size-8 text-white animate-spin" />
                ) : (
                    <Mic className={cn("size-8 text-white", isRecording && "animate-pulse")} />
                )}
            </Button>
        </div>
    );
}
