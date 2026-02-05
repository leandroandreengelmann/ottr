"use client";

import { useState, useRef, useCallback } from "react";

export function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const recordingRequestedRef = useRef(false);

    const startTimeRef = useRef<number>(0);

    const startRecording = useCallback(async () => {
        recordingRequestedRef.current = true;
        startTimeRef.current = Date.now();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (!recordingRequestedRef.current) {
                stream.getTracks().forEach(track => track.stop());
                return;
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const duration = Date.now() - startTimeRef.current;

                // Se durar menos de 500ms, descartamos para evitar erro 400 da OpenAI
                if (duration < 500) {
                    console.warn("Gravação muito curta descartada.");
                    setAudioBlob(null);
                } else {
                    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                    setAudioBlob(blob);
                }

                stream.getTracks().forEach(track => track.stop());
                mediaRecorderRef.current = null;
            };

            mediaRecorder.start();
            setIsRecording(true);
            setAudioBlob(null);
        } catch (error) {
            console.error("Erro ao acessar microfone:", error);
            recordingRequestedRef.current = false;
            setIsRecording(false);
        }
    }, []);

    const stopRecording = useCallback(() => {
        recordingRequestedRef.current = false;
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, []);

    return {
        isRecording,
        audioBlob,
        startRecording,
        stopRecording
    };
}
