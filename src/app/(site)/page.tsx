import Hero from '@/components/home/Hero'
import AboutSummary from '@/components/home/AboutSummary'
import WhyUs from '@/components/home/WhyUs'
import ProductShowcase from '@/components/home/ProductShowcase'
import ProductionInfrastructure from '@/components/home/ProductionInfrastructure'
import ContactSection from '@/components/home/ContactSection'
import BlogSection from '@/components/home/BlogSection'
import { client } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  const homeData = await client.fetch(HOME_PAGE_QUERY);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yüceer Kereste',
    url: 'https://yuceerkereste.com',
    description: 'Yüksek kaliteli kereste ve ahşap ürünleri üreten güvenilir iş ortağınız.',
    publisher: {
      '@type': 'Organization',
      name: 'Yüceer Kereste',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yuceerkereste.com/favicon.ico'
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero data={homeData?.home?.hero} />
      <AboutSummary 
        data={homeData?.home?.aboutSection} 
        aboutPage={homeData?.about} 
      />
      <WhyUs data={homeData?.home?.whyChooseUs} />
      <ProductShowcase items={homeData?.products} />
      <ProductionInfrastructure />
      <BlogSection posts={homeData?.posts} />
      <ContactSection backgroundImage={homeData?.about?.historyImage} />
    </div>
  )
}
