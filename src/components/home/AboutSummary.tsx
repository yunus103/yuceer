import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

const MotionDiv = ScrollAnimation; // Alias for clarity if needed, but ScrollAnimation wraps motion.create('div')

export default function AboutSummary() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Large Image */}
          <ScrollAnimation className="relative h-[500px] lg:h-[650px] w-full rounded-3xl overflow-hidden shadow-lg">
             <Image 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
                alt="Kereste İşçiliği"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
             />
          </ScrollAnimation>
          
          {/* Right Column: Content */}
          <div className="pt-8">
            <ScrollAnimation delay={0.2}>
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-6 block">KURUMSAL</span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-8 text-gray-900 leading-[1.1] tracking-tight uppercase">
                GÜVENİLİR KERESTE HİZMETLERİ VE <br />
                <span className="text-gray-400">KUSURSUZ İŞÇİLİK.</span>
              </h2>
              <p className="text-gray-600 mb-12 leading-relaxed text-lg max-w-xl">
                Kapsamlı hizmetlerimiz, proje planlamasından üretime, sonlandırmadan montaja kadar her aşamayı içerir. 
                Böylece müşterilerimiz sadece tasarıma ve sonuca odaklanabilir. Kalite standartlarımız ve uzman ekibimizle, 
                her projede mükemmelliği hedefliyoruz.
              </p>
              
              {/* Bottom Images & Badge */}
              <div className="relative grid grid-cols-2 gap-6 mt-12">
                 {/* Experience Badge - Absolute positioned similar to the design */}
                 <div className="absolute -top-16 -right-4 md:-right-8 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#bfb498] text-white flex flex-col items-center justify-center text-center shadow-xl border-4 border-white">
                    <span className="text-4xl md:text-5xl font-bold leading-none">30</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1 px-2 leading-tight">Yıllık<br/>Tecrübe</span>
                 </div>

                 <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <Image 
                       src="https://images.unsplash.com/photo-1621379963694-8260da30fae3?q=80&w=2070&auto=format&fit=crop"
                       alt="Ahşap Detay 1"
                       fill
                       sizes="(max-width: 768px) 50vw, 25vw"
                       className="object-cover"
                    />
                 </div>
                 <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-md">
                    <Image 
                       src="https://images.unsplash.com/photo-1545622616-24eb22442654?q=80&w=2070&auto=format&fit=crop"
                       alt="Ahşap Detay 2"
                       fill
                       sizes="(max-width: 768px) 50vw, 25vw"
                       className="object-cover"
                    />
                 </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
