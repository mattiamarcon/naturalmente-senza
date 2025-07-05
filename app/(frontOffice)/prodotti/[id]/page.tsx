"use client"

import Image from "next/image"
import { useState,useEffect } from "react"
import Footer from "@/app/components/frontOffice/Footer"
import { ProductBadge, type Product } from "@/app/components/frontOffice/ProductCard"

interface ProductPageProps {
    id:string,
    title: string
    image:string
    descrizione:string
}

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

const products = [
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

export default  function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {

  const [id,setId]=useState<number | null >(null);
  const [loading,setLoading]=useState(true);
  const [selectedProduct,setSelectedProduct]=useState<Product>();

  useEffect(()=>{
    async function getIdParam(){
        const {id} = await params;

        setId(id);
        setLoading(false)

        products.forEach(p=>{
          if(p.id==id as unknown as string) //sistemare tutta sta merda
            setSelectedProduct(p);
        })
    }

    getIdParam();

  },[])

  useEffect(()=>{
    if(id!==null){
        console.log(id)
    }
  },[id])



  if(loading)
    return <h1>LOADING...</h1>

  else if(selectedProduct){

  return (

    <>
    <div className="container mx-auto px-4 py-24 font-title">

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
        <div className="aspect-square md:aspect-square overflow-hidden rounded-lg max-h-80 md:max-h-none">
          <Image
            src={selectedProduct.urlImage || "/placeholder.svg"}
            alt={selectedProduct.title}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold">{selectedProduct.title}</h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            DESCRIZIONE:
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus expedita optio unde, doloremque officia ipsa tenetur sed laborum, assumenda obcaecati possimus quidem doloribus alias quia hic voluptates, temporibus ipsam velit.
          </p>

          {selectedProduct.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start">
              {selectedProduct.badges.map((badge) => (
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
      </div>
    </div>
    <Footer />
    </>
  )
}
}