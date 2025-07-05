"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X, Upload } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Prodotto } from "@/types/database"
import { useToast } from "@/hooks/use-toast"

const caratteristicheDisponibili = [
  "Proteico",
  "No Zucchero",
  "No Farina",
  "Vegano",
  "Vegetariano",
  "Senza Glutine",
  "Bio",
  "Keto",
  "Low Carb",
  "Senza Lattosio",
  "Crudo",
  "Superfood",
]

const formSchema = z.object({
  titolo: z.string().min(1, "Il titolo è obbligatorio"),
  descrizione: z.string().min(1, "La descrizione è obbligatoria"),
  immagine_url: z.string().optional(),
  caratteristiche: z.array(z.string()),
  attivo: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

interface ProdottoDialogProps {
  open: boolean
  onClose: () => void
  prodotto?: Prodotto | null
}

export function ProdottoDialog({ open, onClose, prodotto }: ProdottoDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [selectedCaratteristiche, setSelectedCaratteristiche] = useState<string[]>([])
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titolo: "",
      descrizione: "",
      immagine_url: "",
      caratteristiche: [],
      attivo: true,
    },
  })

  useEffect(() => {
    if (prodotto) {
      form.reset({
        titolo: prodotto.titolo,
        descrizione: prodotto.descrizione,
        immagine_url: prodotto.immagine_url || "",
        caratteristiche: prodotto.caratteristiche,
        attivo: prodotto.attivo,
      })
      setSelectedCaratteristiche(prodotto.caratteristiche)
    } else {
      form.reset({
        titolo: "",
        descrizione: "",
        immagine_url: "",
        caratteristiche: [],
        attivo: true,
      })
      setSelectedCaratteristiche([])
    }
  }, [prodotto, form])

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)

      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `prodotti/${fileName}`

      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("images").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Errore upload:", error)
      toast({
        title: "Errore",
        description: "Errore durante l'upload dell'immagine",
        variant: "destructive",
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = await uploadImage(file)
    if (imageUrl) {
      form.setValue("immagine_url", imageUrl)
    }
  }

  const toggleCaratteristica = (caratteristica: string) => {
    const newCaratteristiche = selectedCaratteristiche.includes(caratteristica)
      ? selectedCaratteristiche.filter((c) => c !== caratteristica)
      : [...selectedCaratteristiche, caratteristica]

    setSelectedCaratteristiche(newCaratteristiche)
    form.setValue("caratteristiche", newCaratteristiche)
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (prodotto) {
        // Aggiorna prodotto esistente
        const { error } = await supabase
          .from("prodotti")
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq("id", prodotto.id)

        if (error) throw error

        toast({
          title: "Successo",
          description: "Prodotto aggiornato con successo",
        })
      } else {
        // Crea nuovo prodotto
        const { error } = await supabase.from("prodotti").insert([data])

        if (error) throw error

        toast({
          title: "Successo",
          description: "Prodotto creato con successo",
        })
      }

      onClose()
    } catch (error) {
      console.error("Errore nel salvataggio:", error)
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio del prodotto",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{prodotto ? "Modifica Prodotto" : "Nuovo Prodotto"}</DialogTitle>
          <DialogDescription>
            {prodotto ? "Modifica i dettagli del prodotto esistente" : "Aggiungi un nuovo prodotto al catalogo"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="titolo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titolo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome del prodotto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descrizione"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrizione dettagliata del prodotto" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="immagine_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Immagine</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                        <Button type="button" variant="outline" disabled={uploading} className="gap-2 bg-transparent">
                          <Upload className="h-4 w-4" />
                          {uploading ? "Caricamento..." : "Carica"}
                        </Button>
                      </div>
                      {field.value && (
                        <div className="relative inline-block">
                          <img
                            src={field.value || "/placeholder.svg"}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => form.setValue("immagine_url", "")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caratteristiche"
              render={() => (
                <FormItem>
                  <FormLabel>Caratteristiche</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {caratteristicheDisponibili.map((caratteristica) => (
                          <Badge
                            key={caratteristica}
                            variant={selectedCaratteristiche.includes(caratteristica) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleCaratteristica(caratteristica)}
                          >
                            {caratteristica}
                          </Badge>
                        ))}
                      </div>
                      {selectedCaratteristiche.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Caratteristiche selezionate:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedCaratteristiche.map((caratteristica) => (
                              <Badge key={caratteristica} variant="secondary">
                                {caratteristica}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1 hover:bg-transparent"
                                  onClick={() => toggleCaratteristica(caratteristica)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attivo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Prodotto Attivo</FormLabel>
                    <div className="text-sm text-muted-foreground">Il prodotto sarà visibile nel catalogo pubblico</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annulla
              </Button>
              <Button type="submit">{prodotto ? "Aggiorna" : "Crea"} Prodotto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
