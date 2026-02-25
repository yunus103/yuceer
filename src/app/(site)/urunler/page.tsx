import { Suspense } from 'react'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Package, Info, Search, Factory } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import Image from 'next/image'

export const metadata = {
  title: 'Ürünlerimiz',
  description: 'İnşaatlık keresteden dekoratif ürünlere, geniş ürün yelpazemizle projeleriniz için en kaliteli çözümleri sunuyoruz.',
}

export default async function ProductsPage() {
  let products: any[] = []

  try {
    products = await client.fetch(ALL_PRODUCTS_QUERY)
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-32 px-4">
        <div className="text-center p-12 bg-white rounded-[3rem] shadow-2xl max-w-md mx-auto border border-neutral-100">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 mb-3 uppercase tracking-tight">Bir Hata Oluştu</h1>
          <p className="text-neutral-500 mb-8 leading-relaxed">Ürün portföyümüz yüklenirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.</p>
          <Link href="/">
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors">
              Anasayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <PageHero 
        title="Ürün Kataloğu" 
        subtitle="İnşaat, sanayi ve dekorasyon projeleriniz için uluslararası standartlara uygun, dayanıklı ve yüksek kaliteli endüstriyel ahşap çözümleri."
      />

      {/* Main Content Area */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Grid Layout */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product.slug}
                  title={product.title}
                  category={product.category}
                  woodType={product.woodType}
                  image={product.mainImage}
                  imageAlt={product.mainImageAlt}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-neutral-50 rounded-[4rem] border border-neutral-100 shadow-sm">
              <div className="w-24 h-24 bg-white text-neutral-300 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Package className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-3 uppercase tracking-tight">Katalog Güncelleniyor</h3>
              <p className="text-neutral-500 mb-0 max-w-md mx-auto px-4 font-medium">
                Yeni ürün portföyümüz yapılandırılıyor. Lütfen daha sonra tekrar ziyaret edin.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Visual Break Section */}
      <section className="relative h-[400px] md:h-[500px] w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
        {/* You can replace this src with a real factory/timber image you have in public directory */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1542282811-943ef1a67742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Factory className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Yüksek Kapasiteli <span className="text-emerald-400">Üretim Tesisi</span>
          </h2>
          <p className="text-neutral-300 text-lg md:text-xl font-medium">
            25.000 m² tomruk sahası ve aylık 5.000 m³ üretim kapasitemizle büyük hacimli projeleriniz için kesintisiz kereste tedariği ve zamanında sevkiyat sağlıyoruz.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-neutral-50 py-24 border-t border-neutral-200">
          <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100">
                  <div className="text-neutral-900">
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Kurumsal Satın Alma</h4>
                      <p className="text-neutral-500 font-medium text-lg">Toptan siparişleriniz ve size özel fiyatlandırma için satış uzmanlarımızla görüşün.</p>
                  </div>
                  <Link href="/iletisim" className="shrink-0">
                      <button className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-emerald-700 hover:shadow-emerald-600/20 active:scale-95 transition-all">
                          Teklif İste
                      </button>
                  </Link>
              </div>
          </div>
      </section>
    </div>
  )
}

