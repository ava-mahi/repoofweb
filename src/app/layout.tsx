import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "128x128", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1682225092868188" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1682225092868188"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GrowWithMaya",
              url: "https://www.growwithmaya.info",
              description: "Real creator strategies, honest advice, and no fluff. Learn Instagram growth, faceless content, AI tools, and monetization.",
              publisher: {
                "@type": "Organization",
                name: "GrowWithMaya",
                url: "https://www.growwithmaya.info",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.growwithmaya.info/logo.png",
                },
                sameAs: [
                  "https://www.instagram.com/maya",
                ],
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.growwithmaya.info/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
