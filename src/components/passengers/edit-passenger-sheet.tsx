'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Edit, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { savePassengerAction, PassengerData } from '@/app/actions/crm';

interface EditPassengerSheetProps {
    initialData: PassengerData;
}

export function EditPassengerSheet({ initialData }: EditPassengerSheetProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<PassengerData>(initialData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await savePassengerAction(formData);
            if (result.success) {
                toast.success('Passageiro atualizado com sucesso!');
                setOpen(false);
            } else {
                toast.error(result.error || 'Erro ao salvar');
            }
        } catch (error) {
            toast.error('Erro inesperado ao salvar');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary font-bold">
                    <Edit className="size-3.5" />
                    Editar
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-2xl font-black text-gray-900">Editar Cliente</SheetTitle>
                    <SheetDescription>
                        Complete o cadastro para ter um CRM organizado.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nome" className="text-xs font-black uppercase text-gray-500">Nome Completo</Label>
                        <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                            className="bg-gray-50 border-gray-200 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="telefone" className="text-xs font-black uppercase text-gray-500">Telefone</Label>
                            <Input
                                id="telefone"
                                value={formData.telefone}
                                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                className="bg-gray-50 border-gray-200 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf" className="text-xs font-black uppercase text-gray-500">CPF (Opcional)</Label>
                            <Input
                                id="cpf"
                                placeholder="000.000.000-00"
                                value={formData.cpf || ''}
                                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                                className="bg-gray-50 border-gray-200 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black uppercase text-gray-500">Email (Opcional)</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="anotacoes" className="text-xs font-black uppercase text-gray-500">Anotações Privadas</Label>
                        <Textarea
                            id="anotacoes"
                            placeholder="Ex: Gosta do ar condicionado no máximo..."
                            value={formData.anotacoes || ''}
                            onChange={(e) => setFormData({ ...formData, anotacoes: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all min-h-[100px]"
                        />
                    </div>

                    <SheetFooter className="mt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black rounded-xl shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Salvar Alterações
                                </>
                            )}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
