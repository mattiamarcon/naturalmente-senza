"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useActionState } from "react"
import { signup } from "../../action"
import Form from "next/form"
//aggiungere controlli di autenticazione

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction, isPending] = useActionState(signup, {message:""});

  return (
    <Form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crea account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Inserisci le tue credenziali
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="es. nome.cognome@gmail.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confermaPassword">Conferma Password</Label>
          </div>
          <Input id="confermaPassword" name="confermaPassword" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-marrone-scuro hover:bg-marrone-principale cursor-pointer">
          {isPending?"Iscrizione in corso...":"Registrati"}
        </Button>
      </div>
      <p className="text-red-600 text-lg ">{state.message}</p>
      <div className="text-center text-sm">
        Hai già un account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Accedi
        </Link>
      </div>
    </Form>
  )
}