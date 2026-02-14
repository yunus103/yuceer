import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">Biz Kimiz?</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Yüceer Kereste</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
             Köklü geçmişimizden aldığımız güçle, geleceğin yapılarını inşa ediyoruz.
          </p>
        </div>

        {/* Content Section 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
           <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                 src="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=2068"
                 alt="Kereste Fabrikası"
                 fill
                 className="object-cover"
              />
           </div>
           <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tarihçemiz</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                 1995 yılında kurulan Yüceer Kereste, küçük bir atölye olarak başladığı yolculuğuna bugün sektörün öncü firmalarından biri olarak devam etmektedir. 
                 Kurulduğumuz günden bu yana değişmeyen tek şey, kaliteye olan tutkumuz ve müşterilerimize duyduğumuz saygıdır.
              </p>
              <p className="text-gray-600 leading-relaxed">
                 Ankara Ostim Keresteciler Sitesi'nde bulunan tesisimizde, yerli ve ithal tomrukları en yeni teknolojilerle işliyor, 
                 inşaat ve mobilya sektörünün ihtiyaçlarına uygun kereste haline getiriyoruz.
              </p>
           </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
           <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                 Müşterilerimize en kaliteli ahşap ürünlerini, en uygun fiyat ve zamanında teslimat garantisi ile sunmak. 
                 Sürdürülebilir ormancılık ilkelerine bağlı kalarak, doğal kaynakları verimli kullanmak ve ekonomiye değer katmak.
              </p>
           </div>
           <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                 Türkiye'nin lider orman ürünleri tedarikçisi olmak ve markamızı uluslararası pazarda temsil etmek. 
                 Yenilikçi üretim teknikleri ile sektördeki standartları belirleyen firma olmak.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
