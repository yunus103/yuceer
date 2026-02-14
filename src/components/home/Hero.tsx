import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface HeroProps {
  data?: {
    eyebrow?: string
    title?: string
    backgroundImage?: string
    ctaButton?: {
      text: string
      link: string
    }
    secondaryButton?: {
      text: string
      link: string
    }
  } | null
}

export default function Hero({ data }: HeroProps) {
  // Use nullish coalescing to ensure defaults are used if data is null or if properties are null/undefined
  const eyebrow = data?.eyebrow ?? "Malzeme Özelliklerine Saygı Duyan Proje Planlaması";
  const title = data?.title ?? "MARANGOZLUK VE KERESTE HİZMETLERİ";
  const backgroundImage = data?.backgroundImage ?? "https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=2068&auto=format&fit=crop";
  const ctaButton = data?.ctaButton ?? { text: "Hemen Teklif Al", link: "/iletisim" };
  const secondaryButton = data?.secondaryButton ?? { text: "Tanıtım Filmini İzle", link: "#" };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
      >
        <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[20s]"
           style={{ 
             backgroundImage: `url("${backgroundImage}")`,
           }}
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Darker Overlay for text contrast */}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-white hover:cursor-default">
        <div className="max-w-4xl">
           <p className="text-xs md:text-sm font-bold tracking-[0.2em] mb-4 text-gray-300 animate-fade-in-up uppercase">
             {eyebrow}
           </p>
           <h1 
             className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] animate-fade-in-up delay-100"
             dangerouslySetInnerHTML={{ 
               __html: (title || "").replace(/\n/g, '<br />').replace('KERESTE', '<span class="text-gray-400">KERESTE</span>') 
             }}
           />
           
           <div className="flex flex-col sm:flex-row gap-6 items-center animate-fade-in-up delay-200">
             <Link href={ctaButton.link || "/iletisim"}>
               <Button size="lg" className="rounded-full bg-[#c05e3e] hover:bg-[#a04e33] text-white px-8 py-6 text-sm font-bold tracking-widest uppercase border-none">
                 {ctaButton.text}
               </Button>
             </Link>
             
             {secondaryButton && (
               <button className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 group-hover:border-l-black transition-colors" />
                  </div>
                  <span className="text-sm font-bold tracking-wider uppercase">{secondaryButton.text}</span>
               </button>
             )}
           </div>
        </div>
      </div>
    </section>
  )
}
