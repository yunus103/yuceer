import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { REFERENCES_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Referanslarımız | Yüceer Kereste',
  description: 'Bizi tercih eden ve güvenen iş ortaklarımızdan bazıları.',
}

export default async function ReferencesPage() {
  const references = await client.fetch(REFERENCES_QUERY)

  return (
    <div className="bg-white min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Referanslarımız</h1>
          <p className="text-gray-600 text-lg">
             Bizi tercih eden ve güvenen iş ortaklarımızdan bazıları.
          </p>
        </div>

        {references && references.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
             {references.map((item: any) => (
                <div key={item._id} className="group flex items-center justify-center p-8 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                   <div className="relative w-full h-16 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      {item.logo ? (
                        <Image 
                           src={item.logo}
                           alt={item.companyName || 'Referans'}
                           fill
                           className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <span className="text-gray-400 font-bold uppercase tracking-widest text-xs text-center">{item.companyName}</span>
                        </div>
                      )}
                   </div>
                </div>
             ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400">Henüz referans kaydı bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  )
}
