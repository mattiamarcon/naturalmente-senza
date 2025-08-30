"use client"

import { type Product } from "@/app/components/frontOffice/ProductCard"
import {useQuery } from "@tanstack/react-query"
import { getProduct } from "@/app/action"
import { use } from 'react'

export default  function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {

  const { id } = use(params)

  const { isPending, error, data } = useQuery({
        queryKey: ['getSpecificProduct',id],
        queryFn: () => getProduct(id)
    })


  if(isPending)
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-6 p-6 ">
        {/* Image skeleton */}
          <div className="flex-shrink-0">
            <div className="w-[600px] h-[600px] bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded animate-pulse w-36" />

            {/* Subtitle skeleton */}
            <div className="h-36 bg-gray-200 rounded animate-pulse w-64" />
          </div>
        </div>
      </div>
      
    )

  if (error) return 'Si è verificato un errore imprevisto, riaggiorna la pagina!'

  if(data){
    const {nome,urlImage,descrizione} = data[0] as unknown as Product

    return (

      <>
      <div className="container mx-auto px-4 py-24 font-title">

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="aspect-square md:aspect-square overflow-hidden rounded-lg max-h-80 md:max-h-none">
            <img
              src={urlImage || "/placeholder.svg"}
              alt={nome}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-marrone-scuro">{nome}</h1>

            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {descrizione}
            </p>
          </div>
        </div>
      </div>
    </>
  )
  }
  
}


