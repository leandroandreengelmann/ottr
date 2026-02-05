import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SISTEM-OTTR",
  description: "Sistema SaaS multi-tenant para motoristas e gestão de frotas.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OTTR",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#EF6820",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900`}
      >
        <OfflineBanner />
        {children}
        <InstallPrompt />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
