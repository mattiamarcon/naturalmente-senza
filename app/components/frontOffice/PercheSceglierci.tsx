"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)


export default function PercheSceglierci() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([])
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animazione del titolo
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animazione dei paragrafi con stagger
      paragraphsRef.current.forEach((paragraph, index) => {
        if (paragraph) {
          gsap.fromTo(
            paragraph,
            {
              opacity: 0,
              y: 30,
              x: index % 2 === 0 ? -20 : 20, // Alternanza da sinistra e destra
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: paragraph,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Animazione delle parole chiave all'interno di ogni paragrafo
          const keyWords = paragraph.querySelectorAll(".key-word")
          keyWords.forEach((word, wordIndex) => {
            gsap.fromTo(
              word,
              {
                opacity: 0,
                scale: 0.8,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 0.3 + wordIndex * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: paragraph,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          })
        }
      })

      // Animazione della citazione finale
      gsap.fromTo(
        quoteRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotationX: -15,
        },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const KeyWord = ({ children }: { children: React.ReactNode }) => (
    <span className="key-word font-bold text-oro inline-block">{children}</span>
  )

  return (
    <div ref={containerRef} className="w-full bg-crema py-16 md:py-24 font-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header animato */}
          <div className="text-center mb-12">
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-marrone-principale mb-6">
              L'Importanza di <span className="text-oro">Mangiare Bene</span>
            </h2>
            <div className="w-24 h-1 bg-oro mx-auto rounded-full"></div>
          </div>

          {/* Contenuto testuale principale */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-oro/10">
            <div className="text-md md:text-lg leading-relaxed space-y-6">
              <p
                ref={(el) => {
                  paragraphsRef.current[0] = el
                }}
              >
                Per chi convive con la <KeyWord>celiachia</KeyWord> o altre intolleranze alimentari, la scelta dei
                prodotti giusti non è solo una questione di gusto, ma una vera e propria{" "}
                <KeyWord>necessità per il benessere</KeyWord>. Ogni boccone conta, ogni ingrediente ha il suo peso nella
                costruzione di una vita più sana e serena.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[1] = el
                }}
              >
                La <KeyWord>qualità</KeyWord> dei prodotti senza glutine che scegli oggi determina il tuo benessere di
                domani. Non si tratta semplicemente di evitare ciò che fa male, ma di abbracciare attivamente ciò che{" "}
                <KeyWord>nutre davvero</KeyWord> il tuo corpo e la tua mente. I nostri prodotti sono pensati per chi non
                vuole scendere a compromessi.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[4] = el
                }}
              >
                La differenza tra un prodotto qualunque e uno di qualità superiore si sente nel{" "}
                <KeyWord>sapore autentico</KeyWord>, si vede nella consistenza perfetta, si percepisce nel modo in cui
                il corpo risponde positivamente. È la differenza tra sopravvivere e <KeyWord>vivere pienamente</KeyWord>{" "}
                la propria alimentazione.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[5] = el
                }}
              >
                Scegliere prodotti di qualità significa anche scegliere <KeyWord>fiducia</KeyWord>: fiducia in chi li
                produce, fiducia nei controlli effettuati, fiducia nel fatto che ogni prodotto sia stato pensato con
                cura per chi, come te, merita solo il meglio. Perché la tua salute non è negoziabile, e il tuo{" "}
                <KeyWord>benessere</KeyWord> è la nostra priorità.
              </p>
            </div>

            {/* Citazione finale */}
            <div className="mt-12 pt-8 border-t border-oro/20">
              <blockquote ref={quoteRef} className="text-center text-xl md:text-2xl italic text-marrone-principale/90 font-medium">
                "Non è quello che mangi occasionalmente che conta, <br />
                ma quello che mangi ogni giorno che fa la differenza."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
