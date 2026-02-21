interface TechnicalSpec {
  label: string
  value: string
}

interface ProductSpecsProps {
  specs: TechnicalSpec[]
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="mt-8 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-bold uppercase tracking-widest text-xs">
          <tr>
            <th className="px-6 py-4">Teknik Özellik</th>
            <th className="px-6 py-4">Detay / Değer</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, index) => (
            <tr key={index} className="bg-white border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-neutral-800 w-1/3">{spec.label}</td>
              <td className="px-6 py-4 text-neutral-600 font-medium">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

