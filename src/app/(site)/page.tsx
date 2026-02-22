import Hero from '@/components/home/Hero'
import AboutSummary from '@/components/home/AboutSummary'
import WhyUs from '@/components/home/WhyUs'
import ProductShowcase from '@/components/home/ProductShowcase'
import ProductionInfrastructure from '@/components/home/ProductionInfrastructure'
import ContactSection from '@/components/home/ContactSection'
import { client } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  const homeData = await client.fetch(HOME_PAGE_QUERY);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={homeData?.home?.hero} />
      <AboutSummary 
        data={homeData?.home?.aboutSection} 
        aboutPage={homeData?.about} 
      />
      <WhyUs data={homeData?.home?.whyChooseUs} />
      <ProductShowcase items={homeData?.products} />
      <ProductionInfrastructure />
      <ContactSection backgroundImage={homeData?.about?.historyImage} />
    </div>
  )
}
