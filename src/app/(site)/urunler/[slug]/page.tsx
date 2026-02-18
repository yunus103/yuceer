import { Button } from '@/components/ui/Button'
import ProductGallery from '@/components/products/ProductGallery'
import ProductSpecs from '@/components/products/ProductSpecs'
import { Phone, CheckCircle, Info, ArrowLeft, Package, TreePine, Tag } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => {
      if (!children || (children.length === 1 && children[0] === '')) {
        return <p className="mb-4 min-h-[1.5em]">&nbsp;</p>
      }
      return <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
    },
    h1: ({ children }: any) => <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-gray-900 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-gray-900 mb-3">{children}</h3>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-600">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-600">{children}</ol>,
  },
}

function getPlainText(blocks: any): string {
  if (!blocks) return ''
  if (typeof blocks === 'string') return blocks
  if (Array.isArray(blocks)) {
    return blocks
      .map((block: any) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        return ''
      })
      .join(' ')
      .substring(0, 160)
  }
  return ''
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    if (!product) return { title: 'Ürün Bulunamadı | Yüceer Kereste' }

    return {
      title: `${product.title} | Yüceer Kereste`,
      description: getPlainText(product.description) || `${product.title} hakkında detaylı bilgi.`,
    }
  } catch {
    return { title: 'Ürün | Yüceer Kereste' }
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product: any = null;
  try {
    product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted pt-32 px-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
          <Info className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h1>
          <p className="text-gray-600 mb-6">Ürün bilgileri yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
          <Link href="/urunler">
            <Button className="gap-2"><ArrowLeft className="w-4 h-4" /> Ürünlere Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const allImages = [product.mainImage, ...(product.gallery || [])].filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {/* Light gradient header */}
      <div className="relative pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted to-white" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb / Back link */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <Link href="/urunler" className="hover:text-primary transition-colors">Ürünler</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium line-clamp-1">{product.title}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.category && (
              <Link href={`/urunler?category=${product.categorySlug || ''}`}>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors cursor-pointer border border-primary/15">
                  <Tag className="w-3 h-3" />
                  {product.category}
                </span>
              </Link>
            )}
            {product.woodType && (
              <Link href={`/urunler?woodType=${product.woodTypeSlug || ''}`}>
                <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent/20 transition-colors cursor-pointer border border-accent/15">
                  <TreePine className="w-3 h-3" />
                  {product.woodType}
                </span>
              </Link>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            {product.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-10 lg:p-12 -mt-2">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left: Gallery */}
            <div>
              {allImages.length > 0 ? (
                <ProductGallery images={allImages} title={product.title} />
              ) : (
                <div className="h-[300px] md:h-[400px] bg-muted rounded-2xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                  <Package className="w-16 h-16 mb-4 opacity-50" />
                  <span className="text-sm font-medium">Resim bulunmamaktadır</span>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              {/* Description */}
              {product.description ? (
                <div className="prose prose-gray max-w-none mb-8">
                  <PortableText value={product.description} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-gray-400 italic mb-8 flex items-center gap-2 bg-muted p-4 rounded-xl">
                  <Info className="w-4 h-4 shrink-0" /> Ürün açıklaması henüz eklenmemiştir.
                </p>
              )}

              {/* Stock & Delivery */}
              <div className="flex flex-col gap-3 p-5 sm:p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/10 mb-6 md:mb-8">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" /> Stok Durumu: <span className="text-primary">Stokta Var</span>
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Hızlı teslimat imkanı ile şantiyenize kadar sevk ediyoruz. Toptan alımlar için özel fiyat teklifi alınız.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
                <Link href="/iletisim" className="flex-1">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary-dark text-white py-5 sm:py-6 text-sm sm:text-base rounded-xl">
                    Fiyat Teklifi Al
                  </Button>
                </Link>
                <a href="tel:+903123540000" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full py-5 sm:py-6 text-sm sm:text-base gap-2 text-gray-800 border-gray-200 hover:bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Hemen Ara
                  </Button>
                </a>
              </div>

              {/* Technical Specs */}
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
