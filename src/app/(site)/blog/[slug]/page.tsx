import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { CustomPortableText } from '@/components/blog/CustomPortableText'
import { PageHero } from '@/components/ui/PageHero'
import { Calendar, User, ChevronLeft } from 'lucide-react'

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
  const metaTitle = post.seo?.metaTitle || `${post.title} | Blog | Yüceer Kereste`
  const metaDescription = post.seo?.metaDescription || post.excerpt || `${post.title} hakkında detaylı bilgi.`

  return {
    title: metaTitle,
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
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Short PageHero to maintain consistency */}
      <PageHero title="Blog Detayı" />

      <article className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
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
          <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl mb-16 border border-neutral-100">
            <Image
              src={post.mainImage}
              alt={post.mainImageAlt || post.title}
              fill
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
    </div>
  )
}
