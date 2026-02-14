import { Button } from '@/components/ui/Button'
import ProductGallery from '@/components/products/ProductGallery'
import ProductSpecs from '@/components/products/ProductSpecs'
import { Phone, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Mock Data Fetcher (in reality, fetch from Sanity using slug)
const getProduct = async (slug: string) => {
  // Simulate delay
  // await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    id: 1,
    title: 'Sarıçam İnşaatlık Kereste',
    description: `
      Yüksek mukavemeti ve dayanıklılığı ile bilinen Sarıçam inşaatlık kerestelerimiz, 
      inşaat projelerinizin kalıp, çatı ve iskele sistemlerinde güvenle kullanılabilir. 
      Yerli ve ithal seçeneklerimiz mevcuttur. Fırınlı ve fırınsız seçenekler ile sunulmaktadır.
    `,
    category: 'İnşaatlık',
    woodType: 'Sarıçam',
    images: [
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=2039',
      'https://images.unsplash.com/photo-1545622616-24eb22442654?q=80&w=2070',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070'
    ],
    specs: [
       { label: 'Ağaç Türü', value: 'Sarıçam (Pinus Sylvestris)' },
       { label: 'Nem Oranı', value: '%15-20 (Fırınlı)' },
       { label: 'Kalınlık', value: '2.5cm - 5cm - 10cm' },
       { label: 'Genişlik', value: '10cm - 20cm arası' },
       { label: 'Boy', value: '3m - 6m arası' },
       { label: 'Menşei', value: 'Türkiye / Ukrayna' }
    ]
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  return (
    <div className="bg-gray-50 min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-12">
           <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Gallery */}
              <div>
                 <ProductGallery images={product.images} title={product.title} />
              </div>

              {/* Right: Info */}
              <div>
                 <div className="flex gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                       {product.category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                       {product.woodType}
                    </span>
                 </div>
                 
                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{product.title}</h1>
                 
                 <div className="prose prose-gray max-w-none text-gray-600 mb-8 whitespace-pre-line leading-relaxed">
                    {product.description}
                 </div>

                 <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-primary" /> Stok Durumu: Stokta Var
                    </h3>
                    <p className="text-sm text-gray-500">
                       Hızlı teslimat imkanı ile şantiyenize kadar sevk ediyoruz. Toptan alımlar için özel fiyat teklifi alınız.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/iletisim" className="flex-1">
                       <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                          Fiyat Teklifi Al
                       </Button>
                    </Link>
                    <a href="tel:+903123456789" className="flex-1">
                       <Button size="lg" variant="outline" className="w-full py-6 text-lg gap-2 text-gray-800 border-gray-300 hover:bg-gray-50">
                          <Phone className="w-5 h-5" /> Hemen Ara
                       </Button>
                    </a>
                 </div>

                 <ProductSpecs specs={product.specs} />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
