"use client";

import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
    if (!API_KEY) {
        console.warn("Google Maps API Key missing. Please check your .env.local file.");
    }

    return (
        <APIProvider apiKey={API_KEY} onLoad={() => console.log("Google Maps API loaded.")}>
            {children}
        </APIProvider>
    );
}
