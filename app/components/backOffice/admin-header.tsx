"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {  Eye } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6 font-title">
      <SidebarTrigger />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" className="gap-2">
            <Eye className="h-4 w-4" />
            Vedi Sito
          </Link>
        </Button>
      </div>
    </header>
  )
}
