import { Button } from '@/components/ui/Button'
import ProductGallery from '@/components/products/ProductGallery'
import ProductSpecs from '@/components/products/ProductSpecs'
import { Phone, CheckCircle, Info, ArrowLeft, Package, TreePine, Tag, Ruler, ShieldCheck, Factory, Box } from 'lucide-react'
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
      return <p className="mb-4 text-neutral-600 leading-relaxed font-medium">{children}</p>
    },
    h1: ({ children }: any) => <h1 className="text-3xl font-black text-neutral-900 mb-6 uppercase tracking-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-black text-neutral-900 mb-4 uppercase tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-neutral-900 mb-3">{children}</h3>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-neutral-900">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-600 font-medium">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-600 font-medium">{children}</ol>,
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

    const title = product.seo?.metaTitle || product.title
    const description = product.seo?.metaDescription || product.shortDescription || getPlainText(product.description)
    const keywords = product.seo?.keywords

    return {
      title: `${title} | Yüceer Kereste`,
      description: description?.substring(0, 160),
      keywords: keywords,
      openGraph: {
        title: title,
        description: description?.substring(0, 160),
        images: product.seo?.ogImage ? [{ url: product.seo.ogImage }] : product.mainImage ? [{ url: product.mainImage }] : [],
      }
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
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-32 px-4">
        <div className="text-center p-12 bg-white rounded-[3rem] shadow-xl max-w-md mx-auto border border-neutral-100">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tight">Bir Hata Oluştu</h1>
          <p className="text-neutral-500 mb-8 font-medium">Ürün bilgileri yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
          <Link href="/urunler">
            <Button className="w-full py-6 rounded-2xl bg-emerald-600 text-white font-bold uppercase tracking-widest gap-2">
              <ArrowLeft className="w-4 h-4" /> Ürünlere Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const allImages = [
    { url: product.mainImage, alt: product.mainImageAlt },
    ...(product.gallery || [])
  ].filter(img => img.url)

  return (
    <div className="min-h-screen bg-neutral-50">
      
      {/* Top 2-Column Hero Area */}
      <div className="pt-32 pb-16 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Gallery */}
            <div className="w-full">
              {allImages.length > 0 ? (
                <div className="rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-sm">
                  <ProductGallery images={allImages} title={product.title} />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-neutral-50 rounded-[2.5rem] flex flex-col items-center justify-center text-neutral-300 border border-neutral-100 shadow-sm">
                  <Package className="w-20 h-20 mb-4 opacity-50" />
                  <span className="font-bold text-sm tracking-widest uppercase">Görsel Bulunamadı</span>
                </div>
              )}
            </div>

            {/* Right Column: Key Info, Badges, CTA */}
            <div className="flex flex-col h-full pt-4">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 mb-6 uppercase tracking-widest">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Anasayfa</Link>
                <span className="text-neutral-300">/</span>
                <Link href="/urunler" className="hover:text-emerald-600 transition-colors">Ürünler</Link>
                <span className="text-neutral-300">/</span>
                <span className="text-emerald-600 line-clamp-1">{product.title}</span>
              </div>

              {/* Title & Short Desc */}
              <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-6 uppercase tracking-tighter leading-none">
                {product.title}
              </h1>
              
              <div className="mb-8">
                {product.shortDescription ? (
                  <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                    {product.shortDescription}
                  </p>
                ) : (
                  <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                    Yüksek dayanımlı, uluslararası standartlara uygun bir şekilde üretilmiş endüstriyel sınıf ürün.
                  </p>
                )}
              </div>

              {/* 3 Highlighted Technical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-center hover:bg-neutral-100 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Dayanıklılık</span>
                  <span className="text-sm font-bold text-neutral-800 mt-1">Sınıf 1 Kalite</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-center hover:bg-neutral-100 transition-colors">
                  <Tag className="w-6 h-6 text-emerald-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Kategori</span>
                  <span className="text-sm font-bold text-neutral-800 mt-1">{product.category || 'Endüstriyel'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-center hover:bg-neutral-100 transition-colors col-span-2 sm:col-span-1">
                  <Ruler className="w-6 h-6 text-emerald-600 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Üretim</span>
                  <span className="text-sm font-bold text-neutral-800 mt-1">Özel Ölçü</span>
                </div>
              </div>

              {/* Strong CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-auto">
                <Link href="/iletisim" className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-16 rounded-[1.2rem] font-black uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.5)] transition-all">
                    Teklif İste
                  </Button>
                </Link>
                <a href="tel:+903123540000" className="flex-1">
                  <Button variant="outline" className="w-full h-16 rounded-[1.2rem] border-2 border-neutral-200 text-neutral-900 font-black uppercase tracking-widest hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all gap-2">
                    <Phone className="w-5 h-5" /> WhatsApp Aç
                  </Button>
                </a>
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest text-center sm:text-left mt-2 flex items-center justify-center sm:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Üreti̇m ve Sevki̇yat Süreleri̇ İçi̇n İleti̇şi̇me Geçi̇n
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Sections (Description, Specs, Areas) */}
      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
        
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description Block */}
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm">
              <h2 className="text-2xl font-black text-neutral-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                <Info className="w-6 h-6 text-emerald-600" /> Ürün Açıklaması
              </h2>
              {product.description ? (
                <div className="prose prose-neutral max-w-none">
                  <PortableText value={product.description} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-neutral-500 font-medium">Detaylı ürün açıklaması hazırlanmaktadır.</p>
              )}
            </section>

            {/* Technical Specifications */}
            {product.specs && product.specs.length > 0 && (
              <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm">
                <h2 className="text-2xl font-black text-neutral-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                  <Package className="w-6 h-6 text-emerald-600" /> Teknik Özellikler
                </h2>
                <ProductSpecs specs={product.specs} />
              </section>
            )}
          </div>

          {/* Sidebar (Usage Areas, Certs) */}
          <div className="space-y-8">
            
            <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
              <h3 className="text-lg font-black text-neutral-900 mb-6 uppercase tracking-tight flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-600" /> Kullanım Alanları
              </h3>
              <ul className="space-y-4">
                {['İnşaat ve Kalıp Sistemleri', 'Endüstriyel Depolama', 'Lojistik ve Sevkiyat', 'Ağır Sanayi Ambalajlama'].map((area, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-neutral-700 font-medium text-sm">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900 p-8 rounded-[2rem] shadow-lg text-white">
              <h3 className="text-lg font-black mb-6 uppercase tracking-tight flex items-center gap-2 text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Sertifikalar
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="bg-emerald-500 p-2 rounded-lg text-white">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">ISPM-15</div>
                    <div className="text-xs text-neutral-400 mt-1 font-medium">Uluslararası Isıl İşlem</div>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="bg-neutral-700 p-2 rounded-lg text-white">
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">ISO 9001</div>
                    <div className="text-xs text-neutral-400 mt-1 font-medium">Kalite Yönetim Sistemi</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-white py-24 border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 relative text-center max-w-2xl">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
            Diğer <span className="text-emerald-600">Çözümlerimizi</span> Keşfedin
          </h2>
          <p className="text-neutral-500 text-lg mb-10 font-medium leading-relaxed">
            Projeleriniz için ihtiyacınız olan tüm ahşap ürün gruplarını kapsamlı kataloğumuzda inceleyin.
          </p>
          <Link href="/urunler">
            <Button className="h-16 px-12 rounded-[1.2rem] bg-neutral-900 text-white font-black uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Tüm Ürün Kataloğu
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}

