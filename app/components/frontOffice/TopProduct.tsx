

import CaroselloProdotti from './caroselloProdotti'


export default function TopProduct() {

  return (
    <div className='bg-marrone-scuro/80'>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-title text-crema  font-bold text-center mb-8">Ultime novità</h1>

      <CaroselloProdotti />
    </div>
    </div>
  )
}
