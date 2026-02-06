"use client";

import React from "react";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useRaceStore } from "@/store/useRaceStore";

// Premium Silver/Gray Theme is now handled via Google Cloud Maps Management (mapId)

export function GoogleMapComponent() {
    const { currentLocation, routePoints, locationError } = useRaceStore();
    const map = useMap();

    // Coordenadas padrão apenas como fallback absoluto. 
    const defaultCenter = { lat: -23.5505, lng: -46.6333 };
    const center = currentLocation || defaultCenter;

    // Efeito para centralizar o mapa APENAS se houver localização atual e o mapa estiver carregado
    React.useEffect(() => {
        if (map && currentLocation) {
            map.panTo(currentLocation);
        }
    }, [map, currentLocation]);

    return (
        <div className="w-full h-full relative">
            <Map
                defaultZoom={15}
                center={center}
                mapId="bf50473b272553"
                disableDefaultUI={true}
                gestureHandling="greedy"
                className="w-full h-full"
            >
                {/* Marcador do Carro/Motorista - Usando mascote customizado para evitar deprecation do Pin */}
                {currentLocation && (
                    <AdvancedMarker position={currentLocation}>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute size-12 bg-primary/20 rounded-full animate-ping" />
                            <div className="relative z-10 size-10 bg-white p-1 rounded-full shadow-lg border-2 border-primary overflow-hidden">
                                <img
                                    src="/icons/mascot.png"
                                    alt="Motorista"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </AdvancedMarker>
                )}

                {/* Renderização da Rota (Polyline) */}
                <Polyline points={routePoints} />
            </Map>

            {/* Overlay de Diagnóstico de GPS */}
            {locationError && (
                <div className="absolute top-20 left-4 right-4 z-50 animate-in fade-in zoom-in duration-300">
                    <div className="bg-destructive/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-destructive/20 flex items-start gap-3">
                        <div className="size-5 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold">!</span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Problema no GPS</p>
                            <p className="text-sm font-medium leading-relaxed">{locationError}</p>
                            <p className="text-[10px] opacity-70 italic pt-1">O mapa pode mostrar sua última posição conhecida ou um ponto padrão.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente auxiliar para desenhar a linha no Google Maps (vis.gl requer Polyline manual via ref)
function Polyline({ points }: { points: { lat: number, lng: number }[] }) {
    const map = useMap();
    const polylineRef = React.useRef<google.maps.Polyline | null>(null);

    React.useEffect(() => {
        if (!map) return;

        if (polylineRef.current) {
            polylineRef.current.setMap(null);
        }

        polylineRef.current = new google.maps.Polyline({
            path: points,
            geodesic: true,
            strokeColor: "#EF6820",
            strokeOpacity: 0.8,
            strokeWeight: 4,
            map: map
        });

        return () => {
            if (polylineRef.current) {
                polylineRef.current.setMap(null);
            }
        };
    }, [map, points]);

    return null;
}
