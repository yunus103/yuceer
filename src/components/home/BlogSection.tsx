import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChevronRight } from 'lucide-react'

// Function to format the date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

interface BlogSectionProps {
  posts: any[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-24 border-t border-neutral-100/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">BLOG & HABERLER</span>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
              Sektörden Son Gelişmeler
            </h2>
          </div>
          
          <Link 
            href="/blog"
            className="group flex flex-col items-center justify-center bg-white border border-emerald-100 hover:border-emerald-500 rounded-3xl p-4 md:p-6 w-32 h-32 md:w-36 md:h-36 shrink-0 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 block! cursor-pointer self-start"
          >
            <div className="bg-emerald-50 group-hover:bg-emerald-600 rounded-2xl w-12 h-12 flex items-center justify-center mb-3 transition-colors duration-300">
               <ChevronRight className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors uppercase tracking-wider text-center">
              Tümünü Gör
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article 
              key={post._id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-neutral-100 group flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[450px]"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                {post.mainImage ? (
                  <Image
                    src={post.mainImage}
                    alt={post.mainImageAlt || post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="bg-neutral-200 w-full h-full flex items-center justify-center">
                    <span className="text-neutral-400 font-medium">Görsel Yok</span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-neutral-900 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-neutral-900 mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-neutral-600 mb-6 line-clamp-2 leading-relaxed flex-1 text-sm md:text-base">
                  {post.excerpt || 'Bu yazı için henüz bir özet girilmemiştir.'}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-emerald-600 font-bold tracking-wide group/link mt-auto uppercase text-sm"
                >
                  <span className="relative">
                    Devamını Oku
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover/link:w-full transition-all duration-300" />
                  </span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
