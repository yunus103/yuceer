import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

interface Product {
  _id: string
  title: string
  shortDescription?: string
  slug?: string
  mainImage?: string
  mainImageAlt?: string
}

interface ProductShowcaseProps {
  items?: Product[]
}

export default function ProductShowcase({ items }: ProductShowcaseProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 stroke=%22rgba(16,185,129,0.17)%22 stroke-width=%221%22><g fill=%22none%22><path d=%22M0,40 L40,40 M40,0 L40,40%22/></g></svg>')" }}>
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-emerald-600 rounded-full" />
            <span className="text-emerald-700 font-bold tracking-[0.2em] uppercase text-[11px]">Ürünlerimiz</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
            Profesyonel <span className="text-emerald-600">Ürünlerimiz</span>
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed font-normal">
            İnşaat, sanayi ve dekorasyon ihtiyaçlarınıza uygun, uluslararası kalite standartlarında (ISPM-15) fırınlanmış ve uzun ömürlü ahşap çözümleri sunuyoruz. Yüksek kapasiteli üretimimizle projelerinize hız ve güven katın.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <ProductCard 
              key={product._id}
              id={product.slug || ''}
              title={product.title}
              shortDescription={product.shortDescription}
              image={product.mainImage}
              imageAlt={product.mainImageAlt}
            />
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 flex justify-center">
            <Link href="/urunler" className="group">
                <Button variant="outline" className="h-16 px-10 rounded-full border-neutral-200 text-neutral-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-500 font-bold uppercase tracking-widest text-xs gap-3 shadow-sm">
                    TÜM ÜRÜNLERİ İNCELE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  )
}

