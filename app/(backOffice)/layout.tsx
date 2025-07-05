import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/app/components/backOffice/admin-sidebar"
import { AdminHeader } from "@/app/components/backOffice/admin-header"
import UserContext from "@/app/components/backOffice/user-provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

    return (
      <UserContext>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <div className="flex-1">
              <AdminHeader />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </UserContext>
    )

  
}
