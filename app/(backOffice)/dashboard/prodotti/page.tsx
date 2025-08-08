"use client"
import { getProducts } from "@/app/action"
import { Skeleton } from "@/components/ui/skeleton"
import {useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ImageIcon } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useEffect } from "react"

export default function GestioneProdotti() { 

    const db= createSupabaseClient();

    useEffect(()=>{
      async function retriveData(){
        const {data,error} = await db.from("prodotti").select("*")

        console.log(error) 
        console.log(data)
      }

      retriveData()
    },[])

    const { isPending, error, data } = useQuery({
        queryKey: ['productData'],
        queryFn: () => getProducts(),
    })

    if (isPending){
        return(
            <div className="flex flex-col space-y-3">
                {Array(4).fill(null).map((_, index)=>(
                    <div key={index}>
                    <Skeleton  className="h-[100px] w-[200px] md:h-[250px] md:w-[500px] rounded-xl" />
                        <div className="space-y-2 py-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                ))}
                
            </div>
        )
    }

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
        <Button className="bg-marrone-scuro hover:bg-marrone-principale w-12 h-12 md:w-16 md:h-16 rounded-full absolute right-5 bottom-5 flex justify-center items-center cursor-pointer" onClick={()=>console.log("add product")}>
            <span className="text-white text-2xl md:text-4xl font-bold leading-none">+</span>
        </Button>
        <div className="grid gap-6">
        {data && data.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {product.name}
                    <Badge variant="secondary">ID: {product.id}</Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{product.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Cambia Immagine
                  </Button>
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${product.id}`}>Nome Prodotto</Label>
                      <Input id={`name-${product.id}`} defaultValue={product.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`status-${product.id}`}>Stato</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option>Attivo</option>
                        <option>Inattivo</option>
                        <option>Esaurito</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${product.id}`}>Descrizione</Label>
                    <Textarea id={`description-${product.id}`} defaultValue={product.description} rows={3} />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm">Salva Modifiche</Button>
                    <Button size="sm" variant="outline">
                      Annulla
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </>
    )
}