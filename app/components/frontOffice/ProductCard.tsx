"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export interface ProductBadge {
  id: string
  label: string
  icon?: string
}

export interface Product {
  id: string
  title: string
  urlImage: string
  badges: ProductBadge[]
  description?: string
}

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const { title, urlImage, badges } = product

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-500 font-title w-full mx-auto border-0 shadow-md hover:-translate-y-1 h-full flex flex-col"
      onClick={() => onClick?.(product)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={urlImage || "/placeholder.svg"}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-bold text-xl md:text-2xl text-marrone-scuro group-hover:text-marrone-principale transition-colors duration-300 text-center leading-tight">
            {title}
          </h3>

          {/* Badges eleganti */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-marrone-principale/10 to-marrone-scuro/10 text-marrone-scuro border border-marrone-principale/20 hover:border-marrone-principale/40 transition-all duration-300"
                >
                  {badge.icon && <span className="mr-1">{badge.icon}</span>}
                  {badge.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
