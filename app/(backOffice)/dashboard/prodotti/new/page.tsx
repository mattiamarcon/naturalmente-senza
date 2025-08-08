import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Aggiungi Nuovo Prodotto</h1>
        <p className="text-muted-foreground mt-2">Inserisci i dettagli del nuovo prodotto</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dettagli Prodotto</CardTitle>
          <CardDescription>Compila tutti i campi per aggiungere un nuovo prodotto al catalogo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Prodotto</Label>
            <Input id="name" placeholder="Inserisci il nome del prodotto" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea id="description" placeholder="Descrivi il prodotto..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Immagine Prodotto</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Clicca per caricare un'immagine o trascina qui</p>
                <Input id="image" type="file" accept="image/*" className="hidden" />
                <Button variant="outline" size="sm">
                  Seleziona File
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1">Salva Prodotto</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Annulla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
