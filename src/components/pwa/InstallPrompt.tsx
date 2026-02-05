"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Impede que o mini-infobar padrão apareça no mobile
            e.preventDefault();
            // Guarda o evento para ser disparado depois
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Mostra o prompt de instalação
        deferredPrompt.prompt();

        // Espera pela resposta do usuário
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("Usuário aceitou a instalação do PWA");
        } else {
            console.log("Usuário recusou a instalação do PWA");
        }

        // Limpa o prompt
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-8 md:bottom-8 md:w-80 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-orange-100 flex flex-col gap-3 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">
                    <Download className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Instalar SISTEM-OTTR</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                        Tenha uma experiência de aplicativo completa em seu celular.
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setShowPrompt(false)}
                >
                    Agora não
                </Button>
                <Button
                    size="sm"
                    className="flex-1 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleInstallClick}
                >
                    Instalar App
                </Button>
            </div>
        </div>
    );
}
