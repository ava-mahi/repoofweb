import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowWithMaya — Instagram Growth & Creator Strategies",
  description: "Real creator strategies, honest advice, and no fluff. Learn Instagram growth, faceless content, AI tools, and monetization from someone who's actually done it.",
  keywords: ["Instagram growth", "faceless content", "AI tools", "creator economy", "monetization", "social media tips"],
  authors: [{ name: "Maya Chen" }],
  openGraph: {
    title: "GrowWithMaya — Instagram Growth & Creator Strategies",
    description: "Real creator strategies, honest advice, and no fluff.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowWithMaya — Instagram Growth & Creator Strategies",
    description: "Real creator strategies, honest advice, and no fluff.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
