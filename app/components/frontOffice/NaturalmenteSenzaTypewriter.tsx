"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export default function NaturalmenteSenzaTypewriter() {
  const typewriterRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const img = useRef(null)

  const words = ["glutine", "zucchero", "lattosio"]
  const currentWordIndex = useRef(0)

  

  useGSAP(() => {
    const typewriterElement = typewriterRef.current
    const cursorElement = cursorRef.current
    const imgElement=img.current

    if (!typewriterElement || !cursorElement) return

    // Animazione del cursore che lampeggia
    gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Funzione per scrivere una parola
    const typeWord = (word: string) => {
      return new Promise<void>((resolve) => {
        let currentText = ""
        const tl = gsap.timeline({
          onComplete: resolve,
        })

        // Scrivi lettera per lettera
        for (let i = 0; i <= word.length; i++) {
          tl.to(
            {},
            {
              duration: 0.1,
              onComplete: () => {
                currentText = word.substring(0, i)
                typewriterElement.textContent = currentText
              },
            },
          )
        }
      })
    }

    // Funzione per cancellare una parola
    const deleteWord = (word: string) => {
      return new Promise<void>((resolve) => {
        const tl = gsap.timeline({
          onComplete: resolve,
        })

        // Cancella lettera per lettera
        for (let i = word.length; i >= 0; i--) {
          tl.to(
            {},
            {
              duration: 0.05,
              onComplete: () => {
                const currentText = word.substring(0, i)
                typewriterElement.textContent = currentText
              },
            },
          )
        }
      })
    }

    // Funzione principale per il ciclo typewriter
    const typewriterLoop = async () => {
      while (true) {
        const currentWord = words[currentWordIndex.current]

        // Scrivi la parola
        await typeWord(currentWord)

        // Pausa prima di cancellare
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Cancella la parola
        await deleteWord(currentWord)

        // Pausa prima della prossima parola
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Passa alla parola successiva
        currentWordIndex.current = (currentWordIndex.current + 1) % words.length
      }
    }

    // Avvia il ciclo
    typewriterLoop()

    gsap.from(imgElement,{
        scrollTrigger:imgElement,
        duration:1,
        ease:"sine.inOut",
        y:100,
        autoAlpha:0,
    })



  }, [])

  return (
    <section className="w-full py-20 bg-marrone-principale/70 flex flex-col md:flex-row justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight font-title ">
          Trova tutto ciò che ami
        </h2>
        <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight font-title ">naturalmente senza... </h2>
        <h2 className="text-4xl md:text-6xl font-bold text-marrone-principale leading-tight font-title ">
          <span className="relative">
            <span ref={typewriterRef} className="text-marrone-scuro font-extrabold">
              {/* Il testo verrà inserito qui dall'animazione */}
            </span>
            <span ref={cursorRef} className="text-scuro font-thin text-4xl md:text-6xl ml-1">
              |
            </span>
          </span>
        </h2>
      </div>

      <div className="md:w-1/2">
        <Image ref={img} src={"/elencoSenza.jpg"} alt="prodotti senza" width={200} height={400} className="mx-auto rounded-xl w-[300px] md:w-[400px] md:mt-0 mt-10"  />
      </div>
    </section>
  )
}




