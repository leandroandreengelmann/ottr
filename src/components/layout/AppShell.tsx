"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    PlayCircle,
    Users,
    Wallet,
    ShieldAlert,
    ChevronDown,
    Mic,
    HelpCircle,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/components/auth/sign-out-button";

interface AppShellProps {
    children: React.ReactNode;
    activeOperation?: string;
    driverStatus?: string;
}

const navItems = [
    { label: "Início", icon: Home, href: "/home" },
    { label: "Corridas", icon: PlayCircle, href: "/corridas" },
    { label: "Passageiros", icon: Users, href: "/passageiros" },
    { label: "Financeiro", icon: Wallet, href: "/financeiro" },
    { label: "Segurança", icon: ShieldAlert, href: "/seguranca" },
];

export function AppShell({
    children,
    activeOperation = "Parceiros do Centro",
    driverStatus = "Livre"
}: AppShellProps) {
    const pathname = usePathname();

    return (
        <div className="flex h-[100dvh] flex-col bg-background font-sans text-foreground overflow-hidden">
            {/* Header - Fixed & Solid */}
            <header className="shrink-0 z-50 w-full border-b border-gray-100 bg-background shadow-sm">
                <div className="container px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <button className="flex items-center gap-1.5 text-sm font-bold text-gray-900 data-[state=open]:text-primary transition-colors focus:outline-none">
                                {activeOperation}
                                <ChevronDown className="size-4 text-muted-foreground" />
                            </button>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={cn(
                                    "size-2 rounded-full",
                                    driverStatus === "Livre" ? "bg-success" : "bg-warning"
                                )} />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    {driverStatus}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="size-9 text-muted-foreground hover:text-primary transition-colors">
                                <Mic className="size-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-9 text-muted-foreground hover:text-foreground transition-colors">
                                <HelpCircle className="size-5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-9 rounded-full border border-gray-100 bg-gray-50 text-gray-700">
                                        <User className="size-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Wallet className="mr-2 h-4 w-4" />
                                        <span>Financeiro</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <div className="p-1">
                                        <SignOutButton variant="ghost" className="h-9 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive" />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Flex Grow for Map */}
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col">
                {children}
            </main>

            {/* Bottom Navigation - Opaque & Solid */}
            <nav className="shrink-0 z-50 border-t border-gray-100 bg-background pb-safe">
                <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-200 group",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn(
                                    "size-6 transition-transform group-active:scale-95"
                                )} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={cn(
                                    "text-[10px] font-bold transition-all",
                                    isActive ? "font-black" : "font-semibold"
                                )}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
