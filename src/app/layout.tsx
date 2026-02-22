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

  const title = settings?.siteTitle || "Yüceer Kereste";
  const desc = settings?.footerDescription || "Yüksek kaliteli kereste ve ahşap ürünleri.";
  const faviconUrl = settings?.favicon || "/favicon.ico";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: desc,
    icons: {
      icon: [
        { url: faviconUrl },
      ],
      shortcut: [faviconUrl],
      apple: [faviconUrl],
    },
    openGraph: {
      title,
      description: desc,
      images: [
        { url: faviconUrl, width: 512, height: 512, alt: "Site İkonu" }
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
