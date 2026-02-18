import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCardProps { 
  id: string
  title: string
  category?: string
  image?: string
  woodType?: string
  className?: string
}

export default function ProductCard({ id, title, category, image, woodType, className }: ProductCardProps) {
  return (
    <Link href={`/urunler/${id}`} className={cn("group block", className)}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 h-full flex flex-col group-hover:-translate-y-1">
        <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden bg-gray-50">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
              <Package className="w-12 h-12 mb-2 opacity-40" />
              <span className="text-sm">Resim Yok</span>
            </div>
          )}
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {category && (
              <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-primary uppercase tracking-wider shadow-sm">
                {category}
              </span>
            )}
            {woodType && (
              <span className="bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
                {woodType}
              </span>
            )}
          </div>

          {/* Hover CTA */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-primary text-white text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
              İncele <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
            Detayları Gör <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
