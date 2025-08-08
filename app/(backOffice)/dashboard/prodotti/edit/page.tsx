import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ImageIcon } from "lucide-react"

// Dati di esempio per i prodotti esistenti
const existingProducts = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    description: "Ultimo modello di smartphone con fotocamera avanzata e display OLED",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Laptop Gaming",
    description: "Computer portatile ad alte prestazioni per gaming e lavoro professionale",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Cuffie Wireless",
    description: "Cuffie bluetooth con cancellazione del rumore attiva",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function EditProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modifica Prodotti</h1>
        <p className="text-muted-foreground mt-2">Gestisci i prodotti esistenti nel catalogo</p>
      </div>

      <div className="grid gap-6">
        {existingProducts.map((product) => (
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
    </div>
  )
}
