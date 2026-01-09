import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHub",
  description: "Find all of Priom's resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="font-body"
      >
        <header className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800">
          <Sidebar />
          <Link href="/">
            <img src="/ResourceHub.svg" alt="Phub Logo" className="h-10" />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
