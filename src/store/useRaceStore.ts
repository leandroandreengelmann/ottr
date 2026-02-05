import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RaceState = "LIVRE" | "EM_DESLOCAMENTO" | "AGUARDANDO_EMBARQUE" | "EM_CORRIDA" | "FINALIZANDO" | "DEFINIR_VALOR";
export type PaymentMethod = "PIX" | "DINHEIRO" | "CARTAO" | "OUTRO" | null;
export type PaymentStatus = "PAGO" | "PENDENTE" | null;

interface RaceStore {
    state: RaceState;
    startTime: number | null;
    elapsedTime: number; // in seconds
    passengerName: string;
    passengerCPF: string;
    passengerPhone: string;
    currentLocation: { lat: number; lng: number } | null;
    locationError: string | null;
    routePoints: { lat: number; lng: number; ts: number }[];
    isPaused: boolean;
    currentValue: number | null;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;

    // Actions
    startDeslocamento: () => void;
    arriveAtPickup: () => void;
    startRace: () => void;
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
    goToFinalize: () => void;
    goToSetValue: () => void;
    confirmCheckout: () => void;
}

export const useRaceStore = create<RaceStore>()(
    persist(
        (set, get) => ({
            state: "LIVRE",
            startTime: null,
            elapsedTime: 0,
            passengerName: "",
            passengerCPF: "",
            passengerPhone: "",
            currentLocation: null,
            locationError: null,
            routePoints: [],
            isPaused: false,
            currentValue: null,
            paymentMethod: null,
            paymentStatus: "PAGO",

            startDeslocamento: () => set({
                state: "EM_DESLOCAMENTO",
                startTime: Date.now(),
                elapsedTime: 0,
                routePoints: [],
                passengerName: "",
                passengerCPF: "",
                passengerPhone: ""
            }),

            arriveAtPickup: () => set({
                state: "AGUARDANDO_EMBARQUE"
            }),

            startRace: () => set({
                state: "EM_CORRIDA",
                // We might want to reset timer or keep it cumulative depending on requirements.
                // For now, let's keep it cumulative since startTime was set at displacement.
            }),

            finishRace: () => set({
                state: "LIVRE",
                startTime: null,
                elapsedTime: 0
            }),

            cancelRace: () => set({
                state: "LIVRE",
                startTime: null,
                elapsedTime: 0,
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
            addRoutePoint: (point) => set((state) => ({
                routePoints: [...state.routePoints, { ...point, ts: Date.now() }]
            })),

            goToFinalize: () => set({
                state: "FINALIZANDO"
            }),

            goToSetValue: () => set({
                state: "DEFINIR_VALOR"
            }),

            confirmCheckout: () => set({
                state: "LIVRE",
                startTime: null,
                elapsedTime: 0,
                passengerName: "",
                passengerCPF: "",
                passengerPhone: "",
                routePoints: [],
                locationError: null,
                isPaused: false,
                currentValue: null,
                paymentMethod: null,
                paymentStatus: "PAGO"
            }),

            pauseRace: () => set((state) => ({ isPaused: !state.isPaused })),

            updateTimer: () => {
                const { startTime, state, isPaused } = get();
                if (startTime && state !== "LIVRE" && !isPaused) {
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
