'use client'

import { useState } from 'react'
import { signInAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const result = await signInAction(formData)

        if (result?.error) {
            setError(result.error)
            toast.error(result.error)
            setIsLoading(false)
        } else {
            toast.success('Login realizado com sucesso!')
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-gray-200">
            <CardHeader className="space-y-1 p-6 pb-2">
                <CardTitle className="text-2xl font-black text-center text-primary">Login OTTR</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Entre com seu e-mail e senha para acessar o painel.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 p-6 pt-2">
                    {error && (
                        <Alert variant="destructive" className="bg-destructive/5 text-destructive border-destructive/20 mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
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
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Senha</Label>
                        </div>
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
                                Entrando...
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Não tem uma conta?{' '}
                        <Link href="/criar-conta" className="text-primary hover:underline font-semibold">
                            Criar conta
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
