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
    <div className={cn("group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-neutral-100", className)}>
      {/* Image Frame */}
      <Link href={`/urunler/${id}`} className="block relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300 bg-neutral-50">
            <Package className="w-12 h-12 mb-2" />
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[11px] font-black text-neutral-800 shadow-sm uppercase tracking-widest border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{category || 'Kızılçam'}</span>
          </div>
        </div>
        
        {/* Subtle Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </Link>

      {/* Text Section */}
      <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
        <Link href={`/urunler/${id}`} className="block">
          <h3 className="text-2xl font-black text-neutral-900 group-hover:text-emerald-600 transition-colors duration-300 mb-3 leading-tight line-clamp-2 uppercase tracking-tight">
            {title}
          </h3>
        </Link>
        <p className="text-neutral-500 line-clamp-3 leading-relaxed mb-8 flex-1 font-medium text-sm">
          {shortDescription || 'Yüksek standartlarda üretilmiş, endüstriyel kullanım için ideal ahşap ürün yelpazesi. Uzun ömürlü ve güvenilir donanım.'}
        </p>
        
        {/* Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link href={`/urunler/${id}`} className="col-span-1">
            <Button variant="outline" className="w-full h-12 rounded-2xl border-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
              İncele
            </Button>
          </Link>
          <Link href="/iletisim" className="col-span-1">
            <Button className="w-full h-12 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 transition-all">
              Teklif Al
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

