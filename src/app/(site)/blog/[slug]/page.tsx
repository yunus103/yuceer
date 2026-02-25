import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { POST_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { CustomPortableText } from '@/components/blog/CustomPortableText'
import { PageHero } from '@/components/ui/PageHero'
import { Calendar, User, ChevronLeft, ArrowRight, Package } from 'lucide-react'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    return {
      title: 'Bulunamadı | Yüceer Kereste',
      description: 'Aradığınız sayfa bulunamadı.',
    }
  }

  // Use explicit SEO object if available, otherwise fallback to standard fields
  const metaTitle = post.seo?.metaTitle || `${post.title} | Blog`
  const metaDescription = post.seo?.metaDescription || post.excerpt || `${post.title} hakkında detaylı bilgi.`

  return {
    title: metaTitle.includes('Yüceer Kereste') ? { absolute: metaTitle } : metaTitle,
    description: metaDescription,
    keywords: post.seo?.keywords || '',
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: post.seo?.ogImage || post.mainImage || '',
        },
      ],
    },
  }
}

// Function to format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, products] = await Promise.all([
    client.fetch(POST_BY_SLUG_QUERY, { slug }),
    client.fetch(ALL_PRODUCTS_QUERY)
  ])

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    image: post.seo?.ogImage || post.mainImage,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Yüceer Kereste',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yüceer Kereste',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yuceerkereste.com/favicon.ico'
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Short PageHero to maintain consistency */}
      <PageHero title="Blog Detayı" />

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Article Content - 2 Columns wide on desktop */}
          <article className="lg:col-span-2">
            {/* Back button */}
            <Link 
              href="/blog" 
              className="inline-flex items-center text-neutral-500 hover:text-emerald-600 font-semibold mb-8 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Tüm Yazılara Dön
            </Link>

            {/* Header Section */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-neutral-500 font-medium">
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                )}
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Main Image */}
            {post.mainImage && (
              <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl mb-12 border border-neutral-100">
                <Image
                  src={post.mainImage}
                  alt={post.mainImageAlt || post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content Section */}
            <div className="bg-neutral-50/50 rounded-[3rem] p-8 md:p-16 border border-neutral-100">
              {post.content ? (
                <CustomPortableText value={post.content} />
              ) : (
                <p className="text-xl text-neutral-600 text-center py-20 font-medium">
                  Bu yazının içeriği henüz eklenmedi.
                </p>
              )}
            </div>
          </article>

          {/* Sidebar - 1 Column wide on desktop */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="space-y-8">
              
              {/* Primary CTA Box */}
              <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3 relative z-10">Ahşap Projeleriniz İçin Yanınızdayız!</h3>
                <p className="text-sm text-emerald-50 mb-6 font-medium relative z-10">
                  İhtiyacınıza özel, endüstriyel kalitede ahşap çözümleri ve rekabetçi tekliflerimiz için uzman ekibimize ulaşın.
                </p>
                <Link 
                  href="/iletisim"
                  className="w-full inline-flex items-center justify-center bg-white text-emerald-700 py-3 px-5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-neutral-50 hover:shadow-lg transition-all duration-300 relative z-10 group"
                >
                  Teklif İsteyin 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Products List Box */}
              {products && products.length > 0 && (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-100 shadow-xl shadow-neutral-200/50">
                  <h3 className="text-xl font-black text-neutral-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                    <Package className="w-6 h-6 text-emerald-600" /> Ürünlerimiz
                  </h3>
                  
                  <div className="space-y-4">
                    {products.map((prod: any) => (
                      <Link 
                        key={prod._id} 
                        href={`/urunler/${prod.slug}`}
                        className="group flex items-center gap-4 bg-neutral-50 p-3 rounded-2xl hover:bg-white hover:shadow-lg border border-transparent hover:border-neutral-100 transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                          {prod.mainImage ? (
                            <Image 
                              src={prod.mainImage}
                              alt={prod.mainImageAlt || prod.title}
                              fill
                              sizes="80px"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-50">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-neutral-900 uppercase tracking-tight text-sm mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                            {prod.title}
                          </h4>
                          {prod.shortDescription && (
                            <p className="text-xs text-neutral-500 font-medium line-clamp-2">
                              {prod.shortDescription}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link 
                    href="/urunler"
                    className="mt-6 w-full inline-flex items-center justify-center bg-neutral-900 text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl transition-all duration-300 group"
                  >
                    Tümünü Gör
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
