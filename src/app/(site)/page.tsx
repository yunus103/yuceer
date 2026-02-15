import Hero from '@/components/home/Hero'
import AboutSummary from '@/components/home/AboutSummary'
import WhyUs from '@/components/home/WhyUs'
import ProductShowcase from '@/components/home/ProductShowcase'
import ServicesSlider from '@/components/home/ServicesSlider'
import ReferencesMarquee from '@/components/home/ReferencesMarquee'
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
      <WhyUs />
      <ProductShowcase />
      <ServicesSlider />
      <ReferencesMarquee />
      <ContactSection />
    </div>
  )
}
