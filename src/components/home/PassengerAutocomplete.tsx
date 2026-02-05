'use client';

import * as React from "react";
import { Check, User, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { searchPassengersAction } from "@/app/actions/crm";

// Simple debounce hook implementation if not available
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

interface PassengerAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (passenger: any) => void;
}

export function PassengerAutocomplete({ value, onChange, onSelect }: PassengerAutocompleteProps) {
    const [open, setOpen] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const debouncedSearch = useDebounceValue(value, 300);

    // Fetch suggestions when value changes (debounced)
    React.useEffect(() => {
        async function fetchSuggestions() {
            if (debouncedSearch.length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const results = await searchPassengersAction(debouncedSearch);
                setSuggestions(results);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSuggestions();
    }, [debouncedSearch]);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    {/* We use a standard Input for the trigger to allow free typing
                         but we control the popover state manually */}
                    <Input
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        placeholder="Ex: João Silva"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary font-bold pr-10"
                        autoComplete="off"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {loading ? (
                            <Loader2 className="size-4 animate-spin text-primary" />
                        ) : (
                            <Search className="size-4 text-gray-400" />
                        )}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 w-[var(--radix-popover-trigger-width)]"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command>
                    {/* Hidden input to satisfy Command structure if needed, or just list directly */}
                    <CommandList>
                        {suggestions.length > 0 ? (
                            <CommandGroup heading="Clientes Encontrados">
                                {suggestions.map((p) => (
                                    <CommandItem
                                        key={p.id}
                                        value={p.nome + p.id} // Unique value for command
                                        onSelect={() => {
                                            onChange(p.nome);
                                            onSelect(p);
                                            setOpen(false);
                                        }}
                                        className="gap-2 cursor-pointer"
                                    >
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {p.nome.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{p.nome}</span>
                                            {p.telefone && <span className="text-xs text-gray-500">{p.telefone}</span>}
                                        </div>
                                        {p.anotacoes && (
                                            <div className="ml-auto flex items-center">
                                                <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                                                    VIP
                                                </span>
                                            </div>
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : (
                            // Only show "Empty" if user has typed something significant and no results
                            debouncedSearch.length >= 2 && !loading && (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    <p>Nenhum cliente encontrado.</p>
                                    <p className="text-xs mt-1">
                                        Continue digitando para <span className="font-bold text-primary">criar um novo</span>.
                                    </p>
                                </div>
                            )
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
