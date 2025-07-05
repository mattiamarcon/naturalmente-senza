import { Facebook, Instagram, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-marrone-principale text-crema font-title z-[500] bottom-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-bold  mb-4">Naturalmente Senza</h3>
            <p className=" mb-4">
              Il tuo negozio di fiducia per prodotti senza glutine, senza lattosio e per tutte le intolleranze
              alimentari.
            </p>
            <div className="flex space-x-4">
              <Link href={"https://www.facebook.com/naturalmentesenzaoderzo"} target="__blank" > <Facebook className="h-5 w-5 hover: cursor-pointer" /> </Link>
              <Link href={"https://www.instagram.com/naturalmente.senza.oderzo/"} target="__blank"> <Instagram className="h-5 w-5 hover: cursor-pointer" /> </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold  mb-4">Contatti</h4>
            <div className="space-y-2 ">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+39 379 285 2747</span>
              </div>
              <p>
                Via S. Maria Maddalena, 3, Oderzo (TV)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-marrone-scuro mt-8 pt-8 text-center flex flex-col items-center mx-auto">
           <p>P.IVA: 0123456789</p>
          <p>&copy; {new Date().getFullYear()} Naturalmente Senza. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
