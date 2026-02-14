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
    <div className="mt-8 border rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs">
          <tr>
            <th className="px-6 py-3 border-b">Özellik</th>
            <th className="px-6 py-3 border-b">Değer</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, index) => (
            <tr key={index} className="bg-white border-b last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900 border-r">{spec.label}</td>
              <td className="px-6 py-4 text-gray-600">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
