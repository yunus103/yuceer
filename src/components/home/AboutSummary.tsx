import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

const MotionDiv = ScrollAnimation; // Alias for clarity if needed, but ScrollAnimation wraps motion.create('div')

interface AboutSummaryProps {
  data?: {
    title?: string
    summary?: string
    primaryButton?: {
      text: string
      link: string
    }
  }
  aboutPage?: {
    historyImage?: string
    foundingYear?: number
  }
}

export default function AboutSummary({ data, aboutPage }: AboutSummaryProps) {
  const currentYear = new Date().getFullYear()
  const foundingYear = aboutPage?.foundingYear || 1995
  const experienceYears = currentYear - foundingYear

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Large Image */}
          <ScrollAnimation className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg">
             {aboutPage?.historyImage ? (
               <Image 
                  src={aboutPage.historyImage}
                  alt="Hakkımızda"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
               />
             ) : (
               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                 Görsel Yüklenmedi
               </div>
             )}
             
             {/* Experience Badge */}
             <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary text-white flex flex-col items-center justify-center text-center shadow-xl border-4 border-white">
                <span className="text-4xl md:text-5xl font-bold leading-none">{experienceYears}</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1 px-2 leading-tight">Yıllık<br/>Tecrübe</span>
             </div>
          </ScrollAnimation>
          
          {/* Right Column: Content */}
          <div className="pt-8">
            <ScrollAnimation delay={0.2}>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">HAKKIMIZDA</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-[1.1] tracking-tight uppercase">
                {data?.title || "GÜVENİLİR KERESTE HİZMETLERİ VE KUSURSUZ İŞÇİLİK."}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg max-w-xl">
                {data?.summary || "Kapsamlı hizmetlerimiz, proje planlamasından üretime, sonlandırmadan montaja kadar her aşamayı içerir. Böylece müşterilerimiz sadece tasarıma ve sonuca odaklanabilir. Kalite standartlarımız ve uzman ekibimizle, her projede mükemmelliği hedefliyoruz."}
              </p>
              
              {data?.primaryButton && (
                <Link href={data.primaryButton.link || "/hakkimizda"}>
                  <Button className="rounded-full px-8 py-6 text-sm font-bold tracking-widest uppercase">
                    {data.primaryButton.text || "Daha Fazla Bilgi"}
                  </Button>
                </Link>
              )}
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
