import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(SETTINGS_QUERY);

  return (
    <>
      <Navbar logo={settings?.logo} />
      <main className="min-h-screen">
        {children}
      </main>
      <WhatsAppButton phone={settings?.contact?.phone} />
      <Footer />
    </>
  );
}
