import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(SETTINGS_QUERY);

  return (
    <SmoothScroll>
      <Navbar 
        logo={settings?.logo} 
        phone={settings?.contact?.phone}
        phone2={settings?.contact?.phone2}
        email={settings?.contact?.email}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <WhatsAppButton phone={settings?.contact?.phone} />
      <Footer />
    </SmoothScroll>
  );
}
