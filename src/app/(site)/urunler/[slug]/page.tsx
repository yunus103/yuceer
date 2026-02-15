import { Button } from '@/components/ui/Button'
import ProductGallery from '@/components/products/ProductGallery'
import ProductSpecs from '@/components/products/ProductSpecs'
import { Phone, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
  
  if (!product) return { title: 'Ürün Bulunamadı' }

  return {
    title: `${product.title} | Yüceer Kereste`,
    description: product.description?.substring(0, 160) || `${product.title} hakkında detaylı bilgi.`,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })

  if (!product) {
    notFound()
  }

  // Combine main image and gallery for the gallery component
  const allImages = [product.mainImage, ...(product.gallery || [])].filter(Boolean)

  return (
    <div className="bg-muted min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-12">
           <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Gallery */}
              <div>
                 {allImages.length > 0 ? (
                   <ProductGallery images={allImages} title={product.title} />
                 ) : (
                   <div className="h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                      Resim bulunmamaktadır.
                   </div>
                 )}
              </div>

              {/* Right: Info */}
              <div>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {product.category && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                         {product.category}
                      </span>
                    )}
                    {product.woodType && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                         {product.woodType}
                      </span>
                    )}
                 </div>
                 
                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">{product.title}</h1>
                 
                 {product.description ? (
                   <div className="prose prose-gray max-w-none text-gray-600 mb-8 whitespace-pre-line leading-relaxed">
                      {product.description}
                   </div>
                 ) : (
                   <p className="text-gray-400 italic mb-8 flex items-center gap-2">
                     <Info className="w-4 h-4" /> Ürün açıklaması henüz eklenmemiştir.
                   </p>
                 )}

                 <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-primary" /> Stok Durumu: Stokta Var
                    </h3>
                    <p className="text-sm text-gray-500">
                       Hızlı teslimat imkanı ile şantiyenize kadar sevk ediyoruz. Toptan alımlar için özel fiyat teklifi alınız.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/iletisim" className="flex-1">
                       <Button size="lg" className="w-full bg-primary hover:bg-primary-dark text-white py-6 text-lg">
                          Fiyat Teklifi Al
                       </Button>
                    </Link>
                    <a href="tel:+903123540000" className="flex-1">
                       <Button size="lg" variant="outline" className="w-full py-6 text-lg gap-2 text-gray-800 border-gray-300 hover:bg-gray-50">
                          <Phone className="w-5 h-5" /> Hemen Ara
                       </Button>
                    </a>
                 </div>

                 {product.specs && product.specs.length > 0 && (
                   <ProductSpecs specs={product.specs} />
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
