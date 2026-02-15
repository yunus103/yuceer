'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Reference {
  _id: string
  companyName?: string
  logo?: string
  url?: string
}

interface ReferencesMarqueeProps {
  items?: Reference[]
}

const MotionDiv = motion.create('div')

export default function ReferencesMarquee({ items }: ReferencesMarqueeProps) {
  // If no items, don't render the section at all or show a placeholder
  if (!items || items.length === 0) return null;

  const duplicatedItems = [...items, ...items]

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-10">
        <p className="text-gray-500 font-medium text-sm tracking-wide uppercase">Referanslarımız</p>
      </div>
      
      <div className="flex overflow-hidden relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
        <MotionDiv
           className="flex gap-16 items-center min-w-max pr-16"
           animate={{ x: ["0%", "-50%"] }}
           transition={{ 
             repeat: Infinity, 
             ease: "linear", 
             duration: 30 
           }}
        >
           {duplicatedItems.map((item, index) => (
             <div key={`${item._id}-${index}`} className="relative w-40 h-10 flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all duration-300">
                {item.logo ? (
                  <Image 
                     src={item.logo} 
                     alt={item.companyName || 'Referans'} 
                     fill
                     sizes="160px"
                     className="object-contain filter grayscale contrast-125"
                  />
                ) : (
                  <span className="text-gray-400 font-bold tracking-tighter uppercase whitespace-nowrap">
                    {item.companyName}
                  </span>
                )}
             </div>
           ))}
        </MotionDiv>
      </div>
    </section>
  )
}
