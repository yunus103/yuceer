import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

// Mock data
const products = [
  {
    id: 1,
    title: 'İnşaatlık Kereste',
    category: 'İnşaat',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=2039&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Silinmiş Kereste',
    category: 'Dekoratif',
    image: 'https://images.unsplash.com/photo-1545622616-24eb22442654?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Çam Lambiri',
    category: 'Kaplama',
    image: 'https://images.unsplash.com/photo-1621379963694-8260da30fae3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'OSB Levha',
    category: 'Levha',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop'
  }
]

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Ürünlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Öne Çıkan Ürünler</h2>
          </div>
          <Link href="/urunler" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">{product.title}</h3>
                <Link href={`/urunler/${product.id}`}> {/* Placeholder link */}
                   <span className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 mt-4">
                     İncele <ArrowRight className="w-3 h-3" />
                   </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/urunler">
            <Button variant="outline" className="w-full gap-2">
              Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
