'use client'
 
import { createContext } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'
import { useState,useEffect } from 'react'
import { User } from '@supabase/supabase-js'
 
export const UserProvider = createContext<User | null>(null)
 
export default function UserContext({
  children,
}: {
  children: React.ReactNode
}) {

    const dbClient=createSupabaseClient();

    const [user,setUser]=useState<User | null>(null);

    useEffect(()=>{
        async function getUser(){
            const {data:{user}} = await dbClient.auth.getUser();

            if(user)
                setUser(user)
        }

        getUser();
    },[])

    return <UserProvider value={user}>{children}</UserProvider>
}