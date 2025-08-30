"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import ProductCard, { type Product } from "@/app/components/frontOffice/ProductCard"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {useQuery } from "@tanstack/react-query"
import { getActiveProducts } from "@/app/action"
import { Skeleton } from "@/components/ui/skeleton"

export default function CaroselloProdotti() {
  const router = useRouter()

  const { isPending, error, data } = useQuery({
        queryKey: ['activeProductData'],
        queryFn: () => getActiveProducts(),
  })

  const handleProductClick = (product: Product) => {
    console.log(product.id,product.nome)
    router.push(`/prodotti/${product.id}`)
  }

  if (isPending){
        return(
          <div className="w-full flex flex-row justify-evenly">
              {Array(3).fill(null).map((_, index)=>(
                  <div key={index}>
                    <Skeleton  className="h-[400px] w-[300px] rounded-xl" />
                  </div>
              ))}
          </div>
        )
    }

    if (error) return 'Si è verificato un errore imprevisto, riaggiorna la pagina!'


  if(data){
    return (
      <Carousel className="w-3/4 mx-auto">
        <CarouselContent className="-ml-1">
          {data.map((product) => (
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
  
}

