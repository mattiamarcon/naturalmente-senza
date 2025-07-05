"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Form from "next/form"
import { useState } from "react"
import { resetPassword } from "../../action"
//aggiungere controlli di autenticazione

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

    const [showText,setShowText] = useState(false)

  return (
    <Form className={cn("flex flex-col gap-6", className)} {...props} action={resetPassword}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Inserisci la tua email
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="es. nome.cognome@gmail.com" required />
        </div>
        <Button type="submit" className="w-full bg-marrone-scuro hover:bg-marrone-principale cursor-pointer" onClick={()=>setShowText(true)}>
          Reset
        </Button>
      </div>
      <p className="text-lg text-red-600">{showText?"Controlla la tua email":""}</p>
      <div className="text-center text-sm">
        Hai già un account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Accedi
        </Link>
      </div>
    </Form>
  )
}