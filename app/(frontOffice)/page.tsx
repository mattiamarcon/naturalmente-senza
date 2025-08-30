"use client"

import Hero from "@/app/components/frontOffice/Hero";
import NaturalmenteSenzaTypewriter from "@/app/components/frontOffice/NaturalmenteSenzaTypewriter";

import InfoLocation from "@/app/components/frontOffice/InfoLocation";
import BuoniCeliaci from "@/app/components/frontOffice/BuoniCeliaci";
import PercheSceglierci from "@/app/components/frontOffice/PercheSceglierci";
import TopProduct from "@/app/components/frontOffice/TopProduct";
import  InfiniteSliderLogos  from "@/app/components/frontOffice/infinite-slider";
import { ReactLenis } from 'lenis/react'



export default function Home() {   


  return (
    <>
      <ReactLenis root  />
      <Hero />
      <NaturalmenteSenzaTypewriter />
      <TopProduct />
      <PercheSceglierci />
      <InfiniteSliderLogos />
      <BuoniCeliaci />
      <InfoLocation />
    </>
  );
}