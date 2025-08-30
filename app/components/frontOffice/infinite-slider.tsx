"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useQuery } from "@tanstack/react-query"
import { getBrands } from "@/app/action"

export default function InfiniteSliderLogos() {
  const { error, data } = useQuery({
    queryKey: ["brandData"],
    queryFn: () => getBrands(),
  })

  useGSAP(() => {
    const container = document.querySelector(".slider-container")
    if (container && data) {
      const containerWidth = container.scrollWidth / 2 // Half because we duplicate content

      gsap.set(container, { x: 0 })
      gsap.to(container, {
        x: -containerWidth,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }
  }, [data])

  if (error) return <p>Qualcosa è andato storto...</p>

  if (data) {
    return (
      <section className="w-full bg-marrone-scuro/70 py-5" id="marchi">
        <h1 className="text-5xl md:text-7xl text-center text-crema font-semibold underline mb-10 decoration-3 underline-offset-4">
          I nostri marchi
        </h1>
        <div className="overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-row slider-container">
            {/* First set of images */}
            {data.map((img) => (
              <img
                src={img.urlImage || "/placeholder.svg"}
                alt={img.nome}
                className="aspect-square h-[100px] w-[140px] rounded-[4px] grayscale mx-5 flex-shrink-0"
                key={`first-${img.id}`}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {data.map((img) => (
              <img
                src={img.urlImage || "/placeholder.svg"}
                alt={img.nome}
                className="aspect-square h-[100px] w-[140px] rounded-[4px] grayscale mx-5 flex-shrink-0"
                key={`second-${img.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="w-full bg-amber-900/70 py-5 flex justify-center">
      <p className="text-amber-100">Caricamento marchi...</p>
    </div>
  )
}

