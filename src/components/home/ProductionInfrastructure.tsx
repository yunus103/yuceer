import { Factory, Maximize, TrendingUp, Settings2 } from 'lucide-react'

export default function ProductionInfrastructure() {
  const features = [
    {
      value: "7.500 m²",
      title: "Kapalı Alan",
      description: "İmalat süreçleri, kapalı üretim alanında kontrollü ve sistemli şekilde yürütülmektedir.",
      icon: <Factory className="w-7 h-7 text-emerald-600 mb-3" />
    },
    {
      value: "32.581 m²",
      title: "Toplam Arsa",
      description: "Geniş yerleşim planı, üretim, stok ve sevkiyat operasyonlarının düzenli ilerlemesini sağlar.",
      icon: <Maximize className="w-7 h-7 text-emerald-600 mb-3" />
    },
    {
      value: "25.000 m³",
      title: "Tomruk Sahası",
      description: "Yüksek stok kapasitesi sayesinde hammadde sürekliliği güvence altındadır.",
      icon: <TrendingUp className="w-7 h-7 text-emerald-600 mb-3" />
    },
    {
      value: "Planlı",
      title: "Makine Parkuru",
      description: "Kesim, ölçülendirme ve işleme aşamaları modern ekipmanlarla gerçekleştirilir.",
      icon: <Settings2 className="w-7 h-7 text-emerald-600 mb-3" />
    }
  ]

  return (
    <section className="py-24 bg-white border-t border-b border-neutral-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Text Column */}
          <div className="lg:w-1/3 relative lg:sticky lg:top-24 z-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-emerald-600 rounded-full" />
              <span className="text-emerald-700 font-bold tracking-[0.2em] uppercase text-[11px]">Güçlü Kapasite</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tighter leading-tight">
              Üretim <br /><span className="text-emerald-600">Altyapımız</span>
            </h2>
            
            <p className="text-neutral-600 text-lg leading-relaxed font-medium">
              Süleyman Demirel Organize Sanayi Bölgesi’nde konumlanan tesisimiz, geniş üretim ve stok alanı ile yüksek hacimli siparişlere uygun altyapıya sahiptir. Planlı üretim ve güçlü stok yönetimi sayesinde süreklilik sağlanmaktadır.
            </p>
          </div>

          {/* Right Cards Column (2x2 Grid) */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="bg-neutral-50 p-8 rounded-[2rem] border border-neutral-100 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] hover:border-emerald-100 transition-all duration-300 group"
                >
                  {feature.icon}
                  <div className="mb-2">
                    <span className="text-3xl font-black text-neutral-900 tracking-tighter block mb-1 group-hover:text-emerald-700 transition-colors">
                      {feature.value}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-500 uppercase tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-neutral-500 font-medium leading-relaxed mt-3 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  )
}
