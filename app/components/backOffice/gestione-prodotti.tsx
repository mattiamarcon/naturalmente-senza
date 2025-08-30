"use client"
import { getProducts } from "@/app/action"
import { Skeleton } from "@/components/ui/skeleton"
import {useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import CardEditProduct from "@/app/components/backOffice/cardEditProduct"
import AddProductCard from "@/app/components/backOffice/AddProductCard"

export default function GestioneProdotti() { 


  const [refetchData,setRefetchData]=useState(false)
  const [addedProduct,setAddedProduct]=useState(false)

  const { isPending, error, data,refetch } = useQuery({
      queryKey: ['productData'],
      queryFn: () => getProducts(),
  })

    useEffect(()=>{
      refetch()
    },[refetchData])

    function addProduct(){
      setAddedProduct(true)
    }

    function closeDialog(){
      setAddedProduct(false)
    }

    if (isPending){
        return(
          <div className="flex flex-col space-y-3">
              {Array(4).fill(null).map((_, index)=>(
                  <div key={index}>
                  <Skeleton  className="h-[250px] md:h-[450px] w-full rounded-xl" />
                      <div className="space-y-2 py-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                      </div>
                  </div>
              ))}
          </div>
        )
    }

    if (error) return 'Si è verificato un errore imprevisto, riaggiorna la pagina!'

    return (
        <>
        <Button className="bg-marrone-scuro hover:bg-marrone-principale w-12 h-12 md:w-16 md:h-16 rounded-full fixed bottom-6 right-6 z-50 flex justify-center items-center cursor-pointer" onClick={addProduct}>
            <span className="text-white text-3xl md:text-4xl">+</span>
        </Button>
        <div className="grid gap-6">
          {addedProduct && <AddProductCard closeDialog={closeDialog} refetchData={()=>setRefetchData(!refetchData)} />}
          {data && data.map((product) => (
            <CardEditProduct key={product.id} product={product} refetchData={()=>setRefetchData(!refetchData)} />
          ))}
      </div>
      </>
    )
}