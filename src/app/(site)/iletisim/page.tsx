import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-muted min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">İletişim</h1>
          <p className="text-gray-600 text-lg">
             Bize her türlü soru ve talebiniz için ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Info Cards */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-2">Adres</h3>
                 <p className="text-gray-600">
                    Keresteciler Sitesi<br />
                    1234. Sokak, No: 56<br />
                    Ostim / Ankara
                 </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Phone className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-2">Telefon & Email</h3>
                 <p className="text-gray-600 space-y-1">
                    <a href="tel:+903123456789" className="block hover:text-primary">+90 312 345 67 89</a>
                    <a href="mailto:info@yuceerkereste.com" className="block hover:text-primary">info@yuceerkereste.com</a>
                 </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Clock className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-2">Çalışma Saatleri</h3>
                 <p className="text-gray-600">
                    Pazartesi - Cuma: 08:30 - 18:00<br />
                    Cumartesi: 09:00 - 14:00<br />
                    Pazar: Kapalı
                 </p>
              </div>
           </div>

           {/* Form and Map */}
           <div className="lg:col-span-2 space-y-8">
              {/* Form */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                 <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
                 <form className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="font-medium text-gray-700">Adınız Soyadınız</label>
                       <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ad Soyad" />
                    </div>
                    <div className="space-y-2">
                       <label className="font-medium text-gray-700">Telefon Numaranız</label>
                       <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0555 123 45 67" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="font-medium text-gray-700">E-posta Adresiniz</label>
                       <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="ornek@email.com" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="font-medium text-gray-700">Mesajınız</label>
                       <textarea className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-40 resize-none" placeholder="Talebiniz veya sorunuz..." />
                    </div>
                    <div className="md:col-span-2">
                       <Button size="lg" className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-base">Mesajı Gönder</Button>
                    </div>
                 </form>
              </div>

              {/* Map Canvas */}
              <div className="bg-gray-200 w-full h-80 rounded-xl overflow-hidden">
                 {/* Google Map Embed */}
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.2078635836!2d32.62268156107446!3d39.90355566373752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
