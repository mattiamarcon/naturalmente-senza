import React from 'react'
import Link from 'next/link'
import ProductCard, { type Product, type ProductBadge } from "@/app/components/frontOffice/ProductCard"
import { useRouter } from 'next/navigation'

const sampleBadges: ProductBadge[] = [
  { id: "gluten-free", label: "Senza Glutine", icon: "🌾" },
  { id: "sugar-free", label: "Senza Zucchero", icon: "🚫" },
  { id: "dairy-free", label: "Senza Lattosio", icon: "🥛" },
  { id: "vegan", label: "Vegano", icon: "🌱" },
  { id: "organic", label: "Biologico", icon: "🍃" },
  { id: "low-carb", label: "Low Carb", icon: "⚡" },
  { id: "protein-rich", label: "Ricco di Proteine", icon: "💪" },
  { id: "no-flour", label: "Senza Farina", icon: "🌾" },
]

const sampleProducts: Product[] = [
   {
    id: "1",
    title: "Gnocchi di patate di riso",
    urlImage: "/gnocchi.jpg",
    badges: [
      sampleBadges[0], // Senza Glutine
      sampleBadges[4], // Biologico
      sampleBadges[7], // Senza Farina
    ],
    description: "Deliziosi biscotti preparati con avena biologica e cioccolato fondente",
  },
  {
    id: "2",
    title: "Canestrelli",
    urlImage: "/canestrelli.jpg",
    badges: [
      sampleBadges[1], // Senza Zucchero
      sampleBadges[6], // Ricco di Proteine
      sampleBadges[5], // Low Carb
    ],
    description: "Torta soffice e nutriente, perfetta per gli sportivi",
  },
  {
    id: "3",
    title: "American Pancakes",
    urlImage: "/pancake.jpg",
    badges: [
      sampleBadges[3], // Vegano
      sampleBadges[2], // Senza Lattosio
      sampleBadges[4], // Biologico
    ],
    description: "Muffin soffici con mirtilli freschi, completamente vegani",
  },
  {
    id: "4",
    title: "Focaccia BIO",
    urlImage: "/focacce.jpg",
    badges: [
      sampleBadges[6], // Ricco di Proteine
      sampleBadges[4], // Biologico
    ],
    description: "Pane nutriente con farine integrali e semi",
  },
]

import CarouselDemo from './caroselloProdotti'


export default function TopProduct() {

  const router=useRouter();

  const handleProductClick = (product: Product) => {
    router.push(`/prodotti/${product.id}`)
  }

  return (
    <div className='bg-marrone-scuro/80'>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-title text-crema  font-bold text-center mb-8">Prodotti di tendenza</h1>

      <CarouselDemo />
    </div>
    </div>
  )
}
