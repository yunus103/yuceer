'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Mock logos
const logos = [
   // Using placeholder images for logos
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+1',
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+2',
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+3',
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+4',
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+5',
   'https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+6',
]

const duplicatedLogos = [...logos, ...logos]

const MotionDiv = motion.create('div')

export default function ReferencesMarquee() {
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
             duration: 20 
           }}
        >
           {duplicatedLogos.map((logo, index) => (
             <div key={index} className="relative w-40 h-12 flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all duration-300">
                {/* Using a simple text placeholder if image fails, or just the image */}
                <Image 
                   src={logo} 
                   alt={`Referans ${index}`} 
                   fill
                   sizes="160px"
                   className="object-contain filter grayscale contrast-125"
                />
             </div>
           ))}
        </MotionDiv>
      </div>
    </section>
  )
}
