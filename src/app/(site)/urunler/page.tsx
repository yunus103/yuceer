import { Suspense } from 'react'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Package, Info, Search, Factory } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import Image from 'next/image'

export const metadata = {
  title: 'Ürünlerimiz | Yüceer Kereste',
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
      <PageHero title="Ürün Kataloğu" />

      {/* Main Content Area */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header & SEO Intro */}
          <div className="max-w-4xl mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 uppercase tracking-tighter">
              Endüstriyel <span className="text-emerald-600">Ahşap Çözümleri</span>
            </h1>
            
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed font-medium">
              <p>
                Yüceer Kereste olarak, yılların verdiği deneyimle projeleriniz için en uygun endüstriyel ahşap ve kereste ürünlerini sunuyoruz. İster yüksek taşıma kapasitesine sahip ambalaj çözümleri olsun, ister inşaat kalıp sistemlerinde kullanılan dayanıklı keresteler, her bir ürünümüz titiz kalite kontrol süreçlerinden geçer.
              </p>
              <p>
                Orman ürünlerimiz, sürdürülebilir kaynaklardan elde edilir ve çevresel standartlara uygun olarak işlenir. Özellikle ısıl işlem (ISPM-15) ve fırınlama gibi uluslararası normları karşılayan işlemlerle, ahşabın dayanıklılığı ve ömrü maksimize edilmektedir. Lojistik ve istifleme süreçlerinizde sorunsuz bir deneyim yaşamanız için özel ebatlama seçenekleri sunuyoruz.
              </p>
              <p>
                Aşağıdaki ürün kataloğumuzdan standart ölçülerdeki üretimlerimizi inceleyebilir veya projelerinize özel ölçülerde üretim detayları için bizimle iletişime geçebilirsiniz. İhtiyaç duyduğunuz tüm teknik spesifikasyonlarda ve sertifikasyon süreçlerinde yanınızdayız.
              </p>
            </div>
          </div>

          {/* Filters (Mock) */}
          <div className="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-neutral-100">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest mr-4">Kategoriler :</span>
            {['Tümü', 'İnşaat Kerestesi', 'Ahşap Palet', 'Ambalaj Sandığı', 'Plywood'].map((cat, idx) => (
              <button 
                key={cat} 
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${idx === 0 ? 'bg-emerald-600 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            20.000 m² açık ve kapalı alanımızla, en büyük projeleriniz için kesintisiz ahşap tedariği ve hızlı sevkiyat garantisi sunuyoruz.
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

