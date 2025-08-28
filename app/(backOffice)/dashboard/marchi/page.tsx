import GestioneMarchi from "@/app/components/backOffice/gestione-marchi"

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestione Marchi</h1>
        <p className="text-muted-foreground">Aggiungi e gestisci i marchi del tuo catalogo</p>
      </div>
      <GestioneMarchi />
    </div>
  )
}