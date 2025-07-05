import { Badge, CheckCircle, CreditCard, Heart } from "lucide-react"

export default function BuoniCeliaci() {
  return (
    <div className="w-full bg-crema py-12 md:py-16 font-title">
      <div className="container mx-auto px-4">
        {/* Sezione scuro */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg border-2 border-oro/20 md:p-12">
            <div className="text-center">
              {/* Badge scuro */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-oro/10 border-2 border-oro">
                <Badge className="h-10 w-10 text-oro" />
              </div>

              {/* Titolo scuro */}
              <h2 className="mb-4 text-3xl font-bold text-marrone-scuro md:text-4xl">Accettiamo Buoni Celiachia</h2>

              {/* Sottotitolo */}
              <p className="mb-8 text-lg text-marrone-scuro/80 md:text-xl">Fai la spesa senza pensieri con i tuoi buoni ASL</p>

              {/* Griglia dei vantaggi */}
              <div className="grid gap-6 md:grid-cols-3 text-md md:text-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-oro/10">
                    <CheckCircle className="h-6 w-6 text-oro" />
                  </div>
                  <h3 className="mb-2 font-semibold text-marrone-scuro">Facile e Veloce</h3>
                  <p className="text-sm text-marrone-scuro/70">Presenta i tuoi buoni alla cassa per un pagamento immediato</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-oro/10">
                    <CreditCard className="h-6 w-6 text-oro" />
                  </div>
                  <h3 className="mb-2 font-semibold text-marrone-scuro">Tutti i Formati</h3>
                  <p className="text-sm text-marrone-scuro/70">Accettiamo buoni cartacei e digitali di tutte le ASL</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-oro/10">
                    <Heart className="h-6 w-6 text-oro" />
                  </div>
                  <h3 className="mb-2 font-semibold text-marrone-scuro">Massimo Risparmio</h3>
                  <p className="text-sm text-marrone-scuro/70">Utilizza i tuoi buoni per tutti i prodotti senza glutine</p>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8 rounded-lg bg-marrone-scuro/5 p-6 text-md md:text-lg">
                <p className="text-marrone-scuro font-medium">
                  💡 <strong>Suggerimento:</strong> Porta sempre con te i buoni celiachia per non perdere l&apos;opportunità
                  di risparmiare sui tuoi prodotti preferiti!
                </p>
              </div>
            </div>
          </div>

          {/* Sezione informativa aggiuntiva */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 text-md md:text-lg">
            <div className="rounded-lg bg-white/80 p-6 shadow-sm border border-oro/10">
              <h4 className="mb-3 font-semibold text-marrone-scuro flex items-center">
                <Badge className="mr-2 h-5 w-5 text-oro" />
                Come Funziona
              </h4>
              <ul className="space-y-2 text-md text-marrone-scuro/80">
                <li>• Scegli i tuoi prodotti senza glutine</li>
                <li>• Presenta i buoni alla cassa</li>
                <li>• Paga la differenza se necessario</li>
                <li>• Porta a casa prodotti di qualità!</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/80 p-6 shadow-sm border border-oro/10 text-md md:text-lg">
              <h4 className="mb-3 font-semibold text-marrone-scuro flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-oro" />
                Documenti Necessari
              </h4>
              <ul className="space-y-2 text-md text-marrone-scuro/80">
                <li>• Buoni celiachia validi</li>
                <li>• Documento d&apos;identità</li>
                <li>• Tessera sanitaria (se richiesta)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
