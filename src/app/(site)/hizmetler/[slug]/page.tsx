import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Mock Data Fetcher
const getService = async (slug: string) => {
  return {
    title: 'Özel Ebatlama Hizmeti',
    description: `
      Ahşap projelerinizde standart ölçülerin dışında, tamamen ihtiyacınıza yönelik çözümler sunuyoruz. 
      Son teknoloji kesim makinelerimiz ve uzman operatörlerimiz ile milimetrik hassasiyette ebatlama yapıyoruz.
      
      İnşaatlık kereste, dekoratif paneller, lambiri ve diğer tüm ahşap ürünlerimizde isteğinize göre boy ve 
      genişlik ayarlaması yapılmaktadır. Bu sayede şantiyede veya atölyede zaman kaybetmeden, 
      montaja hazır ürünler teslim alırsınız.
    `,
    features: [
      'Milimetrik hassasiyet',
      'Hızlı teslimat',
      'Firesiz kesim',
      'Her çeşit ağaç için uygun'
    ]
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug)

  return (
    <div className="bg-white min-h-screen py-32">
       <div className="container mx-auto px-4">
          <Link href="/hizmetler" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4 mr-2" /> Tüm Hizmetlere Dön
          </Link>

          <div className="max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{service.title}</h1>
             
             <div className="prose prose-lg prose-gray max-w-none mb-12">
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                   {service.description}
                </p>
             </div>

             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12">
                <h3 className="text-xl font-bold mb-4">Hizmet Özellikleri</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                   {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                   ))}
                </ul>
             </div>

             <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Bu hizmet için teklif almak ister misiniz?</h3>
                <Link href="/iletisim">
                   <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg">
                      Hemen İletişime Geçin
                   </Button>
                </Link>
             </div>
          </div>
       </div>
    </div>
  )
}
