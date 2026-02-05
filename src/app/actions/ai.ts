"use server";

import { OpenAI, toFile } from "openai";

export type AIActionResponse = {
    action: "FINALIZE" | "SET_VALUE" | "PAUSE" | "RESUME" | "UPDATE_PASSENGER" | "ARRIVE" | "START_RIDE" | "NONE";
    value?: number;
    method?: "PIX" | "DINHEIRO" | "CARTAO";
    passengerName?: string;
    passengerCPF?: string;
    passengerPhone?: string;
    message?: string;
    error?: string;
};

/**
 * Processa um comando de voz do motorista usando Whisper e GPT-4o-mini.
 * @param formData FormData contendo o arquivo de áudio 'audio'
 */
export async function processVoiceCommandAction(formData: FormData): Promise<AIActionResponse> {
    // Inicialização dentro da função para garantir acesso ao process.env em tempo de execução
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const audioFile = formData.get("audio") as File;
        if (!audioFile || audioFile.size === 0) {
            console.error("processVoiceCommandAction: Arquivo de áudio inválido");
            return {
                action: "NONE",
                message: "Áudio não capturado corretamente.",
                error: "EMPTY_AUDIO"
            };
        }

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("your_api_key")) {
            console.error("processVoiceCommandAction: OPENAI_API_KEY ausente");
            return {
                action: "NONE",
                message: "Configuração de IA incompleta (API Key).",
                error: "MISSING_KEY"
            };
        }

        console.log("processVoiceCommandAction: Transcrevendo áudio...");

        // 1. Transcrição com Whisper
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        const file = await toFile(buffer, "command.webm", { type: "audio/webm" });

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
            language: "pt",
        });

        const text = transcription.text;
        console.log("Transcrição IA:", text);

        if (!text || text.length < 2) {
            return {
                action: "NONE",
                message: "Não consegui ouvir nada claramente.",
                error: "LOW_CONFIDENCE"
            };
        }

        // 2. Extração de Intenção com GPT-4o-mini
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Você é o co-piloto do SISTEM-OTTR. Extraia comandos da fala do motorista.
As ações possíveis são:
- FINALIZE: "finaliza", "encerra". Pode incluir 'value' e 'method' (PIX, DINHEIRO, CARTAO).
- SET_VALUE: Definir o preço (ex: "vinte reais").
- PAUSE / RESUME: Pausar ou retomar tempo.
- NONE: Não entender ou irrelevante.

Sempre responda em JSON puro compatível com o esquema.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "driver_command",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            action: { type: "string", enum: ["FINALIZE", "SET_VALUE", "PAUSE", "RESUME", "NONE"] },
                            value: { type: ["number", "null"] },
                            method: { type: ["string", "null"], enum: ["PIX", "DINHEIRO", "CARTAO"] },
                            message: { type: "string" }
                        },
                        required: ["action", "value", "method", "message"],
                        additionalProperties: false
                    }
                }
            }
        });

        const result = JSON.parse(completion.choices[0].message.content || "{}") as AIActionResponse;
        return {
            ...result,
            message: result.message || `Entendido: ${text}`
        };

    } catch (error: any) {
        console.error("Erro detalhado no processamento da IA:", error);

        // Se for erro da API da OpenAI
        if (error.status === 401) return { action: "NONE", message: "Erro de autenticação (API Key inválida).", error: "AUTH_ERROR" };
        if (error.status === 429) return { action: "NONE", message: "Limite de uso da IA atingido.", error: "QUOTA_EXCEEDED" };

        return {
            action: "NONE",
            message: "Falha na conexão com a IA.",
            error: error.message || "UNKNOWN_ERROR"
        };
    }
}
