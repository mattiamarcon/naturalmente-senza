"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MenuNavigation from './MenuNavigation'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';

function Navbar() {

    const [open,setOpen]=useState(false);

    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const pathname = usePathname()

    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)
    const menuRef = useRef(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    useGSAP(() => {
      tl.current = gsap.timeline({ paused: true })

      tl.current
        // 1. accorcia le linee esterne
        .to([line1Ref.current, line3Ref.current], {
          width: "60%",
          duration: 0.2,
          ease: "power2.inOut",
        })
        // 2. fa sparire la linea centrale
        .to(
          line2Ref.current,
          {
            opacity: 0,
            scaleX: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "-=0.15",
        )
        // 3. ruota e posiziona per formare la X
        .to(
          line1Ref.current,
          {
            rotation: 45,
            y: 6,
            transformOrigin: "center",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.1",
        )
        .to(
          line3Ref.current,
          {
            rotation: -45,
            y: -6,
            transformOrigin: "center",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )
        // 4. allunga nuovamente le linee per completare la X
        .to(
          [line1Ref.current, line3Ref.current],
          {
            width: "110%",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15",
        )
    }, []) // dipendenze vuote → una sola inizializzazione

    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & oltre i primi 100px
        setIsVisible(false)
      } else {
        // Scrolling up o nella parte superiore della pagina
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(()=>{
    setOpen(false)
    tl.current?.reverse()
  },[pathname])

  const toggleMenu = () => {
    if (open) {
      tl.current?.reverse()
    } else {
      tl.current?.play()
    }
    setOpen(!open)
  }



  return (
    <div className={cn(
        "w-full  flex flex-row justify-between z-[100] fixed top-0 transition-all duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        )}>
        <Link href={"/"}>
            <Image src={"/logoTrasparent.png"} alt='logo' width={150} height={150} className='w-32 md:w-42 m-5 ' />
        </Link>
        
        <div className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-marrone-scuro cursor-pointer m-5 relative flex justify-center items-center' onClick={toggleMenu}>
            <div ref={menuRef} className="relative w-6 h-6">
                    {/* Linea superiore */}
                <div ref={line1Ref} className="absolute top-1 left-0 w-full h-0.5 bg-white rounded-full origin-center" />
                    {/* Linea centrale */}
                <div ref={line2Ref} className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
                />
                    {/* Linea inferiore */}
                <div ref={line3Ref} className="absolute bottom-1 left-0 w-full h-0.5 bg-white rounded-full origin-center" />
            </div>
        </div>

        <MenuNavigation status={open} />
    </div>
  )
}

export default Navbar