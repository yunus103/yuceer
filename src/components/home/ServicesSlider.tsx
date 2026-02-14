import Link from 'next/link'
import { ArrowRight, Hammer, Warehouse, Ruler, Truck } from 'lucide-react'

const services = [
  {
    icon: Hammer,
    title: 'Özel Ebatlama',
    description: 'İhtiyacınıza uygun ölçülerde hassas kesim ve ebatlama hizmeti.'
  },
  {
    icon: Warehouse,
    title: 'Stoktan Teslim',
    description: 'Geniş stok kapasitemiz ile beklemeden ürün temini.'
  },
  {
    icon: Ruler,
    title: 'Projelendirme',
    description: 'Ahşap projelerinizde teknik destek ve malzeme seçimi danışmanlığı.'
  },
  {
    icon: Truck,
    title: 'Nakliye',
    description: 'Kendi araç filomuz ile güvenli ve hızlı teslimat.'
  }
]

export default function ServicesSlider() {
  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
       {/* Background pattern or overlay could go here */}
       
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
           {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                 <service.icon className="w-10 h-10 mb-6 text-white" />
                 <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                 <p className="text-white/70 leading-relaxed text-sm">
                    {service.description}
                 </p>
              </div>
           ))}
        </div>
      </div>
    </section>
  )
}
