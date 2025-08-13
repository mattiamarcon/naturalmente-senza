"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {

  const router=useRouter();

  return (
    <div className="space-y-6 font-title">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Gestisci il sito di Naturalmente Senza</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="py-3">
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
            <CardDescription>Gestisci rapidamente alcune funzionalità</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={()=>router.push("/dashboard/prodotti")}>
                <div className="font-medium">Modifica Prodotti</div>
                <div className="text-sm text-muted-foreground">Aggiorna gli ultimi prodotti di tendenza</div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={()=>router.push("/dashboard/marchi")}>
                <div className="font-medium">Gestisci Marchi</div>
                <div className="text-sm text-muted-foreground">Aggiungi o modifica marchi</div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={()=>router.push("/dashboard/statistiche")}>
                <div className="font-medium">Visualizza Statistiche</div>
                <div className="text-sm text-muted-foreground">Vedi tutte le statistiche del sito</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
