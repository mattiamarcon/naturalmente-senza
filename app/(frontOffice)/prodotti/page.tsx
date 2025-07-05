"use client"

import { useState, useMemo } from "react"
import ProductCard, { type Product, type ProductBadge } from "@/app/components/frontOffice/ProductCard"
import CollapsibleFilters from "@/app/components/frontOffice/collapsible-filters"
import { Search } from "lucide-react"
import Footer from "@/app/components/frontOffice/Footer"
import { useRouter } from "next/navigation"

// Badge con icone per un look più elegante
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
    title: "Cereali",
    urlImage: "/cereali.jpg",
    badges: [
      sampleBadges[1], // Senza Zucchero
      sampleBadges[0], // Senza Glutine
      sampleBadges[5], // Low Carb
      sampleBadges[7], // Senza Farina
    ],
    description: "Brownies intensi al cioccolato, senza zuccheri aggiunti",
  },
  {
    id: "6",
    title: "Madeleine",
    urlImage: "/madeleine.jpg",
    badges: [
      sampleBadges[0], // Senza Glutine
      sampleBadges[3], // Vegano
      sampleBadges[4], // Biologico
    ],
    description: "Crackers croccanti di riso, perfetti per ogni momento",
  },
]

export default function ProdottiPage() {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

    const router=useRouter();

  // Filtra i prodotti in base ai badge selezionati e al termine di ricerca
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      // Filtro per badge
      const matchesBadges =
        selectedBadges.length === 0 ||
        selectedBadges.every((badgeId) => product.badges.some((badge) => badge.id === badgeId))

      // Filtro per ricerca
      const matchesSearch = searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesBadges && matchesSearch
    })
  }, [selectedBadges, searchTerm])

  const handleBadgeToggle = (badgeId: string) => {
    setSelectedBadges((prev) => (prev.includes(badgeId) ? prev.filter((id) => id !== badgeId) : [...prev, badgeId]))
  }

  const handleClearFilters = () => {
    setSelectedBadges([])
    setSearchTerm("")
  }


  
    const handleProductClick = (product: Product) => {
      router.push(`/prodotti/${product.id}`)
    }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br bg-gray-100">
      {/* Filtri collassabili */}
      <CollapsibleFilters
        availableBadges={sampleBadges}
        selectedBadges={selectedBadges}
        onBadgeToggle={handleBadgeToggle}
        onClearFilters={handleClearFilters}
        productCount={filteredProducts.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="container mx-auto px-4 py-24">
        {/* Header elegante */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-marrone-scuro mb-6 tracking-tight">I Nostri Prodotti</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-marrone-principale to-marrone-scuro mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Scopri la nostra selezione di prodotti artigianali, preparati con passione e ingredienti di qualità
            superiore
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={handleProductClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-300 mb-6">
                <Search className="w-24 h-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Nessun prodotto trovato</h3>
              <p className="text-gray-500 mb-8 text-lg">Prova a modificare i filtri o il termine di ricerca</p>
              <button
                onClick={handleClearFilters}
                className="bg-marrone-principale hover:bg-marrone-scuro text-white font-medium px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Rimuovi tutti i filtri
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

