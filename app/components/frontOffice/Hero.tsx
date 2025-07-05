"use client";
import { motion } from "motion/react";
import { ImagesSlider } from "@/components/ui/images-slider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const images = [
    "/fotoNegozio1.jpg",
    "/fotoNegozio2.jpg",
    "/fotoNegozio3.jpg",
  ];

  const router=useRouter();

  const title=useRef(null);

  useGSAP(()=>{

    gsap.fromTo(title.current,
      {
        y:300,
        opacity:0,
      },
      {
        y:-150,
        ease:"power3.inOut",
        delay:1,
        duration:2.2,
        opacity:100,
      }
    )

  },[]);


  return (
    <ImagesSlider className="h-screen " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <p className="font-medium text-4xl md:text-7xl text-center bg-clip-text text-crema py-4  ">
          <em> Scopri la nostra selezione di prodotti </em> 
        </p>
        <button className="py-4 px-6 backdrop-blur-sm font-semibold text-crema text-3xl md:text-5xl bg-marrone-principale/70 hover:bg-marrone-principale/80 rounded-xl  text-shadow-lg/5 border-2 border-crema cursor-pointer " onClick={()=>{router.push("/prodotti")}}>
          <span><em>Scoprili ora</em></span>
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
