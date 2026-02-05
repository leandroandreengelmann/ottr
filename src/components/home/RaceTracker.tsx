'use client'

import { useEffect, useRef } from 'react'
import { useRaceStore } from '@/store/useRaceStore'

export function RaceTracker() {
    const { state, addRoutePoint, isPaused } = useRaceStore()
    const watchId = useRef<number | null>(null)
    const lastPointTime = useRef<number>(0)

    // Config: Only add a point if at least 10 seconds have passed or state changed
    const MIN_INTERVAL_MS = 10000

    useEffect(() => {
        const isActive = state === "EM_DESLOCAMENTO" || state === "EM_CORRIDA" || state === "AGUARDANDO_EMBARQUE"

        if (isActive && !isPaused && typeof window !== 'undefined' && 'geolocation' in navigator) {
            watchId.current = navigator.geolocation.watchPosition(
                (position) => {
                    const now = Date.now()
                    if (now - lastPointTime.current > MIN_INTERVAL_MS) {
                        addRoutePoint({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                        lastPointTime.current = now
                    }
                },
                (error) => {
                    console.error("Error tracking location:", error)
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000
                }
            )
        } else {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current)
                watchId.current = null
            }
        }

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current)
            }
        }
    }, [state, isPaused, addRoutePoint])

    return null // This is a logic-only component
}
