import { Suspense } from 'react'
import ProductFilter from '@/components/products/ProductFilter'
import ProductCard from '@/components/products/ProductCard'

// Mock Data
const allProducts = [
  { id: 1, title: 'İnşaatlık Kereste (Sarıçam)', category: 'insaatlik', woodType: 'cam', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=2039' },
  { id: 2, title: 'İnşaatlık Kereste (Ladin)', category: 'insaatlik', woodType: 'ladin', image: 'https://images.unsplash.com/photo-1545622616-24eb22442654?q=80&w=2070' },
  { id: 3, title: 'Silinmiş Çam Kereste', category: 'dekoratif', woodType: 'cam', image: 'https://images.unsplash.com/photo-1621379963694-8260da30fae3?q=80&w=2070' },
  { id: 4, title: 'Meşe Masif Panel', category: 'dekoratif', woodType: 'mese', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070' },
  { id: 5, title: 'OSB-3 Levha 11mm', category: 'osb', woodType: '', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070' },
  { id: 6, title: 'Kavak Kontrplak', category: 'osb', woodType: 'kavak', image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2070' },
  { id: 7, title: 'Euro Palet', category: 'palet', woodType: 'cam', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=2070' },
  { id: 8, title: 'Çam Lambiri Extra', category: 'lambiri', woodType: 'cam', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000' },
]

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; woodType?: string }>
}) {
  const { category: categoryFilter, woodType: woodTypeFilter } = await searchParams;

  const filteredProducts = allProducts.filter((product) => {
    if (categoryFilter && product.category !== categoryFilter) return false
    if (woodTypeFilter && product.woodType !== woodTypeFilter) return false
    return true
  })

  return (
    <div className="bg-gray-50 min-h-screen py-32"> {/* Increased padding-top for fixed navbar */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ürünlerimiz</h1>
          <p className="text-gray-600 max-w-2xl">
            İnşaatlık keresteden dekoratif ürünlere, geniş ürün yelpazemizle projeleriniz için en kaliteli çözümleri sunuyoruz.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filter */}
           <div className="lg:w-1/4">
             <Suspense>
               <ProductFilter />
             </Suspense>
           </div>

           {/* Product Grid */}
           <div className="lg:w-3/4">
              {filteredProducts.length > 0 ? (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                       <ProductCard
                          key={product.id}
                          id={product.id}
                          title={product.title}
                          category={product.category.toUpperCase()} // Display purpose
                          woodType={product.woodType.toUpperCase()}
                          image={product.image}
                       />
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h3>
                    <p className="text-gray-500">Seçtiğiniz kriterlere uygun ürün bulunmamaktadır.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
