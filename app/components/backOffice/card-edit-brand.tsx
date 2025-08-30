"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import type React from "react"
import { useRef, useState } from "react"
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

interface Brand {
  id: number
  nome: string
  urlImage: string
}

export default function CardEditBrand({ brand, refetchData }: { brand: Brand; refetchData: VoidFunction }) {
  const dbClient = createSupabaseClient()
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)

  const [imageToShow, setImageToShow] = useState<string>(brand.urlImage)

  const fileInput = useRef<HTMLInputElement>(null)

  const changeNome = async (id: number, value: string) => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    timeOutRef.current = setTimeout(async () => {
      const { error: errorUpdate } = await dbClient.from("marchi").update({ nome: value }).eq("id", id)
      refetchData()
      if (errorUpdate) {
        toast.error("Qualcosa è andato storto, aggiorna la pagina e riprova!")
      } else {
        toast.success("Nome marchio aggiornato con successo.")
      }
    }, 2500)
  }

  const changeImageTrigger = () => {
    if (fileInput.current) fileInput.current.click()
  }

  const inputImage = (id: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const { error: inputError } = await dbClient.storage.from("images").upload(`brandImages/${file.name}`, file)
      if (inputError) console.log(inputError)

      const fileToDeletePath = brand.urlImage.split("/storage/v1/object/public/images/")[1]
      console.log(fileToDeletePath)
      const { error: deleteError } = await dbClient.storage.from("images").remove([fileToDeletePath])
      if (deleteError) console.log(deleteError)

      const { data: urlFile } = dbClient.storage.from("images").getPublicUrl(`brandImages/${file.name}`)
      const { error: errorUpdateTable } = await dbClient
        .from("marchi")
        .update({
          urlImage: urlFile.publicUrl,
        })
        .eq("id", id)
      if (errorUpdateTable) console.log(errorUpdateTable)

      setImageToShow(urlFile.publicUrl)
      toast.success("Immagine aggiornata con successo")
    }
  }

  const deleteBrand = async (id: number) => {
    const { data: imageUrl } = await dbClient.from("marchi").select("urlImage").eq("id", id)

    if (imageUrl) {
      console.log(imageUrl[0].urlImage)

      const { data, error } = await dbClient.storage.from("images").remove([`/brandImages/${imageUrl[0].urlImage}`])
      console.log(data, error)
    }

    const { error: errorDeleteRow } = await dbClient.from("marchi").delete().eq("id", id)
    if (errorDeleteRow) console.log(errorDeleteRow)
    refetchData()
    toast.success("Marchio eliminato con successo!")
  }

  return (
    <Card className="p-5 ">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl md:text-4xl">{brand.nome}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 ">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden " >
                    <img
                      src={imageToShow}
                      alt={brand.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
            <Button
              variant="outline"
              size="lg"
              className=" bg-transparent cursor-pointer"
              onClick={() => changeImageTrigger()}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Cambia Immagine
            </Button>
            <Input
              type="file"
              name="inputImage"
              id="inputImage"
              className="hidden"
              ref={fileInput}
              onChange={inputImage(brand.id)}
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2 ">
              <Label htmlFor={`name-${brand.id}`}>Nome Marchio</Label>
              <Input
                id={`name-${brand.id}`}
                defaultValue={brand.nome}
                onChange={(e) => changeNome(brand.id, e.target.value)}
              />
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="destructive" className="cursor-pointer hover:bg-red-700">
                  Elimina
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="md:text-2xl">Questa azione non è annullabile!</AlertDialogTitle>
                  <AlertDialogDescription className="md:text-lg">
                    Stai per eliminare il marchio: {brand.nome}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Annulla</AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer hover:bg-red-700 bg-red-600"
                    onClick={() => deleteBrand(brand.id)}
                  >
                    Elimina
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
