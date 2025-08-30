import GestioneProdotti from "@/app/components/backOffice/gestione-prodotti"

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestione Prodotti</h1>
        <p className="text-muted-foreground">Aggiungi e gestisci i prodotti del tuo negozio</p>
      </div>
      <GestioneProdotti />
    </div>
  )
}