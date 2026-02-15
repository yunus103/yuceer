import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
    <div className={cn("group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100", className)}>
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            Resim Yok
          </div>
        )}
        <div className="absolute top-4 left-4 flex gap-2">
           {category && (
             <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
               {category}
             </span>
           )}
           {woodType && (
             <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide shadow-sm">
               {woodType}
             </span>
           )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">{title}</h3>
        <Link href={`/urunler/${id}`} className="inline-block mt-2">
           <span className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
             İncele <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
           </span>
        </Link>
      </div>
    </div>
  )
}
