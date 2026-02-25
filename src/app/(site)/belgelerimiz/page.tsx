import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { CERTIFICATES_PAGE_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import CertificatesGrid from '@/components/certificates/CertificatesGrid'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(CERTIFICATES_PAGE_QUERY);
  const title = data?.seo?.metaTitle || 'Belgelerimiz & Sertifikalar';
  return {
    title: title.includes('Yüceer Kereste') ? { absolute: title } : title,
    description: data?.seo?.metaDescription || 'Kalite standartlarımızı belgeleyen ulusal ve uluslararası sertifikalarımız.',
  }
}

export default async function CertificatesPage() {
  const data = await client.fetch(CERTIFICATES_PAGE_QUERY);

  // If no data, use empty or default values instead of returning null
  const pageTitle = data?.title || "Belgelerimiz";
  const pageSubtitle = data?.subtitle || "Üretimden teslimata her aşamada en yüksek kalite standartlarını koruyor ve belgeliyoruz.";
  const certificates = data?.certificates || [];

  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title={pageTitle} 
        subtitle={pageSubtitle}
      />


      {certificates.length > 0 ? (
        <CertificatesGrid certificates={certificates} />
      ) : (
        <div className="py-20 text-center text-neutral-400 font-medium">
            Henüz eklenmiş bir belge bulunmamaktadır.
        </div>
      )}
    </div>
  )
}
