import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/index";
import QueryProvider from "@/components/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aero",
  description: "Aero is a minimalist, modern engineering management platform that streamlines team workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
          <SidebarProvider>
            <SidebarLayout />
             <QueryProvider>
                <main className="flex-1 px-8 py-6 lg:px-8">
                  {children}
                </main>
              </QueryProvider>
          </SidebarProvider>
          
      </body>
    </html>
  );
}
