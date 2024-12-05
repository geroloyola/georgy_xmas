import { Bookmark } from 'lucide-react'

const coupons = [
  // Columna 1: Besos
  [
    { title: '10 Besos', color: '#fff0f0', textColor: '#8b0000', borderColor: '#ffcccb', note: "cualquier"},
    { title: '30 Besos', color: '#ffd1dc', textColor: '#8b0000', borderColor: '#ff69b4', note: "cualquier"},
    { title: '50 Besos', color: '#ff9aa2', textColor: '#8b0000', borderColor: '#ff0000', note: "cualquier"},
  ],
  [
    { title: 'Cine', color: '#e6f2ff', textColor: '#00008b', borderColor: '#add8e6', note: "cualquier"},
    { title: 'Cine', color: '#b3e0ff', textColor: '#00008b', borderColor: '#4169e1', note: "cualquier"},
    { title: 'Cine', color: '#80ccff', textColor: '#00008b', borderColor: '#000080', note: "cualquier"},
  ],
  [
    { title: 'Sushi casero', color: '#f0fff0', textColor: '#006400', borderColor: '#98fb98', note: "cualquier"},
    { title: 'Sushi casero', color: '#d0ffd0', textColor: '#006400', borderColor: '#3cb371', note: "cualquier"},
    { title: 'Vikingos', color: '#b0ffb0', textColor: '#006400', borderColor: '#228b22', note: "cualquier"},
  ],
  [
    { title: '1 Tarea', color: '#fff0ff', textColor: '#8b008b', borderColor: '#dda0dd', note: "cualquier"},
    { title: '1 Tarea', color: '#ffd0ff', textColor: '#8b008b', borderColor: '#ba55d3', note: "cualquier"},
    { title: '1 Tarea', color: '#ffb0ff', textColor: '#8b008b', borderColor: '#8b008b', note: "cualquier"},
  ],
  [
    { title: 'Ir a Aca', color: '#fffff0', textColor: '#8b8000', borderColor: '#f0e68c', note: "algún"},
    { title: 'Ir a Tepoz', color: '#ffffd0', textColor: '#8b8000', borderColor: '#daa520', note: "algún"},
    { title: 'Ir a Japón', color: '#ffffb0', textColor: '#8b8000', borderColor: '#8b8000', note: "algún"},
  ],
 
]

export default function CuponesGrid() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 ivory-print p-8">
      <div className="grid grid-cols-5 gap-4 print:gap-2">
        {coupons.map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {column.map((coupon, rowIndex) => (
              <div 
                key={rowIndex} 
                className="p-1 border-4 rounded-lg shadow-md overflow-hidden"
                style={{ backgroundColor: coupon.color, borderColor: coupon.borderColor }}
              >
                <div className="relative text-center p-3 border-2 border-dashed" style={{ borderColor: coupon.borderColor }}>
                  <div className="mb-2">
                    <Bookmark className="inline-block" style={{ color: coupon.textColor }} size={24} />
                  </div>
                  <h2 className="text-lg font-bold font-serif mb-2" style={{ color: coupon.textColor }}>Cupón</h2>
                  <p className="text-sm font-serif mb-2" style={{ color: coupon.textColor }}>Válido por</p>
                  <p className="text-xl font-bold font-serif mb-2" style={{ color: coupon.textColor }}>{coupon.title}</p>
                  <div className="w-3/4 mx-auto border-t-2 my-2" style={{ borderColor: coupon.borderColor }}></div>
                  <p className="text-xs font-serif mt-2" style={{ color: coupon.textColor }}>Canjeable en {coupon.note} momento</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

