"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Verificação inicial
        if (!navigator.onLine) {
            setIsOffline(true);
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-destructive text-destructive-foreground py-2 px-4 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">
                Sem conexão — tentando reconectar...
            </span>
        </div>
    );
}
