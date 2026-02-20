import { Suspense } from 'react'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Package, Info, Search } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

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
    <div className="min-h-screen bg-neutral-50/50">
      <PageHero title="Ürün Koleksiyonumuz" />

      {/* Main Content Area */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-1 bg-emerald-600 rounded-full" />
                        <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs">Yüceer Kereste</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
                        Doğanın <span className="text-emerald-600">En Saf</span> Haliyle Tanışın
                    </h2>
                    <p className="text-neutral-500 text-lg leading-relaxed font-medium">
                        İnşaatlık keresteden özel tasarım ahşap elemanlarına kadar geniş ürün yelpazemizle, projelerinizde kalite ve estetiği birleştiriyoruz.
                    </p>
                </div>
                <div className="hidden lg:flex items-center gap-4 text-neutral-300">
                    <Search className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-widest">Filtreleme Seçenekleri Çok Yakında</span>
                </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
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
              <div className="text-center py-32 bg-white rounded-[4rem] border border-neutral-100 shadow-sm">
                <div className="w-24 h-24 bg-neutral-50 text-neutral-200 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 mb-3 uppercase tracking-tight">Koleksiyon Boş</h3>
                <p className="text-neutral-400 mb-0 max-w-md mx-auto px-4 font-medium">
                  Şu anda sergilenecek ürünümüz bulunmamaktadır. Güncellemeler için lütfen takipte kalın.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                  <div className="text-white">
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Özel Bir Projeniz mi Var?</h4>
                      <p className="text-emerald-100 font-medium">İhtiyaçlarınıza özel üretim ve kesim çözümleri sunuyoruz.</p>
                  </div>
                  <Link href="/iletisim">
                      <button className="px-12 py-5 bg-white text-emerald-700 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:scale-105 active:scale-100 transition-all">
                          Bizimle İletişime Geçin
                      </button>
                  </Link>
              </div>
          </div>
      </section>
    </div>
  )
}
