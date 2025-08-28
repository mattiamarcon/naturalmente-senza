"use client"

import { Card, CardContent } from "@/components/ui/card"

export interface Product {
  id: string
  nome: string
  urlImage: string
  descrizione?: string
}

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const { nome, urlImage } = product

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-500 font-title w-full mx-auto border-0 shadow-md hover:-translate-y-1 h-full flex flex-col"
      onClick={() => onClick?.(product)}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden rounded-t-lg flex-shrink-0">
          <img
            src={urlImage}
            alt={nome}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-1 md:p-3 space-y-4 flex flex-col flex-grow">
          {/* Titolo con altezza fissa */}
          <div className="min-h-[4rem] flex items-center justify-center">
            <h3 className="font-bold text-3xl md:text-4xl text-marrone-scuro group-hover:text-marrone-principale transition-colors duration-300 text-center leading-tight">
              {nome}
            </h3>
          </div>

          
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
