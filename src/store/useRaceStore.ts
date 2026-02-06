import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RaceState = "LIVRE" | "EM_DESLOCAMENTO" | "AGUARDANDO_EMBARQUE" | "EM_CORRIDA" | "FINALIZANDO" | "DEFINIR_VALOR";
export type PaymentMethod = "PIX" | "DINHEIRO" | "CARTAO" | "OUTRO" | "CREDITO" | "DEBITO" | null;
export type PaymentStatus = "PAGO" | "PENDENTE" | null;

type RoutePoint = { lat: number; lng: number; ts: number };

// Helper: Calculate distance in METERS from routePoints using Haversine
function calculateDistanceMeters(points: RoutePoint[]): number {
    if (points.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
        total += haversine(points[i - 1], points[i]);
    }
    return Math.round(total);
}

function haversine(p1: { lat: number; lng: number }, p2: { lat: number; lng: number }): number {
    const R = 6371000; // Earth radius in meters
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(p2.lat - p1.lat);
    const dLng = toRad(p2.lng - p1.lng);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface RaceStore {
    state: RaceState;
    // Active phase (ephemeral)
    elapsedTime: number;
    routePoints: RoutePoint[];
    // Displacement block (frozen at arriveAtPickup)
    displacementStartTime: number | null;
    displacementEndTime: number | null;
    displacementDuration: number;
    displacementDistance: number; // in METERS
    displacementRoutePoints: RoutePoint[];
    // Race block (frozen at goToFinalize)
    raceStartTime: number | null;
    raceEndTime: number | null;
    raceDuration: number;
    raceDistance: number; // in METERS
    raceRoutePoints: RoutePoint[];
    // Other
    passengerName: string;
    passengerCPF: string;
    passengerPhone: string;
    currentLocation: { lat: number; lng: number } | null;
    locationError: string | null;
    isPaused: boolean;
    currentValue: number | null;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;

    // Actions
    startDeslocamento: () => void;
    arriveAtPickup: () => void;
    startRace: () => void;
    goToFinalize: () => void;
    finishRace: () => void;
    cancelRace: () => void;
    backToDeslocamento: () => void;
    pauseRace: () => void;
    updateTimer: () => void;
    setRaceValue: (value: number) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    setPaymentStatus: (status: PaymentStatus) => void;
    setPassengerName: (name: string) => void;
    setPassengerCPF: (cpf: string) => void;
    setPassengerPhone: (phone: string) => void;
    setCurrentLocation: (point: { lat: number; lng: number }) => void;
    setLocationError: (error: string | null) => void;
    addRoutePoint: (point: { lat: number; lng: number }) => void;
    goToSetValue: () => void;
    confirmCheckout: () => void;
}

export const useRaceStore = create<RaceStore>()(
    persist(
        (set, get) => ({
            state: "LIVRE",
            elapsedTime: 0,
            routePoints: [],
            // Displacement
            displacementStartTime: null,
            displacementEndTime: null,
            displacementDuration: 0,
            displacementDistance: 0,
            displacementRoutePoints: [],
            // Race
            raceStartTime: null,
            raceEndTime: null,
            raceDuration: 0,
            raceDistance: 0,
            raceRoutePoints: [],
            // Other
            passengerName: "",
            passengerCPF: "",
            passengerPhone: "",
            currentLocation: null,
            locationError: null,
            isPaused: false,
            currentValue: null,
            paymentMethod: null,
            paymentStatus: "PAGO",

            startDeslocamento: () => set({
                state: "EM_DESLOCAMENTO",
                displacementStartTime: Date.now(),
                displacementEndTime: null,
                elapsedTime: 0,
                routePoints: [],
                passengerName: "",
                passengerCPF: "",
                passengerPhone: ""
            }),

            arriveAtPickup: () => {
                const { elapsedTime, routePoints } = get();
                set({
                    state: "AGUARDANDO_EMBARQUE",
                    displacementEndTime: Date.now(),
                    // FREEZE (defensive copy)
                    displacementDuration: elapsedTime,
                    displacementDistance: calculateDistanceMeters(routePoints),
                    displacementRoutePoints: routePoints.map(p => ({ ...p })),
                    // RESET active
                    elapsedTime: 0,
                    routePoints: []
                });
            },

            startRace: () => set({
                state: "EM_CORRIDA",
                raceStartTime: Date.now(),
                raceEndTime: null,
                elapsedTime: 0,
                routePoints: []
            }),

            goToFinalize: () => {
                const { elapsedTime, routePoints } = get();
                set({
                    state: "FINALIZANDO",
                    raceEndTime: Date.now(),
                    // FREEZE (defensive copy)
                    raceDuration: elapsedTime,
                    raceDistance: calculateDistanceMeters(routePoints),
                    raceRoutePoints: routePoints.map(p => ({ ...p }))
                });
            },

            finishRace: () => set({
                state: "LIVRE",
                elapsedTime: 0,
                routePoints: []
            }),

            cancelRace: () => set({
                state: "LIVRE",
                elapsedTime: 0,
                routePoints: [],
                displacementStartTime: null,
                displacementEndTime: null,
                displacementDuration: 0,
                displacementDistance: 0,
                displacementRoutePoints: [],
                raceStartTime: null,
                raceEndTime: null,
                raceDuration: 0,
                raceDistance: 0,
                raceRoutePoints: [],
                locationError: null
            }),

            backToDeslocamento: () => set({
                state: "EM_DESLOCAMENTO"
            }),

            setRaceValue: (currentValue) => set({ currentValue }),
            setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
            setPaymentStatus: (paymentStatus) => set({ paymentStatus }),
            setPassengerName: (passengerName) => set({ passengerName }),
            setPassengerCPF: (passengerCPF) => set({ passengerCPF }),
            setPassengerPhone: (passengerPhone) => set({ passengerPhone }),
            setCurrentLocation: (currentLocation) => set({ currentLocation, locationError: null }),
            setLocationError: (locationError) => set({ locationError }),
            addRoutePoint: (point) => {
                const { state } = get();
                // Only add points during active tracking phases
                if (state === "EM_DESLOCAMENTO" || state === "EM_CORRIDA") {
                    set((s) => ({
                        routePoints: [...s.routePoints, { ...point, ts: Date.now() }]
                    }));
                }
            },

            goToSetValue: () => set({
                state: "DEFINIR_VALOR"
            }),

            confirmCheckout: () => set({
                state: "LIVRE",
                elapsedTime: 0,
                routePoints: [],
                displacementStartTime: null,
                displacementEndTime: null,
                displacementDuration: 0,
                displacementDistance: 0,
                displacementRoutePoints: [],
                raceStartTime: null,
                raceEndTime: null,
                raceDuration: 0,
                raceDistance: 0,
                raceRoutePoints: [],
                passengerName: "",
                passengerCPF: "",
                passengerPhone: "",
                locationError: null,
                isPaused: false,
                currentValue: null,
                paymentMethod: null,
                paymentStatus: "PAGO"
            }),

            pauseRace: () => set((s) => ({ isPaused: !s.isPaused })),

            updateTimer: () => {
                const { state, displacementStartTime, raceStartTime, isPaused } = get();
                if (isPaused) return;

                let startTime: number | null = null;
                if (state === "EM_DESLOCAMENTO") {
                    startTime = displacementStartTime;
                } else if (state === "EM_CORRIDA") {
                    startTime = raceStartTime;
                }
                // AGUARDANDO_EMBARQUE, FINALIZANDO, LIVRE => timer does NOT run

                if (startTime) {
                    const now = Date.now();
                    set({ elapsedTime: Math.floor((now - startTime) / 1000) });
                }
            }
        }),
        {
            name: "race-storage",
        }
    )
);
