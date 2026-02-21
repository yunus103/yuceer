import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Package, ShieldCheck, TreePine } from 'lucide-react'
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
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-emerald-600 rounded-full" />
            <span className="text-emerald-700 font-bold tracking-[0.2em] uppercase text-[11px]">Ürün Grubu</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
            Endüstriyel <span className="text-emerald-600">Ahşap Çözümlerimiz</span>
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed font-normal">
            Sürdürülebilir kaynaklardan elde edilen, yüksek dayanıklılığa sahip endüstriyel ahşap ve kereste ürünlerimizle projelerinize değer katıyoruz. Uluslararası standartlarda, ISPM-15 normlarına uygun, fırınlı ve emprenyeli seçeneklerimizle en zorlu lojistik ve inşaat ihtiyaçlarınız için güvenilir, uzun ömürlü çözümler sunuyoruz.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <Link
              key={product._id}
              href={`/urunler/${product.slug || ''}`}
              className="group block relative"
            >
              <div className="h-full bg-white flex flex-col transition-all duration-500 rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl">
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.mainImageAlt || product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <Package className="w-12 h-12" />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="px-6 py-3 bg-white text-neutral-900 font-bold rounded-full text-sm flex items-center gap-2">
                        Detayları İncele <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Badges Overlay (Always visible) */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-neutral-800 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Endüstriyel Sınıf</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/80 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-sm w-fit">
                      <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Uzun Ömürlü</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col bg-white z-10 border-t border-neutral-100">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">
                    {product.title}
                  </h3>
                  {product.shortDescription ? (
                    <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  ) : (
                    <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                      Yüksek kalite standartlarında üretilmiş, dayanıklı ve güvenilir endüstriyel ahşap çözümleri.
                    </p>
                  )}
                </div>
              </div>
            </Link>
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

