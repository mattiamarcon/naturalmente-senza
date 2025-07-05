"use client"
import Link from 'next/link'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { createSupabaseClient } from '@/utils/supabase/client';
import { button } from 'motion/react-client';
import { Button } from '@/components/ui/button';

function MenuNavigation(status:{status:boolean}) {

    const dbClient= createSupabaseClient();

    const menu=useRef(null)
    const timeline=useRef<gsap.core.Timeline|null>(null);
    const [logged,setLogged] = useState(false);

    useEffect(()=>{
        async function checkLog(){
            const {data: {user}} = await dbClient.auth.getUser();

            if(user)
                setLogged(true);
        }

        checkLog();
    },[])

    useEffect(()=>{
        openMenu();
    },[status.status])

    useGSAP(()=>{
        timeline.current=gsap.timeline({paused:true});

        timeline.current.from(menu.current,
            {
                autoAlpha:0,
                height:0,
                duration:0.5,
                ease:"back.out",
                padding:0,
                top:0,
                right:0
            },
        )
        timeline.current.from(".menuElement",{
            y:-10,
            stagger:0.1,
            autoAlpha:0
        },"-=0.1")
    },[])   

    const openMenu=()=>{
        if(status.status)
            timeline.current?.play();
        else
            timeline.current?.reverse();
    }

    async function signOut(){
        await dbClient.auth.signOut();
        setLogged(false)
    }

  return (
    <div ref={menu} className='py-3 font-semibold px-5 flex h-fit gap-3 bg-beige text-marrone-scuro flex-col text-center text-2xl md:text-4xl absolute top-16 md:top-20 right-16 md:right-20 rounded-xl font-title'>
        <Link href={"/prodotti"} className='menuElement hover:underline'>Prodotti</Link>
        {/* <Link id='contattiLink' href={"#contatti"} className='menuElement hover:underline' onClick={(e:React.MouseEvent<HTMLAnchorElement>)=>toContatti(e)} >Contatti</Link> */}
        {logged && <Link href={"/dashboard"} className='menuElement hover:underline'>Dashboard</Link>}
        {logged?<button className='menuElement hover:underline cursor-pointer' onClick={signOut}>logout</button> :<Link href={"/login"} className='menuElement hover:underline'>Log in</Link>}
    
    </div>
  )
}

export default MenuNavigation