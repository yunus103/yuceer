import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">YÜCEER KERESTE</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Yılların verdiği tecrübe ile inşaatlık ve dekoratif kereste ihtiyaçlarınızda yanınızdayız. Kalite ve güvenin adresi.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Anasayfa</Link></li>
              <li><Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/hizmetler" className="text-gray-400 hover:text-white transition-colors">Hizmetler</Link></li>
              <li><Link href="/referanslar" className="text-gray-400 hover:text-white transition-colors">Referanslar</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-lg font-bold mb-4">Ürünlerimiz</h4>
            <ul className="space-y-2">
              <li><Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">İnşaatlık Kereste</Link></li>
              <li><Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">Dekoratif Ahşap</Link></li>
              <li><Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">Palet Kerestesi</Link></li>
              <li><Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">OSB & Kontrplak</Link></li>
              <li><Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">Tüm Ürünler</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400">Keresteciler Sitesi, No: 123, Ostim, Ankara, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">+90 312 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">info@yuceerkereste.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Yüceer Kereste. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
