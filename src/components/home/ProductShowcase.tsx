import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowLeftRight, ArrowRight, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-emerald-600 rounded-full" />
            <span className="text-emerald-700 font-bold tracking-[0.2em] uppercase text-[11px]">Ürün Grubu</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
            Öne Çıkan <span className="text-emerald-600">Koleksiyon</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl leading-relaxed font-normal max-w-2xl">
            Sürdürülebilir kaynaklardan elde edilen, yüksek dayanıklılığa sahip ahşap ürünlerimizle yapılarınıza doğallık katıyoruz.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((product) => (
            <Link
              key={product._id}
              href={`/urunler/${product.slug || ''}`}
              className="group block"
            >
              <div className="h-full bg-white flex flex-col transition-all duration-500">
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-100 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.mainImageAlt || product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <Package className="w-12 h-12" />
                    </div>
                  )}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Action Circle */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-neutral-900 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6 px-2 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-1 leading-tight mb-2">
                    {product.title}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-3">
                        {product.shortDescription}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Detayı İncele</span>
                    <div className="w-0 group-hover:w-12 h-[1px] bg-emerald-600 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-20 flex justify-center md:justify-start">
            <Link href="/urunler" className="group">
                <Button variant="outline" className="h-16 px-10 rounded-full border-neutral-200 text-neutral-900 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-500 font-bold uppercase tracking-widest text-xs gap-3">
                    BÜTÜN ÜRÜNLERİ GÖR <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  )
}
