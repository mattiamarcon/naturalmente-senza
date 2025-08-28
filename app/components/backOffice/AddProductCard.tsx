"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {  ImageIcon } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import React, { useEffect, useRef, useState } from "react"
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
import {ProductWithoutId } from "@/utils/types"
import { addProduct } from "@/app/action"

function AddProductCard({closeDialog,refetchData}:{closeDialog:VoidFunction,refetchData:VoidFunction}) {

    const [product,setProduct]=useState<ProductWithoutId>({
        nome:"",
        urlImage:"",
        descrizione:"",
        attivo:true,
    });

    const dbClient=createSupabaseClient();
    const fileInput=useRef<HTMLInputElement>(null)
    const [imageToShow, setImageToShow] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const changeImageTrigger=()=>{
        if(fileInput.current){
            fileInput.current.click();
        }     
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageToShow(file);
            // Crea un URL per il file selezionato
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);
    
    const inputImage=async()=>{
        const file=fileInput.current?.files?.[0]

        if(file){
            //aggiungiNuovoFileAlBucket
            const {error:inputError} = await dbClient.storage.from("images").upload(`productImages/${file.name}`,file)
            if(inputError)console.log(inputError)
            const {data:urlFile} = dbClient.storage.from("images").getPublicUrl(`productImages/${file.name}`)
            return urlFile   
        }

        return "noFile"
        
    }

    async function addProductFunction(){
        if(product.nome!=="" && product.descrizione!==""){
            const string=await inputImage()
            if(string==="noFile"){
                toast.error("Inserisci un immagine per completare tutte le operazioni")
            }else{
                const updatedProduct = { ...product, urlImage: string.publicUrl };
                setProduct(updatedProduct);
                await addProduct(updatedProduct)
                toast.success("Inserimento prodotto avvenuto con successo")
                closeDialog()
                refetchData();
            }
        }else{
            toast.error("Assicurati di aver compilato tutti i campi prima di inserire il prodotto")
        }
    }

  return (
    <Card className="p-5 ">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl md:text-4xl">
                    {product.nome && product.nome}         
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 ">
                <div className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden " >
                    <img
                      src={imageUrl }
                      alt={product.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="lg" className=" bg-transparent cursor-pointer" onClick={()=>changeImageTrigger()}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {imageToShow? "Cambia Immagine" : "Inserisci immagine"}
                  </Button>
                  <Input type="file" name="inputImage" id="inputImage" className="hidden" ref={fileInput} onChange={handleImageChange} /> 
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 ">
                      <Label htmlFor={`name-${product.nome}`}>Nome Prodotto</Label>
                      <Input id={`name-${product.nome}`} defaultValue={product.nome} onChange={(e)=>setProduct({...product,nome:e.target.value})} /> 
                    </div>
                    <div className="space-y-2 ">
                      <Label htmlFor={`status-${product.nome}`}>Stato</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" onChange={(e)=>setProduct({...product, attivo:(e.target.value==="Attivo" ? true : false)})} defaultValue={product.attivo ? "Attivo" : "Inattivo" }>
                        <option>Attivo</option>
                        <option>Inattivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor={`description-${product.nome}`}>Descrizione</Label>
                    <Textarea id={`description-${product.nome}`} defaultValue={product.descrizione} rows={3} onChange={(e)=>setProduct({...product,descrizione:e.target.value})} />
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">

                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="lg" className="cursor-pointer bg-marrone-scuro hover:bg-marrone-principale">Conferma</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle className="md:text-2xl">Inserimento prodotto</AlertDialogTitle>
                            <AlertDialogDescription className="md:text-lg">
                                Stai per creare il prodotto: {product.nome}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogAction className="cursor-pointer bg-marrone-scuro hover:bg-marrone-principale" onClick={addProductFunction}>Inserisci prodotto</AlertDialogAction>
                            <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="lg" variant="destructive" className="cursor-pointer hover:bg-red-700">Annulla</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle className="md:text-2xl">Questa azione non è annullabile!</AlertDialogTitle>
                            <AlertDialogDescription className="md:text-lg">
                                Stai per annullare la creazione del prodotto: {product.nome}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer hover:bg-red-700 bg-red-600" onClick={closeDialog}>Elimina</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </div>
                    
                </div>
              </div>
            </CardContent>
          </Card>
  )
}

export default AddProductCard