import Image from 'next/image'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { PageHero } from '@/components/ui/PageHero'
import CertificatesSection from '@/components/about/CertificatesSection'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Hakkımızda | Yüceer Kereste',
  description: '1995\'ten beri kaliteli kereste ve orman ürünleri tedarikçisi. Ostim Ankara\'da hizmetinizdeyiz.',
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => {
      if (!children || (children.length === 1 && children[0] === '')) {
        return <p className="mb-4 min-h-[1em]">&nbsp;</p>
      }
      return <p className="mb-4 text-neutral-600 leading-relaxed text-lg">{children}</p>
    },
    h1: ({ children }: any) => <h1 className="text-3xl font-bold text-neutral-900 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-neutral-900 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-neutral-900 mb-3">{children}</h3>,
  },
}

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_PAGE_QUERY);

  if (!data) return null;

  const storyImage = data.historyImage
  // const storyHeading = data.historyHeading || "Hikayemiz" // Not used in new design
  // const storyQuote = data.historyQuote // Not used in new design

  return (
    <div className="bg-white min-h-screen">
      <PageHero title={data.title || "Hakkımızda"} />

      {/* Intro section: Statistics & Image */}
      <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              {/* Statistics Column */}
              <div className="flex flex-col justify-center space-y-8">
                  <div className="space-y-4">
                       <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm block">BİR BAKIŞTA YÜCEER KERESTE</span>
                      <h2 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight">
                          {data.historyHeading || "Ahşaba Duyulan Saygı ve Ustalıkla Geçen Yıllar"}
                      </h2>
                      <div className="w-20 h-2 bg-emerald-600 rounded-full" />
                  </div>
                  
                  {data.stats && data.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                          {data.stats.slice(0, 4).map((stat: any, idx: number) => {
                              const IconComponent = (Icons as any)[stat.icon] || Icons.TrendingUp;
                              return (
                                  <div key={idx} className="bg-neutral-50 p-6 md:p-8 rounded-3xl border border-neutral-100 group hover:bg-emerald-600 transition-colors duration-500">
                                      <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-100 text-emerald-600 mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                          <IconComponent className="w-6 h-6" />
                                      </div>
                                      <div className="text-3xl md:text-4xl font-black text-neutral-900 mb-1 tracking-tight group-hover:text-white transition-colors">
                                          {stat.value}
                                      </div>
                                      <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider group-hover:text-white/80 transition-colors">
                                          {stat.name}
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  )}
              </div>

              {/* Image Column */}
              <div className="relative">
                  <div className="relative h-[400px] lg:h-full min-h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
                      {storyImage ? (
                           <Image 
                             src={storyImage} 
                             alt="Yüceer Kereste Tarihçe" 
                             fill 
                             className="object-cover hover:scale-105 transition-transform duration-700"
                           />
                      ) : (
                          <div className="bg-neutral-200 w-full h-full" />
                      )}
                  </div>
                  {/* Floating badge for year */}
                  <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-8 md:p-10 rounded-3xl shadow-2xl z-20 border border-neutral-100 hidden md:block">
                       <div className="text-center">
                           <span className="block text-6xl md:text-7xl font-black text-emerald-600 leading-none tracking-tighter">
                               {new Date().getFullYear() - (data.foundingYear || 1995)}
                           </span>
                           <span className="block text-sm font-bold text-neutral-500 uppercase tracking-widest mt-2">Yıllık Tecrübe</span>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Main Content Section (Full-Width / Centered) */}
      <section className="bg-neutral-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg md:prose-xl prose-neutral max-w-none text-neutral-600 leading-relaxed">
                      {data.history ? (
                          <PortableText value={data.history} components={portableTextComponents} />
                      ) : (
                          <p>İçerik hazırlanıyor...</p>
                      )}
                  </div>
              </div>
          </div>
      </section>

      {/* Mission & Vision (Modern) */}
      <section className="py-24 bg-emerald-50/50">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow border border-emerald-100/50 group">
                      <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-300">
                          <Icons.Target className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-3xl font-black text-neutral-900 mb-6">Misyonumuz</h3>
                      <p className="text-lg text-neutral-600 leading-relaxed">
                          {data.mission || "Müşterilerimize en kaliteli ahşap ürünlerini sunmak."}
                      </p>
                  </div>

                  <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow border border-emerald-100/50 group">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                          <Icons.Eye className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-3xl font-black text-neutral-900 mb-6">Vizyonumuz</h3>
                      <p className="text-lg text-neutral-600 leading-relaxed">
                          {data.vision || "Sektörde öncü ve global bir marka olmak."}
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Certificates */}
      <div className="py-24">
         <CertificatesSection certificates={data.certificates} />
      </div>

       {/* Logistics Network (Modern) */}
       {data.logistics && (
           <section className="relative py-24 overflow-hidden bg-neutral-900">
                {/* Background Image with Overlay */}
               <div className="absolute inset-0 z-0">
                   {data.logistics.image && (
                       <Image 
                           src={data.logistics.image}
                           alt="Lojistik"
                           fill
                           className="object-cover opacity-20"
                       />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />
               </div>

               <div className="container mx-auto px-4 relative z-10">
                   <div className="max-w-2xl">
                       <span className="text-emerald-500 font-bold tracking-widest uppercase mb-4 block">LOJİSTİK AĞIMIZ</span>
                       <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                           {data.logistics.title}
                       </h2>
                       <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                           {data.logistics.description}
                       </p>
                       <div className="flex items-center gap-4 text-white font-medium">
                           <div className="flex -space-x-4">
                               {[1,2,3,4].map(i => (
                                   <div key={i} className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-xs">
                                       <Icons.Truck className="w-6 h-6 text-neutral-500" />
                                   </div>
                               ))}
                           </div>
                           <span>Güvenli ve Hızlı Teslimat</span>
                       </div>
                   </div>
               </div>
           </section>
       )}
    </div>
  )
}
