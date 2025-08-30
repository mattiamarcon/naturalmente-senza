"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/app/action';

export default function InfiniteSliderLogos() {

    const { error, data } = useQuery({
        queryKey: ["brandData"],
        queryFn: () => getBrands(),
      })

    useGSAP(()=>{ 
        const images=document.querySelectorAll(".imgToAnimate")
        if(window.innerWidth>768){
            gsap.fromTo(
                images,{
                    x:-2000,
                    
                },{
                    x:1500,
                    duration:25,
                    repeat:-1,
                    ease:"none"
                }
            )
        }else{
            gsap.fromTo(
                images,{
                    x:-2000,
                    
                },{
                    x:500,
                    duration:20,
                    repeat:-1,
                    ease:"none"
                }
            )
        }
    },[data])

    if(error)
        return("<p>Qualcosa è andato storto...</p>")

    if(data){

        console.log(data)
          return (
            <section className='w-full bg-marrone-scuro/70 py-5' id='marchi'>
                <h1 className='text-5xl md:text-7xl text-center text-crema font-semibold underline mb-10 decoration-3 underline-offset-4'>
                    I nostri marchi
                </h1>
                <div className='flex flex-row overflow-hidden max-w-7xl  mx-auto'>
                    {data.map((img)=>(
                        <img src={img.urlImage} alt={img.nome} className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale imgToAnimate mx-5' key={img.id} />
                    ))}          
                </div>
            </section>
        );
    }


}
