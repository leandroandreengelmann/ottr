"use client";

import React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
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
import { triggerSOSAction, resolveSOSAction } from "@/app/actions/security";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SOSButton() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [activeEmergency, setActiveEmergency] = React.useState<string | null>(null);

    const handleSOS = async () => {
        setIsLoading(true);
        try {
            // No futuro aqui pegaremos a latitude/longitude real do mapa/GPS
            const result = await triggerSOSAction();
            setActiveEmergency(result.id);
            toast.error("ALERTA SOS ENVIADO! Seu grupo de segurança foi notificado.", {
                duration: 10000,
                position: "top-center",
            });
        } catch (error: any) {
            console.error("Erro ao disparar SOS:", error);
            toast.error(`Falha ao enviar SOS: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResolveSOS = async () => {
        if (!activeEmergency) return;
        setIsLoading(true);
        try {
            await resolveSOSAction(activeEmergency);
            setActiveEmergency(null);
            toast.success("SOS encerrado com sucesso. Situação normalizada.");
        } catch (error: any) {
            console.error("Erro ao encerrar SOS:", error);
            toast.error(`Falha ao encerrar SOS: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute bottom-6 right-4 z-50">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="destructive"
                        className={`size-14 rounded-full shadow-xl border-4 border-white hover:scale-105 active:scale-95 transition-all animate-in zoom-in duration-300 ${activeEmergency ? 'animate-pulse shadow-destructive/50 ring-4 ring-destructive/30' : 'shadow-destructive/30'}`}
                    >
                        <span className="text-white font-black text-sm tracking-tighter">
                            {activeEmergency ? "!!" : "SOS"}
                        </span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-destructive font-black text-xl flex items-center gap-2">
                            <AlertTriangle className="size-6" />
                            {activeEmergency ? "SOS EM ANDAMENTO" : "CONFIRMAR SOS?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-medium text-gray-600">
                            {activeEmergency
                                ? "Seu grupo de segurança e a central foram notificados. Mantenha a calma."
                                : "Isso enviará um alerta imediato de segurança para a central e contatos de emergência com sua localização."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="h-12 rounded-xl font-bold">
                            {activeEmergency ? "Voltar" : "Cancelar"}
                        </AlertDialogCancel>
                        {activeEmergency ? (
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleResolveSOS();
                                }}
                                disabled={isLoading}
                                className="h-12 rounded-xl bg-gray-900 text-white font-black hover:bg-gray-800"
                            >
                                {isLoading ? (
                                    <Loader2 className="size-4 animate-spin mr-2" />
                                ) : null}
                                DESATIVAR ALERTA
                            </AlertDialogAction>
                        ) : (
                            <AlertDialogAction
                                onClick={(e) => {
                                    if (activeEmergency) return;
                                    e.preventDefault();
                                    handleSOS();
                                }}
                                disabled={isLoading}
                                className="h-12 rounded-xl bg-destructive text-white font-black hover:bg-destructive/90"
                            >
                                {isLoading ? (
                                    <Loader2 className="size-4 animate-spin mr-2" />
                                ) : null}
                                ENVIAR ALERTA AGORA
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
