import Navbar from "@/components/home/navbar";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className={cn("relative h-full font-sans antialiased", inter.className)}>
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
        </main>
      </body>
    </html>
  );
}
