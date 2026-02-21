import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Package, ShieldCheck, Hammer } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface ProductCardProps { 
  id: string
  title: string
  shortDescription?: string
  category?: string
  image?: string
  imageAlt?: string
  woodType?: string
  className?: string
}

export default function ProductCard({ id, title, shortDescription, category, image, imageAlt, woodType, className }: ProductCardProps) {
  return (
    <div className={cn("group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500", className)}>
      {/* Image Frame */}
      <Link href={`/urunler/${id}`} className="block relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300 bg-neutral-50">
            <Package className="w-12 h-12 mb-2" />
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-neutral-800 shadow-sm border border-neutral-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{category || 'Endüstriyel Ahşap'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-sm w-fit">
            <Hammer className="w-3.5 h-3.5 text-emerald-400" />
            <span>{woodType || 'Dayanıklı Üretim'}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="px-6 py-3 bg-white text-neutral-900 font-bold rounded-full text-sm flex items-center gap-2 shadow-lg">
              Detayları İncele <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Text Section */}
      <div className="p-6 flex-1 flex flex-col bg-white border-t border-neutral-100">
        <Link href={`/urunler/${id}`} className="block">
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 mb-2 leading-tight line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6 flex-1">
          {shortDescription || 'Yüksek standartlarda üretilmiş, endüstriyel kullanım için ideal ahşap ürün yelpazesi. Uzun ömürlü ve güvenilir.'}
        </p>
        
        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row items-center gap-3">
          <Link href={`/urunler/${id}`} className="w-full sm:w-1/2">
            <Button variant="outline" className="w-full h-11 rounded-xl border-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-colors">
              İncele
            </Button>
          </Link>
          <Link href="/iletisim" className="w-full sm:w-1/2">
            <Button className="w-full h-11 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors">
              Teklif Al
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

