"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
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
import { addBrand } from "@/app/action"

function AddBrandCard({ closeDialog, refetchData }: { closeDialog: VoidFunction; refetchData: VoidFunction }) {
  const [brand, setBrand] = useState({
    nome: "",
    urlImage: "",
  })

  const dbClient = createSupabaseClient()
  const fileInput = useRef<HTMLInputElement>(null)
  const [imageToShow, setImageToShow] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>("")

  const changeImageTrigger = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageToShow(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  async function inputImage() {
    const file = fileInput.current?.files?.[0]

    if (file) {
      const { error: inputError } = await dbClient.storage.from("images").upload(`brandImages/${file.name}`, file)
      if (inputError) console.log(inputError)
      const { data: urlFile } = dbClient.storage.from("images").getPublicUrl(`brandImages/${file.name}`)
      return urlFile
    }

    return "noFile"
  }

  async function addBrandFunction() {
    if (brand.nome !== "") {
      const string = await inputImage()
      if (string === "noFile") {
        toast.error("Inserisci un immagine per completare tutte le operazioni")
      } else {
        const updatedBrand = { ...brand, urlImage: string.publicUrl }
        setBrand(updatedBrand)
        try {
          await addBrand(updatedBrand)
          toast.success("Inserimento marchio avvenuto con successo")
          closeDialog()
          refetchData()
        } catch (error) {
          toast.error("Errore durante l'inserimento del marchio")
          console.error(error)
        }
      }
    } else {
      toast.error("Assicurati di aver inserito il nome del marchio")
    }
  }

  return (
    <Card className="p-5 ">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl md:text-4xl">{brand.nome && brand.nome}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 ">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden ">
              <img src={imageUrl || "/placeholder.svg"} alt={brand.nome} className="w-full h-full object-cover" />
            </div>
            <Button
              variant="outline"
              size="lg"
              className=" bg-transparent cursor-pointer"
              onClick={() => changeImageTrigger()}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              {imageToShow ? "Cambia Immagine" : "Inserisci immagine"}
            </Button>
            <Input
              type="file"
              name="inputImage"
              id="inputImage"
              className="hidden"
              ref={fileInput}
              onChange={handleImageChange}
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2 ">
              <Label htmlFor={`name-${brand.nome}`}>Nome Marchio</Label>
              <Input
                id={`name-${brand.nome}`}
                defaultValue={brand.nome}
                onChange={(e) => setBrand({ ...brand, nome: e.target.value })}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="cursor-pointer bg-marrone-scuro hover:bg-marrone-principale">
                    Conferma
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="md:text-2xl">Inserimento marchio</AlertDialogTitle>
                    <AlertDialogDescription className="md:text-lg">
                      Stai per creare il marchio: {brand.nome}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      className="cursor-pointer bg-marrone-scuro hover:bg-marrone-principale"
                      onClick={addBrandFunction}
                    >
                      Inserisci marchio
                    </AlertDialogAction>
                    <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" variant="destructive" className="cursor-pointer hover:bg-red-700">
                    Annulla
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="md:text-2xl">Questa azione non è annullabile!</AlertDialogTitle>
                    <AlertDialogDescription className="md:text-lg">
                      Stai per annullare la creazione del marchio: {brand.nome}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer hover:bg-red-700 bg-red-600" onClick={closeDialog}>
                      Elimina
                    </AlertDialogAction>
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

export default AddBrandCard
