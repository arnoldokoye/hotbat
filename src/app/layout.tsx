import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopNav } from "@/components/layout/TopNav";
import { PageContainer } from "@/components/ui/PageContainer";
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
  title: "HotBat",
  description: "HotBat team HR analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <div className="flex min-h-screen flex-col">
          <TopNav />
          <div className="flex flex-1 flex-col md:flex-row">
            <SidebarNav />
            <main className="flex-1 bg-white/50 py-6 dark:bg-slate-950">
              <PageContainer className="flex flex-col gap-6">{children}</PageContainer>
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
