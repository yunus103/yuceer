import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    settings = await client.fetch(SETTINGS_QUERY);
  } catch (error) {
    console.error("Failed to fetch settings for metadata:", error);
  }

  const siteTitle = settings?.siteTitle || "Yüceer Kereste";
  const metaTitle = settings?.seo?.metaTitle || siteTitle;
  const metaDesc = settings?.seo?.metaDescription || settings?.footerDescription || "Yüksek kaliteli kereste ve ahşap ürünleri.";
  const faviconUrl = settings?.favicon || "/favicon.ico";
  const ogImageUrl = settings?.seo?.ogImage || faviconUrl;

  return {
    metadataBase: new URL("https://yuceerkereste.com"),
    title: {
      default: metaTitle,
      template: `%s | ${siteTitle}`,
    },
    description: metaDesc,
    keywords: settings?.seo?.keywords,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: faviconUrl },
      ],
      shortcut: [faviconUrl],
      apple: [faviconUrl],
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [
        { url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }
      ],
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
