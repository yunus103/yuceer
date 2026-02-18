import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Package } from 'lucide-react'

interface Product {
  _id: string
  title: string
  slug?: string
  mainImage?: string
}

interface ProductShowcaseProps {
  items?: Product[]
}

export default function ProductShowcase({ items }: ProductShowcaseProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm block mb-3">Ürünlerimiz</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg text-base md:text-lg">
              Kaliteli kereste ve ahşap ürünlerimiz ile projelerinize değer katıyoruz.
            </p>
          </div>
          <Link href="/urunler" className="hidden md:block">
            <Button variant="outline" className="gap-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary">
              Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((product, index) => (
            <Link
              key={product._id}
              href={`/urunler/${product.slug || ''}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100/80 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-52 md:h-60 overflow-hidden bg-gray-50">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <Package className="w-10 h-10 mb-2 opacity-40" />
                      <span className="text-xs">Resim Yok</span>
                    </div>
                  )}
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover CTA */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-lg">
                      İncele <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
                    Detay <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link href="/urunler">
            <Button variant="outline" className="w-full gap-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary">
              Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
