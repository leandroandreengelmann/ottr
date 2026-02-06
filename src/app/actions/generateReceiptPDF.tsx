"use server";

import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from "@react-pdf/renderer";

// Definir estilos
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
        borderBottom: "2 solid #EF6820",
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#EF6820",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 10,
        color: "#697586",
    },
    section: {
        marginBottom: 15,
        padding: 12,
        backgroundColor: "#F8FAFC",
        borderRadius: 4,
        border: "1 solid #E3E8EF",
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#364152",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontSize: 9,
        color: "#697586",
        width: "35%",
    },
    value: {
        fontSize: 10,
        color: "#121926",
        fontWeight: "bold",
        width: "65%",
    },
    totalSection: {
        marginTop: 10,
        marginBottom: 20,
        padding: 20,
        backgroundColor: "#FEFAF5",
        borderRadius: 8,
        border: "2 solid #EF6820",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 10,
        color: "#697586",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    totalValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#EF6820",
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 9,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    statusPago: {
        backgroundColor: "#ECFDF3",
        color: "#17B26A",
    },
    statusPendente: {
        backgroundColor: "#FFFAEB",
        color: "#F79009",
    },
    footer: {
        marginTop: 30,
        paddingTop: 15,
        borderTop: "1 solid #E3E8EF",
        alignItems: "center",
    },
    footerText: {
        fontSize: 8,
        color: "#9AA4B2",
    },
});

// Tipos
export interface ReceiptData {
    rideId?: string;
    driver: {
        nome: string;
        cpf: string;
    };
    passenger?: {
        name?: string;
        cpf?: string;
        phone?: string;
    };
    race: {
        distance: number; // metros
        duration: number; // segundos
        endTime: number | null; // timestamp
    };
    payment: {
        method: string;
        status: "PAGO" | "PENDENTE";
        value: number;
    };
}

// Componente do PDF
const ReceiptDocument = ({ data }: { data: ReceiptData }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatDate = (timestamp: number | null) => {
        if (!timestamp) return new Date().toLocaleString("pt-BR");
        return new Date(timestamp).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const paymentMethodLabel: Record<string, string> = {
        PIX: "PIX",
        DINHEIRO: "Dinheiro",
        CREDITO: "Cartão Crédito",
        DEBITO: "Cartão Débito",
        CARTAO: "Cartão",
        OUTRO: "Outros",
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>COMPROVANTE DE CORRIDA</Text>
                    <Text style={styles.headerSubtitle}>SISTEM-OTTR</Text>
                    {data.rideId && (
                        <Text style={styles.headerSubtitle}>ID: #{data.rideId}</Text>
                    )}
                    <Text style={styles.headerSubtitle}>
                        Data: {formatDate(data.race.endTime)}
                    </Text>
                </View>

                {/* Valor Total */}
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Valor Total</Text>
                    <Text style={styles.totalValue}>
                        R$ {data.payment.value.toFixed(2).replace(".", ",")}
                    </Text>
                    <View
                        style={[
                            styles.statusBadge,
                            data.payment.status === "PAGO"
                                ? styles.statusPago
                                : styles.statusPendente,
                        ]}
                    >
                        <Text>
                            {data.payment.status === "PAGO"
                                ? "✓ Pago"
                                : "⏳ Pendente (Fiado)"}
                        </Text>
                    </View>
                </View>

                {/* Motorista */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Motorista</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.value}>{data.driver.nome}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>CPF:</Text>
                        <Text style={styles.value}>{data.driver.cpf}</Text>
                    </View>
                </View>

                {/* Passageiro (se houver) */}
                {data.passenger && (data.passenger.name || data.passenger.cpf) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Passageiro</Text>
                        {data.passenger.name && (
                            <View style={styles.row}>
                                <Text style={styles.label}>Nome:</Text>
                                <Text style={styles.value}>{data.passenger.name}</Text>
                            </View>
                        )}
                        {data.passenger.cpf && (
                            <View style={styles.row}>
                                <Text style={styles.label}>CPF:</Text>
                                <Text style={styles.value}>{data.passenger.cpf}</Text>
                            </View>
                        )}
                        {data.passenger.phone && (
                            <View style={styles.row}>
                                <Text style={styles.label}>Telefone:</Text>
                                <Text style={styles.value}>{data.passenger.phone}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Detalhes da Corrida */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalhes da Corrida</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Distância:</Text>
                        <Text style={styles.value}>
                            {(data.race.distance / 1000).toFixed(2)} km
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duração:</Text>
                        <Text style={styles.value}>{formatTime(data.race.duration)}</Text>
                    </View>
                </View>

                {/* Pagamento */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagamento</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Método:</Text>
                        <Text style={styles.value}>
                            {paymentMethodLabel[data.payment.method] || data.payment.method}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.value}>
                            {data.payment.status === "PAGO" ? "Pago" : "Pendente"}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Documento gerado automaticamente por SISTEM-OTTR
                    </Text>
                    <Text style={styles.footerText}>
                        Este comprovante é válido para fins de registro e controle
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

// Server Action
export async function generateReceiptPDF(data: ReceiptData) {
    try {
        // Gera o PDF
        const blob = await pdf(<ReceiptDocument data={data} />).toBlob();

        // Converte Blob para ArrayBuffer e depois para base64
        const arrayBuffer = await blob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return {
            success: true,
            pdf: base64,
            fileName: `comprovante-corrida-${data.rideId || Date.now()}.pdf`,
        };
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro desconhecido",
        };
    }
}
