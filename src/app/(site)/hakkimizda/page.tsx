import Image from 'next/image'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, Users, Award, Truck, Factory, ArrowRight, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hakkımızda | Yüceer Kereste',
  description: '1995\'ten beri kaliteli kereste ve orman ürünleri tedarikçisi. Ostim Ankara\'da hizmetinizdeyiz.',
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => {
      // If the block is empty (just an Enter key in Sanity), render a spacer
      if (!children || (children.length === 1 && children[0] === '')) {
        return <p className="mb-6 min-h-[1.5em]">&nbsp;</p>
      }
      return <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
    },
    h1: ({ children }: any) => <h1 className="text-4xl font-bold text-gray-900 mb-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-gray-900 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-gray-900 mb-4">{children}</h3>,
  },
}

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_PAGE_QUERY);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
          <Info className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">İçerik Hazırlanıyor</h1>
          <p className="text-gray-600 mb-6">Hakkımızda sayfası içeriği şu an güncellenmektedir. Lütfen daha sonra tekrar deneyiniz.</p>
          <Link href="/">
            <Button>Anasayfaya Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  const storyImage = data.historyImage || data.heroImage
  const storyHeading = data.historyHeading || "Hikayemiz"
  const storyQuote = data.historyQuote || "Doğadan aldığımızı sanata dönüştürüyoruz."
  const logisticsImage = data.logistics?.image

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-dark-bg">
           {data.heroImage && (
             <Image 
               src={data.heroImage}
               alt={data.title || "Hakkımızda"}
               fill
               className="object-cover brightness-50"
               priority
             />
           )}
        </div>
        <div className="container mx-auto relative z-10 px-4 text-center mt-16 md:mt-0">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 border border-white/20">
            {data.foundingYear ? `${data.foundingYear}'den Beri` : 'Kurumsal'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            {data.title || "Hakkımızda"}
          </h1>
          {data.introduction && (
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed px-2">
              {data.introduction}
            </p>
          )}
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="relative mt-1 z-20 -mt-8 md:-mt-16 container mx-auto px-4 mb-16 md:mb-24">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
           <div className="flex flex-col items-center text-center p-2">
              <Calendar className="w-8 h-8 text-primary mb-4 opacity-80" />
              <span className="text-3xl md:text-4xl font-bold text-gray-900 block mb-1">
                 {data.foundingYear || "1995"}
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Kuruluş Yılı</span>
           </div>
           
           <div className="flex flex-col items-center text-center p-2 pt-6 sm:pt-2">
              <Factory className="w-8 h-8 text-primary mb-4 opacity-80" />
              <span className="text-3xl md:text-4xl font-bold text-gray-900 block mb-1">
                 {data.stats?.totalArea?.toLocaleString() || "5000"} <span className="text-xl">m²</span>
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Üretim Alanı</span>
           </div>

           <div className="flex flex-col items-center text-center p-2 pt-6 sm:pt-2">
              <Truck className="w-8 h-8 text-primary mb-4 opacity-80" />
              <span className="text-3xl md:text-4xl font-bold text-gray-900 block mb-1">
                 {data.stats?.dailyProduction || "100"} <span className="text-xl">m³</span>
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Günlük Kapasite</span>
           </div>

           <div className="flex flex-col items-center text-center p-2 pt-6 sm:pt-2">
              <Users className="w-8 h-8 text-primary mb-4 opacity-80" />
              <span className="text-3xl md:text-4xl font-bold text-gray-900 block mb-1">
                 {new Date().getFullYear() - (data.foundingYear || 1995)}
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Yıllık Tecrübe</span>
           </div>
        </div>
      </section>

      {/* 3. History & Story */}
      <section className="container mx-auto my-auto px-4 mb-16 md:mb-24">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
           <div className="relative">
              <div>
                 <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block text-center lg:text-left">HİKAYEMİZ</span>
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight text-center lg:text-left">
                    {storyHeading}
                 </h2>
                 <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                    {storyImage ? (
                      <Image 
                        src={storyImage} 
                        alt={storyHeading} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white pr-4">
                        <p className="font-serif italic text-xl md:text-2xl">"{storyQuote}"</p>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <div className="border-l-4 border-primary/30 pl-6 md:pl-8">
                {data.history ? (
                   <div>
                     <PortableText value={data.history} components={portableTextComponents} />
                   </div>
                ) : (
                  <div className="space-y-6">
                     <p className="text-gray-700 leading-relaxed text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                       1995 yılında Ankara Ostim'de küçük bir atölye olarak başladığımız yolculuğumuzda, bugün Türkiye'nin dört bir yanına hizmet veren köklü bir kereste tedarikçisi olmanın gururunu yaşıyoruz.
                     </p>
                     <p className="text-gray-600 leading-relaxed text-lg">
                       Kurulduğumuz ilk günden itibaren değişmeyen tek prensibimiz &quot;Dürüst Ticaret ve Kaliteli Ürün&quot; olmuştur. Kereste sektöründeki teknolojik gelişmeleri yakından takip ederek makine parkurumuzu sürekli yeniledik ve üretim kapasitemizi artırdık.
                     </p>
                     <blockquote className="border-l-4 border-accent/40 pl-4 py-2 my-6 italic text-gray-500 text-base">
                       Kalite bizim için bir standart değil, bir yaşam biçimidir.
                     </blockquote>
                     <p className="text-gray-600 leading-relaxed text-lg">
                       İnşaatlık keresteden mobilyalık ağaçlara, lambri ve döşeme tahtalarından özel ölçü siparişlere kadar geniş bir ürün yelpazesi ile müşterilerimizin ihtiyaçlarına profesyonel çözümler sunuyoruz.
                     </p>
                  </div>
                )}
              </div>
           </div>
        </div>
      </section>


      {/* 4. Mission & Vision Cards */}
      <section className="bg-gray-50 py-16 md:py-24 mb-16 md:mb-24">
         <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                     <Award className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                     {data.mission || "Müşterilerimize en kaliteli ahşap ürünlerini, en uygun fiyat ve zamanında teslimat garantisi ile sunmak. Sürdürülebilir ormancılık ilkelerine bağlı kalarak, doğal kaynakları verimli kullanmak."}
                  </p>
               </div>

               <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                     <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                     {data.vision || "Türkiye'nin lider orman ürünleri tedarikçisi olmak ve markamızı uluslararası pazarda temsil etmek. Yenilikçi üretim teknikleri ile sektördeki standartları belirleyen öncü firma olmak."}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Certificates Section */}
      <section className="container mx-auto px-4 mb-16 md:mb-24 text-center">
         <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">KALİTE BELGELERİMİZ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
               Uluslararası Standartlarda Üretim
            </h2>
            <p className="text-gray-600 text-lg">
               Üretim süreçlerimiz ve ürün kalitemiz, uluslararası geçerliliğe sahip sertifikalarla tescillenmiştir.
            </p>
         </div>

         {data.certificates && data.certificates.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
               {data.certificates.map((cert: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center gap-4 group">
                     <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center p-4 bg-white rounded-full shadow-lg border border-gray-100 group-hover:-translate-y-2 transition-transform duration-300">
                        {cert.url && (
                           <Image 
                              src={cert.url}
                              alt={cert.title || "Sertifika"}
                              fill
                              className="object-contain p-6"
                           />
                        )}
                     </div>
                     <span className="text-sm font-bold text-gray-500 group-hover:text-primary transition-colors">
                        {cert.title}
                     </span>
                  </div>
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center opacity-40">
               <div className="flex flex-col items-center"><div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4"></div><span>FSC Belgesi</span></div>
               <div className="flex flex-col items-center"><div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4"></div><span>ISO 9001</span></div>
               <div className="flex flex-col items-center"><div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4"></div><span>CE Belgesi</span></div>
               <div className="flex flex-col items-center"><div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4"></div><span>OHSAS 18001</span></div>
            </div>
         )}
      </section>

      {/* 6. Logistics Banner */}
      <section className="bg-dark-bg text-white py-16 md:py-20 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20">
            {logisticsImage ? (
              <Image 
                src={logisticsImage}
                alt="Lojistik"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-dark-bg" />
            )}
         </div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-2xl text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6 text-accent">
                     <Truck className="w-8 h-8 md:w-10 md:h-10" />
                     <span className="font-bold tracking-widest uppercase">LOJİSTİK AĞIMIZ</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                     {data.logistics?.title || "Türkiye'nin Her Yerine Güvenli Teslimat"}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                     {data.logistics?.description || "Geniş nakliye ağımız ve güçlü lojistik altyapımız ile siparişlerinizi Türkiye'nin 81 iline, şantiyenize veya deponuza kadar eksiksiz ve tam zamanında ulaştırıyoruz."}
                  </p>
                  <Button size="lg" className="bg-accent hover:bg-accent-hover text-white border-none rounded-full px-8 w-full md:w-auto">
                     Teslimat Detayları
                  </Button>
               </div>
               
               <div className="hidden md:block">
                  <div className="w-64 h-64 border-4 border-white/10 rounded-full flex items-center justify-center relative">
                     <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin-slow" />
                     <div className="text-center">
                        <span className="block text-5xl font-bold text-white mb-2">81</span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest">İle Sevkiyat</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
