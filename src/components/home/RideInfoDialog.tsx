'use client'

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRaceStore } from "@/store/useRaceStore";
import { ClipboardList, Save, User, DollarSign, Phone, Fingerprint } from "lucide-react";
import { PassengerAutocomplete } from "./PassengerAutocomplete";

interface RideInfoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RideInfoDialog({ open, onOpenChange }: RideInfoDialogProps) {
    const {
        passengerName, setPassengerName,
        passengerCPF, setPassengerCPF,
        passengerPhone, setPassengerPhone,
        currentValue, setRaceValue
    } = useRaceStore();
    const [name, setName] = useState(passengerName);
    const [cpf, setCpf] = useState(passengerCPF);
    const [phone, setPhone] = useState(passengerPhone);
    const [value, setValue] = useState<string>(currentValue ? currentValue.toString() : "");

    // Sync local state with store when dialog opens
    useEffect(() => {
        if (open) {
            setName(passengerName);
            setCpf(passengerCPF);
            setPhone(passengerPhone);
            setValue(currentValue ? currentValue.toString() : "");
        }
    }, [open, passengerName, passengerCPF, passengerPhone, currentValue]);

    const handleSave = () => {
        setPassengerName(name);
        setPassengerCPF(cpf);
        setPassengerPhone(phone);
        setRaceValue(value === "" ? 0 : Number(value));
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-2xl border-none p-6 gap-6">
                <DialogHeader>
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 self-center">
                        <ClipboardList className="size-6" />
                    </div>
                    <DialogTitle className="text-xl font-bold text-center">Detalhes da Corrida</DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground">
                        Ajuste o nome do passageiro e o valor acordado para esta viagem.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Passenger Name */}
                    <div className="space-y-2">
                        <label htmlFor="passenger-name" className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <User className="size-3" /> Nome do Cliente
                        </label>
                        <PassengerAutocomplete
                            value={name}
                            onChange={setName}
                            onSelect={(p) => {
                                if (p.cpf) setCpf(p.cpf);
                                if (p.telefone) setPhone(p.telefone);
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* CPF */}
                        <div className="space-y-2">
                            <label htmlFor="passenger-cpf" className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <Fingerprint className="size-3" /> CPF
                            </label>
                            <Input
                                id="passenger-cpf"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="h-12 rounded-xl border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary font-bold"
                                autoComplete="off"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label htmlFor="passenger-phone" className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <Phone className="size-3" /> Telefone
                            </label>
                            <Input
                                id="passenger-phone"
                                placeholder="(00) 00000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-12 rounded-xl border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary font-bold"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    {/* Ride Value */}
                    <div className="space-y-2">
                        <label htmlFor="ride-value" className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            <DollarSign className="size-3" /> Valor Acordado (R$)
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">R$</div>
                            <Input
                                id="ride-value"
                                type="number"
                                placeholder="0,00"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="h-12 rounded-xl border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary pl-10 font-bold"
                                autoComplete="off"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Deixe vazio ou zero se o valor for automático.</p>
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base uppercase tracking-wide shadow-lg shadow-primary/20"
                        onClick={handleSave}
                    >
                        <Save className="size-5 mr-2" />
                        Salvar Informações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
