"use client"

import { MapPin, Phone, Clock } from "lucide-react"


export default function InfoLocation() {
  return (
    <section className="w-full py-16 bg-oro font-title" id="contatti">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titolo principale */}
        <h2 className="text-4xl md:text-5xl font-bold text-crema text-center mb-16">Dove trovarci</h2>

        {/* Layout a due colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonna sinistra - Informazioni */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-grigio mb-8">Vieni a trovarci</h3>

            <div className="space-y-6">
              {/* Indirizzo */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-grigio mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-grigio  text-xl">Via S. Maria Maddalena, 3, Oderzo (TV)</p>
                </div>
              </div>

              {/* Telefono */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-grigio mt-1">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-grigio  text-xl">+39 379 285 2747</p>
                </div>
              </div>

              {/* Orari */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-grigio mt-1">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-grigio  text-xl">Lun: 8:30-12:30</p>
                  <p className="text-grigio  text-xl">Mar-Sab: 8:30-12:30, 15:00-19.00</p>
                  <p className="text-grigio  text-xl">Dom: Chiuso</p>
                </div>
              </div>
            </div>
          </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173.9161335868921!2d12.489797125216057!3d45.77804108112846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4779435b7fd10f75%3A0x105cda2d6e4b42fd!2sNaturalmente%20Senza%20-%20Oderzo!5e0!3m2!1sit!2sit!4v1751038183646!5m2!1sit!2sit" 
                className="rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[400px] w-full overflow-hidden"
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>

        </div>
      </div>
    </section>
  )
}
