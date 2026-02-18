import { Suspense } from 'react'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Package, Info } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

export const metadata = {
  title: 'Ürünlerimiz | Yüceer Kereste',
  description: 'İnşaatlık keresteden dekoratif ürünlere, geniş ürün yelpazemizle projeleriniz için en kaliteli çözümleri sunuyoruz.',
}

export default async function ProductsPage() {
  let products: any[] = []

  try {
    products = await client.fetch(ALL_PRODUCTS_QUERY)
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted pt-32 px-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
          <Info className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h1>
          <p className="text-gray-600 mb-6">Ürünler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
          <Link href="/" className="text-primary hover:underline font-medium">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Ürünlerimiz" />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products.map((product: any) => (
                  <ProductCard
                    key={product._id}
                    id={product.slug}
                    title={product.title}
                    category={product.category} // Keeping prop but it might be undefined/null now
                    woodType={product.woodType} // Keeping prop but it might be undefined/null now
                    image={product.mainImage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/50 rounded-2xl border border-gray-100">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto px-4">
                  Şu anda listelenecek ürün bulunmamaktadır.
                </p>
              </div>
            )}
      </div>
    </div>
  )
}
