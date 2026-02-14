import { TreePine, ShieldCheck, HardHat, Ruler } from 'lucide-react'
import ScrollAnimation from '@/components/ui/ScrollAnimation'

const features = [
  {
    icon: TreePine,
    title: 'SÜRDÜRÜLEBİLİR ORMANCILIK',
    description: 'Doğal kaynakları koruyarak gelecek nesillere aktarıyoruz.'
  },
  {
    icon: ShieldCheck,
    title: 'KALİTE KONTROL',
    description: 'Her aşamada titizlikle uygulanan kalite standartları.'
  },
  {
    icon: HardHat,
    title: 'UZMAN EKİP',
    description: 'Alanında deneyimli profesyonellerden oluşan güçlü kadro.'
  },
  {
    icon: Ruler,
    title: 'ÖZEL İŞLEME',
    description: 'Projenize özel ölçü ve ebatlarda hassas üretim.'
  }
]

export default function WhyUs() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">NEDEN BİZ?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">KALİTE VE GÜVENİN ADRESİ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} delay={index * 0.1} className="flex flex-col items-center group">
              <div className="w-16 h-16 mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                <feature.icon strokeWidth={1.5} className="w-full h-full" />
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-900 border-b-2 border-transparent group-hover:border-accent pb-2 transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
