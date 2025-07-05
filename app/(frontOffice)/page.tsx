"use client"

import Hero from "@/app/components/frontOffice/Hero";
import NaturalmenteSenzaTypewriter from "@/app/components/frontOffice/NaturalmenteSenzaTypewriter";
import Footer from "@/app/components/frontOffice/Footer";
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger,ScrollSmoother } from "gsap/all"
import InfoLocation from "@/app/components/frontOffice/InfoLocation";
import BuoniCeliaci from "@/app/components/frontOffice/BuoniCeliaci";
import PercheSceglierci from "@/app/components/frontOffice/PercheSceglierci";
import TopProduct from "@/app/components/frontOffice/TopProduct";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {

  useGSAP(()=>{
     ScrollSmoother.create({
      smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  })

 

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">   
          <Hero />
          <NaturalmenteSenzaTypewriter />
          <PercheSceglierci />
          <TopProduct />
          <BuoniCeliaci />
          <InfoLocation />
          <Footer />
      </div>
    </div>
    </>
  );
}