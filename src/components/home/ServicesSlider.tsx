import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Hammer } from 'lucide-react'

interface Service {
  _id: string
  title: string
  summary?: string
  icon?: string
}

interface ServicesSliderProps {
  items?: Service[]
}

export default function ServicesSlider({ items }: ServicesSliderProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
             <span className="text-white/80 font-bold tracking-wider uppercase text-sm">Hizmetlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Sizin İçin Neler Yapıyoruz?</h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Sadece ürün satışı değil, projenizin her aşamasında çözüm ortağınız oluyoruz.
            </p>
          </div>
          <Link href="/hizmetler">
             <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Tüm Hizmetler <ArrowRight className="w-5 h-5" />
             </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {items.map((service) => (
              <Link key={service._id} href="/hizmetler" className="block group">
                <div className="h-full bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/20 transition-all group-hover:-translate-y-1">
                   <div className="w-12 h-12 mb-6 relative">
                      {service.icon ? (
                        <Image 
                           src={service.icon} 
                           alt={service.title} 
                           fill 
                           className="object-contain filter invert brightness-0 invert-(0)" // Make it white-ish if it's a dark icon
                        />
                      ) : (
                        <Hammer className="w-10 h-10 text-white" />
                      )}
                   </div>
                   <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                   <p className="text-white/70 leading-relaxed text-sm line-clamp-3">
                      {service.summary}
                   </p>
                </div>
              </Link>
           ))}
        </div>
      </div>
    </section>
  )
}
