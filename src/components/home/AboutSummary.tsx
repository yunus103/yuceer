import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

export default function AboutSummary() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section: Image + Text */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <ScrollAnimation className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-sm order-2 lg:order-1">
             <Image 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"
                alt="Kereste İşçiliği"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
             />
          </ScrollAnimation>
          
          <div className="order-1 lg:order-2 pt-8">
            <ScrollAnimation delay={0.2}>
              <span className="text-[#c05e3e] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Kurumsal</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-[1.1] tracking-tight">
                GÜVENİLİR KERESTE HİZMETLERİ VE <br />
                <span className="text-gray-400">KUSURSUZ İŞÇİLİK.</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Kapsamlı hizmetlerimiz, proje planlamasından üretime, sonlandırmadan montaja kadar her aşamayı içerir. 
                Böylece müşterilerimiz sadece tasarıma ve sonuca odaklanabilir.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <h4 className="font-bold text-3xl text-gray-900 mb-2">30+</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Yıllık Tecrübe</p>
                 </div>
                 <div>
                    <h4 className="font-bold text-3xl text-gray-900 mb-2">500+</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Tamamlanan Proje</p>
                 </div>
              </div>

              <Link href="/hakkimizda">
                <Button variant="link" className="text-[#c05e3e] p-0 h-auto font-bold tracking-widest uppercase hover:no-underline hover:text-gray-900 transition-colors">
                  Daha Fazla Bilgi <span className="ml-2">→</span>
                </Button>
              </Link>
            </ScrollAnimation>
          </div>
        </div>

        {/* Bottom Section: Additional Images / Details */}
        <div className="grid md:grid-cols-2 gap-8">
           <ScrollAnimation delay={0.3} className="relative h-[300px] rounded-2xl overflow-hidden">
              <Image 
                 src="https://images.unsplash.com/photo-1621379963694-8260da30fae3?q=80&w=2070&auto=format&fit=crop"
                 alt="Ahşap Detay"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover hover:scale-105 transition-transform duration-700"
              />
           </ScrollAnimation>
           <ScrollAnimation delay={0.4} className="relative h-[300px] rounded-2xl overflow-hidden bg-[#f4f1ea] p-8 flex flex-col justify-center items-start">
               <div className="w-16 h-16 rounded-full bg-[#c05e3e] text-white flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
               </div>
               <h3 className="text-2xl font-bold mb-4 text-gray-900">Modern Üretim</h3>
               <p className="text-gray-600 mb-6">
                  En son teknoloji makineler ve geleneksel el işçiliğinin mükemmel uyumu.
               </p>
           </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
