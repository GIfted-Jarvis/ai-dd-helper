import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import ThemeProvider from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "AI-DD-Helper", applicationName: "AI-Driven Design" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0`}>
        <div className="m-10">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
