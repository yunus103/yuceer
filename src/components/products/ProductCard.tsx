import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <Link href={`/urunler/${id}`} className={cn("group block", className)}>
      <div className="flex flex-col h-full bg-white transition-all duration-500">
        
        {/* Image Frame - Minimal & Elegant */}
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-50 border border-neutral-100/50 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group-hover:-translate-y-2">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-200">
              <Package className="w-12 h-12 mb-2 opacity-30" />
            </div>
          )}

          {/* Minimal Tags */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {category && (
              <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-emerald-700 uppercase tracking-widest shadow-sm border border-black/[0.03]">
                {category}
              </span>
            )}
          </div>

          {/* Subtle Hover Action Overlay */}
          <div className="absolute inset-0 bg-emerald-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 opacity-0 scale-75 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 shadow-lg transition-all duration-500">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Text Section - Clean Typography */}
        <div className="pt-6 px-3 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-neutral-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-1 leading-tight">
            {title}
          </h3>
          {shortDescription && (
            <p className="mt-2 text-sm text-neutral-500 line-clamp-2 leading-relaxed font-medium">
              {shortDescription}
            </p>
          )}
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">İNCELE</span>
                <div className="w-6 h-[1px] bg-neutral-200 group-hover:w-10 group-hover:bg-emerald-600 transition-all duration-500" />
            </div>
            {woodType && (
              <span className="text-[10px] text-neutral-300 font-medium italic">#{woodType}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
