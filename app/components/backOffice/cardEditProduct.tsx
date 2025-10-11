"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {  ImageIcon } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Product } from "@/utils/types"

export default function CardEditProduct({product,refetchData}:{product:Product,refetchData:VoidFunction}){

    const dbClient=createSupabaseClient();
    const timeOutRef=useRef<NodeJS.Timeout | null>(null)

    const [imageToShow,setImageToShow]=useState<string>(product.urlImage)


    const fileInput=useRef<HTMLInputElement>(null)

    const changeNome = async(id: number, value: string) => {

      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(async () => {
        const {error:errorUpdate} = await dbClient.from("products").update({"nome":value}).eq("id",id)
        refetchData()
        if (errorUpdate) {
            toast.error("Qualcosa è andato storto, aggiorna la pagina e riprova!");
        } else {
            toast.success("Nome prodotto aggiornato con successo.");
        }
      }, 2500);
    };

    const changeDescrizione = async(id: number, value: string) => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(async () => {
        const {error:errorUpdate} = await dbClient.from("products").update({"descrizione":value}).eq("id",id)
        refetchData()
        if (errorUpdate) {
            toast.error("Qualcosa è andato storto, aggiorna la pagina e riprova!");
        } else {
            toast.success("Descrizione prodotto aggiornata con successo.");
        }
      }, 2500);
    };

    const changeStatus=async(id:number,value:string)=>{
      if(value==="Attivo"){
        const {error:errorUpdate} = await dbClient.from("products").update({"attivo":true}).eq("id",id)
        refetchData()
        if (errorUpdate) {
            toast.error("Qualcosa è andato storto, aggiorna la pagina e riprova!");
        } else {
            toast.success("Il prodotto è ora visibile.");
        }
      }else{
        const {error:errorUpdate} = await dbClient.from("products").update({"attivo":false}).eq("id",id)
        refetchData()
        if (errorUpdate) {
            toast.error("Qualcosa è andato storto, aggiorna la pagina e riprova!");
        } else {
            toast.success("Il prodotto è ora nascosto.");
        }
      }
        
    }

    const changeImageTrigger=()=>{
      if(fileInput.current)
        fileInput.current.click();
    }

    const inputImage=(id:number)=>async(e: React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files?.[0]

      if(file){
        //aggiungiNuovoFileAlBucket
        const {error:inputError} = await dbClient.storage.from("images").upload(`productImages/${file.name}`,file)
        if(inputError)console.log(inputError)
        //rimuoviVecchioFileDalBucket
        const fileToDeletePath=product.urlImage.split('/storage/v1/object/public/images')[1];   
        console.log(fileToDeletePath)
        const {error:deleteError} = await dbClient.storage.from("images").remove([fileToDeletePath])
        if(deleteError)console.log(deleteError)
        //aggiornaTabellaConNuovoUrlFile
        //ottieniUrlNuovoFile
        const {data:urlFile} = dbClient.storage.from("images").getPublicUrl(`productImages/${file.name}`)
        const {error:errorUpdateTable} = await dbClient.from("products").update({
            "urlImage":urlFile.publicUrl,
        }).eq("id",id)
        if(errorUpdateTable)console.log(errorUpdateTable)
        //CaricaImmagineNellaUIeToast
        setImageToShow(urlFile.publicUrl)  
        toast.success("Immagine aggiornata con successo")    
      }
        
    }

    //nel cambio immagine assicuarsi che il path sia corretto

    const deleteProduct=async(id:number)=>{
      const {data:imageUrl} = await dbClient.from("products").select("urlImage").eq("id",id) 
      
      if(imageUrl){
        console.log(imageUrl[0].urlImage)

       const {data,error} = await dbClient.storage.from("images").remove([`/productImages/${imageUrl[0].urlImage}`])
       console.log(data,error)
      }
        
      const {error:errorDeleteRow}=await dbClient.from("products").delete().eq("id",id)
      if(errorDeleteRow)
        console.log(errorDeleteRow)
       refetchData()
       toast.success("Prodotto eliminato con successo!")
    }

    return(
        <Card className="px-0 py-2 md:p-5 ">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl md:text-4xl">
                    {product.nome}         
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 ">
                <div className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden " >
                    <img
                      src={imageToShow}
                      alt={product.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="lg" className=" bg-transparent cursor-pointer" onClick={()=>changeImageTrigger()}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Cambia Immagine
                  </Button>
                  <Input type="file" name="inputImage" id="inputImage" className="hidden" ref={fileInput} onChange={inputImage(product.id)} /> 
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 ">
                      <Label htmlFor={`name-${product.id}`}>Nome Prodotto</Label>
                      <Input id={`name-${product.id}`} defaultValue={product.nome} onChange={(e)=>changeNome(product.id, e.target.value)} />
                    </div>
                    <div className="space-y-2 ">
                      <Label htmlFor={`status-${product.id}`}>Stato</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" onChange={(e)=>changeStatus(product.id, e.target.value)} defaultValue={product.attivo ? "Attivo" : "Inattivo" }>
                        <option>Attivo</option>
                        <option>Inattivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor={`description-${product.id}`}>Descrizione</Label>
                    <Textarea id={`description-${product.id}`} defaultValue={product.descrizione} rows={5} onChange={(e)=>changeDescrizione(product.id, e.target.value)} />
                  </div>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button size="lg" variant="destructive" className="cursor-pointer hover:bg-red-700">Elimina</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                          <AlertDialogTitle className="md:text-2xl">Questa azione non è annullabile!</AlertDialogTitle>
                          <AlertDialogDescription className="md:text-lg">
                              Stai per eliminare il prodotto: {product.nome}
                          </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                          <AlertDialogAction className="cursor-pointer hover:bg-red-700 bg-red-600" onClick={()=>deleteProduct(product.id)}>Elimina</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
    )
}