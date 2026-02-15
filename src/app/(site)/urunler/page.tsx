import { Suspense } from 'react'
import ProductFilter from '@/components/products/ProductFilter'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Ürünlerimiz | Yüceer Kereste',
  description: 'İnşaatlık keresteden dekoratif ürünlere, geniş ürün yelpazemizle projeleriniz için en kaliteli çözümleri sunuyoruz.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; woodType?: string }>
}) {
  const { category: categoryFilter, woodType: woodTypeFilter } = await searchParams;
  const products = await client.fetch(ALL_PRODUCTS_QUERY);

  // Filter products based on category and woodType from URL
  const filteredProducts = products.filter((product: any) => {
    // Note: We compare against slugs or titles depending on what ProductFilter provides
    // Typically slugs are safer. Assuming ProductFilter uses slugs.
    if (categoryFilter && product.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false
    if (woodTypeFilter && product.woodType?.toLowerCase() !== woodTypeFilter.toLowerCase()) return false
    return true
  })

  return (
    <div className="bg-muted min-h-screen py-32">
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
                    {filteredProducts.map((product: any) => (
                       <ProductCard
                          key={product._id}
                          id={product.slug}
                          title={product.title}
                          category={product.category}
                          woodType={product.woodType}
                          image={product.mainImage}
                       />
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h3>
                    <p className="text-gray-500">Seçtiğimiz kriterlere uygun ürün bulunmamaktadır.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
