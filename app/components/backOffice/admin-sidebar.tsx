"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BarChart3,   Home, LogOut,  Utensils, Users, Store } from "lucide-react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserProvider } from "./user-provider"
import { users } from "@/utils/types"
import { useSidebar } from "@/components/ui/sidebar"
//import UserProvider from "./user-provider"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  // {
  //   title: "Orari",
  //   url: "/admin/orari",
  //   icon: Clock,
  // },
  {
    title: "Prodotti",
    url: "/dashboard/prodotti",
    icon: Utensils,
  },
  {
    title: "Statistiche",
    url: "/dashboard/statistiche",
    icon: BarChart3,
  },
]

const adminItems=[
  {
    title: "Utenti",
    url: "/dashboard/utenti",
    icon: Users,
  },
]

export function AdminSidebar() {
  const dbClient=createSupabaseClient();

  const pathname = usePathname()
  const router=useRouter();
  const user=useContext(UserProvider)

  const [userInfo,setUserInfo]=useState<users | null>(null)
  const [logoLetter,setLogoLetter]=useState("")

  const { setOpenMobile, isMobile } = useSidebar()

  

  useEffect(()=>{
    async function fetchUserInfo(){

      const {data} = await dbClient.from("users").select("*").eq("email", user?.email)

      if(data){
        setUserInfo({
          id: data[0].id,
          email: data[0].email,
          ruolo: data[0].ruolo,
          stato: data[0].stato,
        })

        setLogoLetter(data[0].email.charAt(0).toLocaleUpperCase() as string)
      }
    }

    fetchUserInfo();
  },[user])

  const logout= async ()=>{
    console.log("click logout")
    await dbClient.auth.signOut();
    router.push("/login")
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="font-title">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-marrone-principale">
            <Store className="h-4 w-4" color="white" />
          </div>
          <div>
            <p className="text-sm font-medium">Naturalmente Senza</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestione</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {userInfo?.ruolo==="Admin" && adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">{logoLetter}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{userInfo?.ruolo}</p>
            <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent cursor-pointer" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
