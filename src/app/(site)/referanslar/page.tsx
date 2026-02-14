import Image from 'next/image'

export default function ReferencesPage() {
  return (
    <div className="bg-white min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Referanslarımız</h1>
          <p className="text-gray-600 text-lg">
             Bizi tercih eden ve güvenen iş ortaklarımızdan bazıları.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
           {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center justify-center p-8 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
                 <div className="relative w-full h-16 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <Image 
                       src={`https://via.placeholder.com/150x50/e5e7eb/9ca3af?text=LOGO+${i + 1}`}
                       alt={`Referans ${i + 1}`}
                       fill
                       className="object-contain"
                       unoptimized
                    />
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  )
}
