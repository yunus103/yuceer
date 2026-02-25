import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { Calendar, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ahşap sektörü, kereste çeşitleri ve inşaat malzemeleri hakkında güncel yazılar ve ipuçları.',
}

// Function to format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

export default async function BlogPage() {
  const posts = await client.fetch(ALL_POSTS_QUERY)

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHero title="Blog" subtitle='Kereste fiyatları, palet ölçüleri, inşaatlık kereste ve ahşap ürünlere dair güncel piyasa analizleri, teknik rehberler ve sektörel bilgiler.'/>

      <section className="container mx-auto px-4 py-16 md:py-24">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article 
                key={post._id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-neutral-100 group flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={post.mainImage}
                      alt={post.mainImageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="bg-neutral-200 w-full h-full flex items-center justify-center">
                      <span className="text-neutral-400">Görsel Yok</span>
                    </div>
                  )}
                  {post.publishedAt && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-neutral-900 font-semibold text-sm flex items-center gap-2 shadow-sm">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt || 'Bu yazı için henüz bir özet girilmemiştir.'}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-emerald-600 font-semibold group/link mt-auto"
                  >
                    <span className="relative">
                      Devamını Oku
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <ChevronRight className="w-5 h-5 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-neutral-100">
            <p className="text-2xl font-semibold text-neutral-600">Henüz blog yazısı bulunmamaktadır.</p>
            <p className="text-neutral-500 mt-2">Lütfen daha sonra tekrar ziyaret edin.</p>
          </div>
        )}
      </section>
    </div>
  )
}
