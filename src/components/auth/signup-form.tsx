'use client'

import { useState } from 'react'
import { signUpAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const result = await signUpAction(formData)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        } else if (result?.success) {
            setIsSuccess(true)
            toast.success('Conta criada com sucesso!')
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-md mx-auto border-gray-200">
                <CardHeader className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-success/10 p-3 rounded-full">
                            <Loader2 className="h-8 w-8 text-success animate-bounce" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-black text-primary">Conta Criada!</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                        Seu cadastro de motorista foi realizado com sucesso.
                        Agora você pode entrar no sistema.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold">
                        <Link href="/login">Ir para o Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto border-gray-200">
            <CardHeader className="space-y-1 p-6 pb-2">
                <CardTitle className="text-2xl font-black text-center text-primary">Criar Conta OTTR</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Preencha os dados abaixo para se cadastrar como motorista.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 p-6 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input
                            id="nome"
                            name="nome"
                            placeholder="Seu nome"
                            required
                            disabled={isLoading}
                            className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                name="cpf"
                                placeholder="000.000.000-00"
                                required
                                disabled={isLoading}
                                className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                required
                                disabled={isLoading}
                                className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="exemplo@email.com"
                            required
                            disabled={isLoading}
                            className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="modeloVeiculo">Modelo do Veículo</Label>
                            <Input
                                id="modeloVeiculo"
                                name="modeloVeiculo"
                                placeholder="Ex: Toyota Corolla"
                                required
                                disabled={isLoading}
                                className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="placaVeiculo">Placa</Label>
                            <Input
                                id="placaVeiculo"
                                name="placaVeiculo"
                                placeholder="AAA-0000"
                                required
                                disabled={isLoading}
                                className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                            className="border-gray-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col p-6 pt-0">
                    <Button
                        type="submit"
                        className="w-full h-12 mt-6 bg-primary hover:bg-primary-hover text-white font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Criando conta...
                            </>
                        ) : (
                            'Criar minha conta'
                        )}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-primary hover:underline font-semibold">
                            Fazer login
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
