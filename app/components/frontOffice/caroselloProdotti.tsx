"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import ProductCard, { type Product, type ProductBadge } from "@/app/components/frontOffice/ProductCard"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
  {
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
    title: "Focaccia BIO",
    urlImage: "/focacce.jpg",
    badges: [
      sampleBadges[6], // Ricco di Proteine
      sampleBadges[4], // Biologico
    ],
    description: "Pane nutriente con farine integrali e semi",
  },
]

export default function CaroselloProdotti() {
  const router = useRouter()

  const handleProductClick = (product: Product) => {
    router.push(`/prodotti/${product.id}`)
  }

  return (
    <Carousel className="w-3/4 mx-auto">
      <CarouselContent className="-ml-1">
        {sampleProducts.map((product) => (
          <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Link key={product.id} href={`/prodotti/${product.id}`} className="block h-full">
                <ProductCard key={product.id} product={product} onClick={handleProductClick} />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

