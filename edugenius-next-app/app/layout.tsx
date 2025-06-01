import "regenerator-runtime/runtime";
import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/context/query-provider";
import Navbar from "./(landingPage)/components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const Dictaphone = dynamic(() => import("@/components/dictaphone"), {
  ssr: false,
});

const urbanist = Urbanist({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "EduGenius",
  description: "EduGenius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background", open_sans.variable, urbanist.className)}
      >
        <Navbar />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <span>{/* <Dictaphone /> */}</span>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
