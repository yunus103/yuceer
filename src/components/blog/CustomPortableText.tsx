import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'

export const CustomPortableText = ({ value }: { value: any }) => {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }: any) => {
        if (!children || (children?.length === 1 && children[0] === '')) {
          return <p className="mb-6 min-h-[1em]">&nbsp;</p>
        }
        return <p className="mb-6 text-neutral-800 leading-relaxed text-lg">{children}</p>
      },
      h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 mt-12">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 mt-10">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 mt-8">{children}</h3>,
      h4: ({ children }) => <h4 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 mt-6">{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-emerald-600 pl-6 italic text-neutral-600 bg-emerald-50 py-4 px-6 rounded-r-2xl my-8 text-xl">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-neutral-900">{children}</strong>,
      em: ({ children }) => <em className="italic text-neutral-800">{children}</em>,
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noindex nofollow' : undefined}
            className="text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4 font-semibold"
          >
            {children}
          </a>
        )
      },
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-8 mb-6 space-y-2 text-neutral-800 text-lg">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-8 mb-6 space-y-2 text-neutral-800 text-lg">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2">{children}</li>,
      number: ({ children }) => <li className="pl-2">{children}</li>,
    },
    types: {
      image: ({ value }) => {
        if (!value?.url) return null

        const { alt, float } = value
        
        let floatClass = ''
        let wrapperClass = 'my-12'

        if (float === 'left') {
          floatClass = 'md:float-left md:mr-8 md:mb-4 md:w-1/2 lg:w-1/3'
          wrapperClass = 'my-4'
        } else if (float === 'right') {
          floatClass = 'md:float-right md:ml-8 md:mb-4 md:w-1/2 lg:w-1/3'
          wrapperClass = 'my-4'
        }

        return (
          <div className={cn('relative rounded-3xl overflow-hidden shadow-xl border border-neutral-100', wrapperClass, floatClass)}>
            <Image
              src={value.url}
              alt={alt || 'Blog Görseli'}
              width={800} // Approximate width for normal usage
              height={600} // Approximate height
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        )
      },
    },
  }

  return (
    <div className="prose prose-lg md:prose-xl max-w-none text-neutral-900 clear-both">
      <PortableText value={value} components={components} />
    </div>
  )
}
