"use client";

import { useEffect, useRef } from "react";
import { useRaceStore } from "@/store/useRaceStore";

export function LocationTracker() {
    const { state, isPaused, setCurrentLocation, addRoutePoint } = useRaceStore();
    const watchId = useRef<number | null>(null);
    const lastPointRef = useRef<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        // Ativamos o rastreio em todos os estados principais para diagnóstico
        const isActive = state === "LIVRE" || state === "EM_DESLOCAMENTO" || state === "EM_CORRIDA" || state === "AGUARDANDO_EMBARQUE";

        if (isActive && !isPaused) {
            if ("geolocation" in navigator) {
                const { setLocationError } = useRaceStore.getState();

                // Captura inicial agressiva ignorando cache
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude: lat, longitude: lng } = position.coords;
                        setCurrentLocation({ lat, lng });
                        setLocationError(null);
                    },
                    (error) => {
                        console.warn("GPS: Falha na captura inicial:", error.message);
                        setLocationError(`Erro inicial: ${error.message} (Código ${error.code})`);
                    },
                    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
                );

                watchId.current = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude: lat, longitude: lng } = position.coords;
                        const newPoint = { lat, lng };

                        setCurrentLocation(newPoint);
                        setLocationError(null);

                        // O rastro da rota só em deslocamento/corrida
                        if (state !== "LIVRE") {
                            if (!lastPointRef.current || hasMovedSignificantly(lastPointRef.current, newPoint)) {
                                addRoutePoint(newPoint);
                                lastPointRef.current = newPoint;
                            }
                        }
                    },
                    (error) => {
                        const messages = {
                            [error.PERMISSION_DENIED]: "Permissão de GPS negada pelo usuário ou navegador.",
                            [error.POSITION_UNAVAILABLE]: "Sinal de GPS indisponível no local.",
                            [error.TIMEOUT]: "Tempo esgotado ao tentar fixar sinal de GPS."
                        };
                        const errMsg = messages[error.code as keyof typeof messages] || `Erro desconhecido: ${error.message}`;
                        console.error("GPS Error:", errMsg);
                        setLocationError(errMsg);
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0, // CRITICAL: Não usar coordenadas velhas/cacheadas
                        timeout: 15000
                    }
                );
            } else {
                useRaceStore.getState().setLocationError("Navegador não suporta Geolocation.");
            }
        } else {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
                watchId.current = null;
            }
        }

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, [state, isPaused, setCurrentLocation, addRoutePoint]);

    return null;
}

// Função auxiliar simples para evitar excesso de pontos se o carro estiver parado
function hasMovedSignificantly(p1: { lat: number, lng: number }, p2: { lat: number, lng: number }) {
    const threshold = 0.0001; // Aproximadamente 10-15 metros
    return Math.abs(p1.lat - p2.lat) > threshold || Math.abs(p1.lng - p2.lng) > threshold;
}
