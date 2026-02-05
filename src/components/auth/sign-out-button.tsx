'use client'

import { useState } from 'react'
import { signOutAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SignOutButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    className?: string
    showIcon?: boolean
    label?: string
}

export function SignOutButton({
    variant = 'ghost',
    className,
    showIcon = true,
    label = 'Sair'
}: SignOutButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSignOut() {
        setIsLoading(true)
        await signOutAction()
    }

    return (
        <Button
            variant={variant}
            className={cn("gap-2 w-full justify-start", className)}
            onClick={handleSignOut}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                showIcon && <LogOut className="h-4 w-4" />
            )}
            <span>{label}</span>
        </Button>
    )
}
