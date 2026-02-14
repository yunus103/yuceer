import Link from 'next/link'
import { ArrowRight, Hammer, Warehouse, Ruler, Truck } from 'lucide-react'

const services = [
  {
    slug: 'ozel-ebatlama',
    icon: Hammer,
    title: 'Özel Ebatlama',
    description: 'İhtiyacınıza uygun ölçülerde hassas kesim ve ebatlama hizmeti. Projenizin gereksinimlerine göre milimetrik kesimler yapıyoruz.'
  },
  {
    slug: 'stoktan-teslim',
    icon: Warehouse,
    title: 'Stoktan Teslim',
    description: 'Geniş stok kapasitemiz ile beklemeden ürün temini. En çok tercih edilen ölçülerde kerestelerimiz her zaman hazır.'
  },
  {
    slug: 'projelendirme',
    icon: Ruler,
    title: 'Projelendirme',
    description: 'Ahşap projelerinizde teknik destek ve malzeme seçimi danışmanlığı. Hangi ağacın nerede kullanılacağı konusunda uzman desteği.'
  },
  {
    slug: 'nakliye',
    icon: Truck,
    title: 'Nakliye',
    description: 'Kendi araç filomuz ile güvenli ve hızlı teslimat. Ankara içi ve çevre illere sevkiyat seçeneklerimiz.'
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-muted min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Hizmetlerimiz</h1>
          <p className="text-gray-600 text-lg">
            Sadece ürün tedariği değil, projenizin başarısı için ihtiyaç duyduğunuz tüm hizmetleri profesyonel ekibimizle sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <Link href={`/hizmetler/${service.slug}`} className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                Detaylı Bilgi <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
