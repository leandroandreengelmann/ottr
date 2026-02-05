"use client";

import * as React from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    Line,
    LineChart,
    ResponsiveContainer
} from "recharts";
import {
    AlertCircle,
    ArrowRight,
    Bell,
    Check,
    ChevronDown,
    ChevronRight,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    Menu,
    MessageSquare,
    Plus,
    PlusCircle,
    Search,
    Settings,
    User,
    UserPlus,
    Users,
    Layout,
    Type,
    MousePointer2,
    List,
    FormInput,
    Eye,
    Box,
    Monitor,
    CalendarDays,
    MoreHorizontal,
    Trash2,
    CheckCircle2,
    Loader2,
    Info
} from "lucide-react";
import { toast } from "sonner";

// --- Custom Components ---

const Typography = () => (
    <div className="space-y-6">
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                H1: O Laranja é a Cor Dominante
            </h1>
            <p className="text-muted-foreground">scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl</p>
        </div>
        <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                H2: Estrutura Gray Modern
            </h2>
            <p className="text-muted-foreground">scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight</p>
        </div>
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                H3: Tipografia Integrada Inter
            </h3>
            <p className="text-muted-foreground">scroll-m-20 text-2xl font-semibold tracking-tight</p>
        </div>
        <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                H4: Detalhes e Micro-iterações
            </h4>
            <p className="text-muted-foreground">scroll-m-20 text-xl font-semibold tracking-tight</p>
        </div>
        <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Este é um parágrafo padrão. A paleta de cores neutras Gray Modern garante
                excelente legibilidade em qualquer dispositivo, enquanto o <span className="text-primary font-bold">Orange 500</span>
                conduz a atenção do usuário para os principais pontos de ação.
            </p>
        </div>
        <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
            "Design não é apenas o que parece e o que se sente. Design é como funciona." - Steve Jobs
        </blockquote>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Primeiro item da lista com foco no usuário</li>
            <li>Segundo item destacando a performance</li>
            <li>Terceiro item sobre acessibilidade</li>
        </ul>
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            --color-primary: #EF6820;
        </code>
    </div>
);

const Spinner = () => (
    <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm font-medium">Carregando...</span>
    </div>
);

const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{children}</span>
    </kbd>
);

const ButtonGroup = () => (
    <div className="flex items-center">
        <Button className="rounded-r-none border-r border-primary-hover">Esquerda</Button>
        <Button className="rounded-none border-r border-primary-hover">Centro</Button>
        <Button className="rounded-l-none">Direita</Button>
    </div>
);

const InputGroup = () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Buscar no sistema..." className="pl-9 rounded-r-none border-r-0" />
        </div>
        <Button type="submit" className="rounded-l-none">Pesquisar</Button>
    </div>
);

// --- Charts Data ---
const chartData = [
    { month: "Jan", sales: 186, mobile: 80 },
    { month: "Fev", sales: 305, mobile: 200 },
    { month: "Mar", sales: 237, mobile: 120 },
    { month: "Abr", sales: 73, mobile: 190 },
    { month: "Mai", sales: 209, mobile: 130 },
    { month: "Jun", sales: 214, mobile: 140 },
];

const chartConfig = {
    sales: {
        label: "Vendas Desktop",
        color: "hsl(var(--primary))",
    },
    mobile: {
        label: "Vendas Mobile",
        color: "hsl(var(--gray-400))",
    },
} satisfies ChartConfig;

// --- Main Component ---

export default function MassiveShowcase() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [activeSection, setActiveSection] = React.useState("introducao");

    const sections = [
        { id: "introducao", label: "Introdução", icon: Type },
        { id: "botoes", label: "Botões e Ações", icon: MousePointer2 },
        { id: "formularios", label: "Entrada de Dados", icon: FormInput },
        { id: "layout", label: "Layout", icon: Box },
        { id: "navegacao", label: "Navegação", icon: List },
        { id: "dados", label: "Dados e Gráficos", icon: Monitor },
        { id: "feedback", label: "Overlays e Feedback", icon: Bell },
    ];

    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background font-sans">

                {/* Sidebar fixa para navegação interna */}
                <Sidebar variant="sidebar" className="hidden lg:flex border-r">
                    <SidebarHeader className="h-16 flex items-center px-6 border-b">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Layout className="text-white" size={18} />
                            </div>
                            <span className="font-bold text-lg tracking-tight">Design System</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="py-4">
                        <SidebarGroup>
                            <SidebarGroupLabel className="px-6 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                                Menu de Componentes
                            </SidebarGroupLabel>
                            <SidebarMenu className="px-3 gap-1">
                                {sections.map((section) => (
                                    <SidebarMenuItem key={section.id}>
                                        <SidebarMenuButton
                                            onClick={() => scrollTo(section.id)}
                                            isActive={activeSection === section.id}
                                            className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-all ${activeSection === section.id
                                                ? "bg-primary/10 text-primary font-bold shadow-sm"
                                                : "hover:bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            <section.icon size={18} />
                                            {section.label}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t bg-muted/20 space-y-2">
                        <div className="flex items-center gap-3 px-2">
                            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                <AvatarFallback className="bg-primary text-white text-[10px]">AD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold leading-none">Admin Designer</span>
                                <span className="text-[10px] text-muted-foreground">Status: Online</span>
                            </div>
                        </div>
                        <div className="px-2">
                            <SignOutButton variant="ghost" className="h-9 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10" />
                        </div>
                    </SidebarFooter>
                </Sidebar>

                {/* Conteúdo Principal */}
                <div className="flex-1 overflow-auto">
                    <Toaster richColors position="top-right" />

                    <main className="max-w-6xl mx-auto p-12 space-y-24 pb-32">

                        {/* Header Mobile */}
                        <div className="lg:hidden flex items-center justify-between mb-12 py-4 border-b">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                    <Layout className="text-white" size={18} />
                                </div>
                                <span className="font-bold">Design System</span>
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon"><Menu /></Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-64">
                                    <div className="h-16 flex items-center px-6 border-b font-bold">Menu</div>
                                    <div className="p-4 flex flex-col gap-2">
                                        {sections.map(s => (
                                            <Button
                                                key={s.id}
                                                variant="ghost"
                                                className="justify-start gap-3"
                                                onClick={() => {
                                                    scrollTo(s.id);
                                                    // Close sheet would happen here in a real scenario
                                                }}
                                            >
                                                <s.icon size={18} /> {s.label}
                                            </Button>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* SEÇÃO 1: INTRODUÇÃO */}
                        <section id="introducao" className="space-y-8 scroll-mt-12">
                            <div className="space-y-2">
                                <Badge variant="secondary" className="px-3 py-1 font-bold text-primary bg-primary/10 border-primary/20">
                                    v2.0 Beta
                                </Badge>
                                <h1 className="text-5xl font-black tracking-tighter sm:text-6xl">
                                    Showcase <span className="text-primary italic">Massivo</span>
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                                    Uma implementação completa de todos os componentes do shadcn/ui, integrados à
                                    estratégia visual do projeto. Foco em <span className="text-primary font-bold">Orange 500</span>,
                                    precisão tipográfica e experiência em português.
                                </p>
                            </div>

                            <Card className="shadow-2xl shadow-primary/5 border-primary/10">
                                <CardHeader>
                                    <CardTitle>Tipografia e Hierarquia</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Typography />
                                </CardContent>
                            </Card>
                        </section>

                        {/* SEÇÃO 2: BOTÕES E AÇÕES */}
                        <section id="botoes" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2 mb-2">
                                <MousePointer2 className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Botões e Ações</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader><CardTitle>Variantes Base</CardTitle></CardHeader>
                                    <CardContent className="flex flex-wrap gap-4">
                                        <Button>Primário</Button>
                                        <Button variant="secondary">Secundário</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Fantasma</Button>
                                        <Button variant="link" className="text-primary">Link</Button>
                                        <Button variant="destructive">Destrutivo</Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Estados Específicos</CardTitle></CardHeader>
                                    <CardContent className="flex flex-wrap gap-4">
                                        <Button disabled>Desabilitado</Button>
                                        <Button className="gap-2"><Plus size={16} /> Com Ícone</Button>
                                        <Button size="icon"><Settings size={18} /></Button>
                                        <Button size="sm">Tamanho P</Button>
                                        <Button size="lg">Tamanho G</Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Grupos e Seleção</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase">Button Group</Label>
                                            <ButtonGroup />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase">Toggle Group (Múltiplo)</Label>
                                            <ToggleGroup type="multiple" defaultValue={["bold"]} className="justify-start">
                                                <ToggleGroupItem value="bold" aria-label="Negrito"><Type size={16} /></ToggleGroupItem>
                                                <ToggleGroupItem value="italic" aria-label="Itálico" className="italic font-serif">I</ToggleGroupItem>
                                                <ToggleGroupItem value="underline" aria-label="Sublinhado" className="underline">S</ToggleGroupItem>
                                            </ToggleGroup>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Utilitários</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center gap-8">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase">Loader</Label>
                                                <Spinner />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase">Tealhado (Kbd)</Label>
                                                <div className="flex gap-2">
                                                    <Kbd>⌘</Kbd><Kbd>K</Kbd>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="flex gap-4">
                                            <Toggle aria-label="Favoritar" className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary">
                                                <Check size={16} className="mr-2" /> Seguir
                                            </Toggle>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* SEÇÃO 3: FORMULÁRIOS */}
                        <section id="formularios" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2">
                                <FormInput className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Entrada de Dados</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="lg:col-span-2">
                                    <CardHeader><CardTitle>Campos de Texto e Grupos</CardTitle></CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Input Padrão</Label>
                                                <Input placeholder="Digite algo..." />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Input com Busca (Group)</Label>
                                                <InputGroup />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Textarea</Label>
                                                <Textarea placeholder="Descreva o problema aqui..." className="min-h-[120px]" />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label>Autenticação (Input OTP)</Label>
                                                <InputOTP maxLength={6}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-2">Código enviado via SMS</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Seleção Customizada</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Escolha um Período" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="hoje">Hoje</SelectItem>
                                                        <SelectItem value="semana">Últimos 7 dias</SelectItem>
                                                        <SelectItem value="mes">Último mês</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Controles de Escolha</CardTitle></CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="space-y-4">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preferências do Sistema</Label>
                                            <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base cursor-pointer">Login Biométrico</Label>
                                                    <p className="text-xs text-muted-foreground">Segurança reforçada por digital.</p>
                                                </div>
                                                <Switch />
                                            </div>
                                            <div className="flex items-center space-x-3 p-2">
                                                <Checkbox id="marketing_2" className="w-5 h-5 border-2" />
                                                <Label htmlFor="marketing_2" className="text-sm font-medium leading-none cursor-pointer">
                                                    Inscrever no boletim informativo
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nível de Acesso</Label>
                                            <RadioGroup defaultValue="editor" className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <RadioGroupItem value="leitura" id="r1" className="peer sr-only" />
                                                    <Label htmlFor="r1" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer">
                                                        <Eye className="mb-3 h-6 w-6" />
                                                        <span>Leitura</span>
                                                    </Label>
                                                </div>
                                                <div>
                                                    <RadioGroupItem value="editor" id="r2" className="peer sr-only" />
                                                    <Label htmlFor="r2" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer">
                                                        <Settings className="mb-3 h-6 w-6" />
                                                        <span>Editor</span>
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Calendário e Datas</CardTitle></CardHeader>
                                    <CardContent className="flex flex-col items-center gap-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            className="rounded-md border shadow-sm"
                                        />
                                        <div className="w-full space-y-2">
                                            <Label>Selecione a data de vencimento</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start text-left font-normal border-2 hover:border-primary/50">
                                                        <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                                                        {date ? date.toLocaleDateString('pt-BR') : <span>Escolha uma data</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 shadow-2xl border-primary/20">
                                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* SEÇÃO 4: LAYOUT */}
                        <section id="layout" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2">
                                <Box className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Estrutura e Layout</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader><CardTitle>Conteúdo Flexível</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger className="hover:no-underline font-bold text-primary">Arquitetura de Design</AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                                    Utilizamos uma abordagem baseada em tokens CSS, permitindo
                                                    personalização rápida em escala.
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger className="hover:no-underline font-bold text-primary">Componentes Atômicos</AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                                    Cada peça da UI é testada isoladamente antes de ser integrada
                                                    à biblioteca central.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        <Collapsible className="w-full space-y-2">
                                            <div className="flex items-center justify-between space-x-4 px-4 py-2 border rounded-lg bg-orange-50/10 border-primary/10">
                                                <h4 className="text-sm font-semibold text-primary">Mais Detalhes Técnicos</h4>
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-full hover:bg-primary/10">
                                                        <ChevronDown className="h-4 w-4" />
                                                        <span className="sr-only">Toggle</span>
                                                    </Button>
                                                </CollapsibleTrigger>
                                            </div>
                                            <CollapsibleContent className="space-y-2 p-2 border border-dashed rounded-lg border-primary/20 bg-muted/20">
                                                <div className="text-xs font-mono text-muted-foreground">React 19 + Tailwind v4</div>
                                                <div className="text-xs font-mono text-muted-foreground">TypeScript Strict Mode</div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Proporção e Espaçamento</CardTitle></CardHeader>
                                    <CardContent className="space-y-6 text-center">
                                        <div className="w-[300px] mx-auto overflow-hidden rounded-xl border-4 border-primary/10 shadow-lg">
                                            <AspectRatio ratio={16 / 9} className="bg-muted">
                                                <img
                                                    src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600"
                                                    alt="Abstract Design"
                                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                                />
                                            </AspectRatio>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic">Exemplo de Ratio 16:9 com bordas estilizadas.</p>
                                        <Separator />
                                        <div className="flex h-5 items-center justify-center space-x-4 text-sm font-bold">
                                            <span>Horizontal</span>
                                            <Separator orientation="vertical" />
                                            <span className="text-primary">Vertical</span>
                                            <Separator orientation="vertical" />
                                            <span>Layout</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="lg:col-span-2">
                                    <CardHeader><CardTitle>Resizable e Scroll</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] rounded-xl border border-primary/20 overflow-hidden shadow-inner bg-muted/5">
                                            <ResizablePanelGroup direction="horizontal">
                                                <ResizablePanel defaultSize={25} minSize={20}>
                                                    <div className="flex h-full items-center justify-center p-6 bg-primary/5">
                                                        <span className="font-bold text-primary text-xs uppercase tracking-widest">Painel A</span>
                                                    </div>
                                                </ResizablePanel>
                                                <ResizableHandle withHandle />
                                                <ResizablePanel defaultSize={75}>
                                                    <ScrollArea className="h-full w-full p-6">
                                                        <div className="space-y-4">
                                                            <h4 className="text-xl font-bold border-b pb-2">Conteúdo com Scroll Profundo</h4>
                                                            {Array.from({ length: 15 }).map((_, i) => (
                                                                <p key={i} className="text-sm text-muted-foreground">
                                                                    Esta linha demonstra o funcionamento do Scroll Area personalizado dentro de um painel redimensionável.
                                                                    Ambos os componentes herdam o estilo visual Orange 500 no handle e na barra de rolagem.
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </ResizablePanel>
                                            </ResizablePanelGroup>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* SEÇÃO 5: NAVEGAÇÃO */}
                        <section id="navegacao" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2">
                                <List className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Navegação e Menus</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="lg:col-span-2 overflow-visible">
                                    <CardHeader><CardTitle>Menubar e Navegação Principal</CardTitle></CardHeader>
                                    <CardContent className="space-y-8 overflow-visible">
                                        <NavigationMenu className="max-w-full">
                                            <NavigationMenuList className="gap-2">
                                                <NavigationMenuItem>
                                                    <NavigationMenuTrigger className="bg-primary/5 text-primary border border-primary/10 font-bold hover:bg-primary/20 px-6">Documentação</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                                                            <li className="row-span-3">
                                                                <NavigationMenuLink asChild>
                                                                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-primary to-orange-700 p-6 no-underline outline-none shadow-xl" href="/">
                                                                        <Layout className="h-8 w-8 text-white mb-2" />
                                                                        <div className="mb-2 mt-4 text-lg font-bold text-white">Guia de Estilo</div>
                                                                        <p className="text-sm leading-tight text-white/80">A base atômica do nosso ecossistema digital.</p>
                                                                    </a>
                                                                </NavigationMenuLink>
                                                            </li>
                                                            <div className="grid gap-2">
                                                                <a href="#" className="p-3 hover:bg-muted rounded-md transition-colors"><div className="font-bold text-sm">Componentes</div><div className="text-xs text-muted-foreground">Catálogo técnico completo.</div></a>
                                                                <a href="#" className="p-3 hover:bg-muted rounded-md transition-colors"><div className="font-bold text-sm">Instalação</div><div className="text-xs text-muted-foreground">Configurando o ambiente de dev.</div></a>
                                                            </div>
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                                <NavigationMenuItem>
                                                    <a href="#" className={navigationMenuTriggerStyle()}>Novidades</a>
                                                </NavigationMenuItem>
                                                <NavigationMenuItem>
                                                    <a href="#" className={navigationMenuTriggerStyle()}>Suporte</a>
                                                </NavigationMenuItem>
                                            </NavigationMenuList>
                                        </NavigationMenu>

                                        <Menubar className="w-fit border-2 border-primary/10 shadow-lg">
                                            <MenubarMenu>
                                                <MenubarTrigger className="font-bold focus:bg-primary/10 focus:text-primary">Arquivo</MenubarTrigger>
                                                <MenubarContent className="border-primary/20 shadow-xl">
                                                    <MenubarItem className="gap-2">Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                                                    <MenubarItem>Abrir...</MenubarItem>
                                                    <MenubarSeparator />
                                                    <MenubarSub>
                                                        <MenubarSubTrigger>Compartilhar</MenubarSubTrigger>
                                                        <MenubarSubContent className="border-primary/20">
                                                            <MenubarItem>Email</MenubarItem>
                                                            <MenubarItem>Telegram</MenubarItem>
                                                        </MenubarSubContent>
                                                    </MenubarSub>
                                                    <MenubarSeparator />
                                                    <MenubarItem className="text-destructive focus:bg-destructive/5 focus:text-destructive">Fechar Sistema</MenubarItem>
                                                </MenubarContent>
                                            </MenubarMenu>
                                            <MenubarMenu>
                                                <MenubarTrigger className="font-bold focus:bg-primary/10 focus:text-primary">Editar</MenubarTrigger>
                                            </MenubarMenu>
                                        </Menubar>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Hierarquia e Contexto</CardTitle></CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Breadcrumb (Navegação Pura)</Label>
                                            <Breadcrumb className="bg-muted/30 p-2 rounded-lg border border-dashed border-gray-300">
                                                <BreadcrumbList>
                                                    <BreadcrumbItem><BreadcrumbLink href="/" className="hover:text-primary">Painel</BreadcrumbLink></BreadcrumbItem>
                                                    <BreadcrumbSeparator><ChevronRight size={14} /></BreadcrumbSeparator>
                                                    <BreadcrumbItem><BreadcrumbLink href="#" className="hover:text-primary">Configurações</BreadcrumbLink></BreadcrumbItem>
                                                    <BreadcrumbSeparator><ChevronRight size={14} /></BreadcrumbSeparator>
                                                    <BreadcrumbItem><BreadcrumbPage className="font-extrabold text-primary">Segurança</BreadcrumbPage></BreadcrumbItem>
                                                </BreadcrumbList>
                                            </Breadcrumb>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Menu Contextual (Botão Direito)</Label>
                                            <ContextMenu>
                                                <ContextMenuTrigger className="flex h-[120px] w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 text-sm font-bold text-primary hover:bg-primary/10 transition-colors cursor-context-menu">
                                                    Clique aqui com o botão direito
                                                </ContextMenuTrigger>
                                                <ContextMenuContent className="w-64 border-primary/20 shadow-2xl">
                                                    <ContextMenuLabel className="text-primary font-bold">Ações Rápidas</ContextMenuLabel>
                                                    <ContextMenuSeparator />
                                                    <ContextMenuItem className="gap-2"><PlusCircle size={16} /> Novo Projeto</ContextMenuItem>
                                                    <ContextMenuItem className="gap-2"><Settings size={16} /> Configurações</ContextMenuItem>
                                                    <ContextMenuSeparator />
                                                    <ContextMenuCheckboxItem checked>Mostrar Sidebar</ContextMenuCheckboxItem>
                                                    <ContextMenuSeparator />
                                                    <ContextMenuRadioGroup defaultValue="admin">
                                                        <ContextMenuLabel inset>Tipo de Usuário</ContextMenuLabel>
                                                        <ContextMenuRadioItem value="admin">Administrador</ContextMenuRadioItem>
                                                        <ContextMenuRadioItem value="editor">Editor</ContextMenuRadioItem>
                                                    </ContextMenuRadioGroup>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Listagem e Paginação</CardTitle></CardHeader>
                                    <CardContent className="space-y-12 h-full flex flex-col justify-between">
                                        <div className="flex justify-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="border-2 border-primary/20 shadow-lg gap-3 px-8 h-12">
                                                        Opções Administrativas <ChevronDown size={18} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="center">
                                                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Perfil</DropdownMenuItem>
                                                        <DropdownMenuItem><Search className="mr-2 h-4 w-4" /> Buscar</DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive font-bold"><LogOut className="mr-2 h-4 w-4" /> Sair do Sistema</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <Pagination>
                                            <PaginationContent className="bg-muted/50 p-1 rounded-full border">
                                                <PaginationItem><PaginationPrevious href="#" className="hover:bg-primary/10" /></PaginationItem>
                                                <PaginationItem><PaginationLink href="#" isActive className="bg-primary text-white hover:bg-primary hover:text-white border-0 font-bold">1</PaginationLink></PaginationItem>
                                                <PaginationItem><PaginationLink href="#" className="hover:bg-primary/10">2</PaginationLink></PaginationItem>
                                                <PaginationItem><PaginationEllipsis /></PaginationItem>
                                                <PaginationItem><PaginationNext href="#" className="hover:bg-primary/10" /></PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* SEÇÃO 6: DADOS E GRÁFICOS */}
                        <section id="dados" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2">
                                <Monitor className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Análise de Dados e Visuais</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="lg:col-span-1">
                                    <CardHeader>
                                        <CardTitle>Vendas Mensais</CardTitle>
                                        <CardDescription>Performance acumulada do trimestre.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                                            <BarChart data={chartData}>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Bar dataKey="sales" fill="var(--orange-500)" radius={4} fillOpacity={0.9} />
                                                <Bar dataKey="mobile" fill="var(--gray-300)" radius={4} />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                    <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-4">
                                        <div className="flex gap-2 font-bold leading-none text-primary"> Crescimento de 5.2% este mês <ArrowRight size={14} /> </div>
                                        <div className="leading-none text-muted-foreground"> Exibindo dados de Janeiro a Junho 2024 </div>
                                    </CardFooter>
                                </Card>

                                <Card className="lg:col-span-1">
                                    <CardHeader><CardTitle>Catálogo de Ativos</CardTitle></CardHeader>
                                    <CardContent>
                                        <Carousel className="w-full max-w-xs mx-auto">
                                            <CarouselContent>
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <CarouselItem key={index}>
                                                        <div className="p-1">
                                                            <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 animate-pulse-slow">
                                                                <span className="text-4xl font-black text-primary">{index + 1}</span>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="border-primary/20 text-primary hover:bg-primary/10" />
                                            <CarouselNext className="border-primary/20 text-primary hover:bg-primary/10" />
                                        </Carousel>
                                        <p className="text-center text-xs text-muted-foreground mt-8 uppercase tracking-widest font-bold">Slider de Produtos em Destaque</p>
                                    </CardContent>
                                </Card>

                                <Card className="lg:col-span-2">
                                    <CardHeader><CardTitle>Tabelas de Registro</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableCaption>Listagem dos últimos usuários ativos.</TableCaption>
                                            <TableHeader className="bg-muted/50">
                                                <TableRow className="hover:bg-transparent border-primary/10">
                                                    <TableHead className="w-[100px] text-primary font-bold">ID</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Setor</TableHead>
                                                    <TableHead className="text-right">Acesso</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-primary/5 hover:bg-primary/5 transition-colors">
                                                    <TableCell className="font-bold">#DS-01</TableCell>
                                                    <TableCell><Badge className="bg-success text-white">Ativo</Badge></TableCell>
                                                    <TableCell>Design</TableCell>
                                                    <TableCell className="text-right">Admin</TableCell>
                                                </TableRow>
                                                <TableRow className="border-primary/5 hover:bg-primary/5 transition-colors">
                                                    <TableCell className="font-bold">#DS-02</TableCell>
                                                    <TableCell><Badge variant="outline">Aguardando</Badge></TableCell>
                                                    <TableCell>Marketing</TableCell>
                                                    <TableCell className="text-right">Editor</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* SEÇÃO 7: FEEDBACK E OVERLAYS */}
                        <section id="feedback" className="space-y-8 scroll-mt-12">
                            <div className="flex items-center gap-2">
                                <Bell className="text-primary" />
                                <h2 className="text-3xl font-bold tracking-tight">Overlays e Feedback Global</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader><CardTitle>Alertas e Toasts</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <Alert className="border-l-4 border-l-primary bg-primary/5">
                                            <AlertCircle className="h-4 w-4 text-primary" />
                                            <AlertTitle className="font-bold text-primary">Alteração de Tema</AlertTitle>
                                            <AlertDescription>
                                                O Design System Orange 500 agora é o padrão global para todos os projetos da OTTR.
                                            </AlertDescription>
                                        </Alert>

                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle className="font-bold">Aviso Crítico</AlertTitle>
                                            <AlertDescription>Sua sessão expira em 5 minutos devido à inatividade.</AlertDescription>
                                        </Alert>

                                        <Button className="w-full bg-success text-white h-12 hover:bg-success/90 shadow-lg shadow-success/20"
                                            onClick={() => toast.success("Processamento concluído!", { description: "Todos os arquivos foram sincronizados.", closeButton: true })}>
                                            Disparar Sucesso (Toast)
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle>Informação Contextual</CardTitle></CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-8 py-8">
                                        <div className="flex flex-col items-center gap-2">
                                            <Label className="text-[10px] font-bold uppercase mb-2">Hover Card</Label>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant="link" className="text-primary font-bold underline decoration-2 underline-offset-4">@design_team</Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-80 border-primary/20 shadow-2xl">
                                                    <div className="flex justify-between space-x-4">
                                                        <Avatar><AvatarFallback className="bg-primary text-white">DT</AvatarFallback></Avatar>
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Time de Design OTTR</h4>
                                                            <p className="text-xs text-muted-foreground leading-relaxed">Cuidando da excelência visual e funcional de todos os nossos produtos digitais.</p>
                                                            <div className="flex items-center pt-2">
                                                                <CalendarDays className="mr-2 h-3 w-3 opacity-70" />
                                                                <span className="text-[10px] text-muted-foreground">Ativo desde 2024</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>

                                        <div className="flex flex-col items-center gap-2">
                                            <Label className="text-[10px] font-bold uppercase mb-2">Tooltip Padrão</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse">
                                                            <Info size={24} />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-primary text-white border-primary">
                                                        <p>Este é um Tooltip semântico</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="lg:col-span-2">
                                    <CardHeader><CardTitle>Diálogos e Gavetas (Modais)</CardTitle></CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Dialog>
                                            <DialogTrigger asChild><Button className="h-16 shadow-xl border-l-4 border-primary">Diálogo Principal</Button></DialogTrigger>
                                            <DialogContent className="border-primary/20">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-black italic">Configuração do Sistema</DialogTitle>
                                                    <DialogDescription>Ajuste as permissões e cores do ambiente de produção.</DialogDescription>
                                                </DialogHeader>
                                                <div className="py-6 space-y-4">
                                                    <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
                                                        <Monitor className="text-primary" />
                                                        <div className="flex-1 text-sm font-bold">Sincronização com Cloud Ativada</div>
                                                        <Switch defaultChecked />
                                                    </div>
                                                </div>
                                                <DialogFooter className="gap-2">
                                                    <Button variant="secondary" className="font-bold">Cancelar</Button>
                                                    <Button className="font-black">Salvar Alterações</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Drawer>
                                            <DrawerTrigger asChild><Button variant="outline" className="h-16 border-2 border-primary/20 font-bold hover:bg-primary/5">Abrir Drawer (GAVETA)</Button></DrawerTrigger>
                                            <DrawerContent className="border-primary/20">
                                                <div className="mx-auto w-full max-w-sm">
                                                    <DrawerHeader>
                                                        <DrawerTitle className="text-center text-primary font-black">Performance Global</DrawerTitle>
                                                        <DrawerDescription className="text-center">Métricas em tempo real da infraestrutura.</DrawerDescription>
                                                    </DrawerHeader>
                                                    <div className="p-4 space-y-8">
                                                        <div className="flex justify-center"><Progress value={85} className="h-4 w-full rounded-full" /></div>
                                                        <div className="text-center font-bold text-lg">Uso de Recursos: <span className="text-primary">85%</span></div>
                                                    </div>
                                                    <DrawerFooter>
                                                        <Button className="font-bold">Gerar Relatório</Button>
                                                        <DrawerClose asChild><Button variant="ghost">Minimizar</Button></DrawerClose>
                                                    </DrawerFooter>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" className="h-16 shadow-lg shadow-destructive/20 gap-3 font-bold">Ação Perigosa <Trash2 size={18} /></Button></AlertDialogTrigger>
                                            <AlertDialogContent className="border-destructive/20 shadow-2xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-destructive font-black">Cuidado: Irreversível!</AlertDialogTitle>
                                                    <AlertDialogDescription>Excluir a conta deletará todos os seus 234 arquivos associados. Tem certeza?</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="font-bold">Não, Voltar</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white font-black">Sim, Excluir Tudo</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                    </main>

                    {/* Rodapé Global do Showcase */}
                    <footer className="bg-muted/10 border-t py-16">
                        <div className="max-w-6xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                        <Layout className="text-white" size={16} />
                                    </div>
                                    <span className="font-black tracking-tight text-lg">DesignerSystem</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">O framework visual oficial da OTTR para aplicações de alta performance e experiência premium.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold uppercase text-xs tracking-widest mb-2">Recursos</h5>
                                <a href="#" className="hover:text-primary transition-colors">Guia de Cores</a>
                                <a href="#" className="hover:text-primary transition-colors">Componentes Shadcn</a>
                                <a href="#" className="hover:text-primary transition-colors">Ícones Lucide</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold uppercase text-xs tracking-widest mb-2">Comunidade</h5>
                                <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><Github size={16} /> GitHub</a>
                                <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors"><Cloud size={16} /> Deploy</a>
                            </div>
                        </div>
                        <div className="max-w-6xl mx-auto px-12 pt-12 mt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6">
                            <span className="text-xs text-muted-foreground font-medium">© 2024 OTTR Design Labs. Todos os direitos reservados.</span>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-2 font-bold text-xs"><Bell size={14} /> Notificações</Button>
                                <Separator orientation="vertical" className="h-4" />
                                <Button variant="ghost" size="sm" className="gap-2 font-bold text-xs text-primary"><Settings size={14} /> Ajustes</Button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </SidebarProvider>
    );
}
