"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { login } from "../../action"
import Form from 'next/form'
import { useActionState } from "react"

//aggiungere controlli di autenticazione

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction, isPending] = useActionState(login, {message:""});

  return (
    <Form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Accedi al tuo account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Inserisci le tue credenziali per accedere
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="es. nome.cognome@gmail.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/resetpassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
             Password dimenticata?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-marrone-scuro hover:bg-marrone-principale cursor-pointer">
          {isPending?"Accesso in corso...":"Login"}
        </Button>
      </div>
      <p className="text-red-600 text-lg ">{state.message}</p>
      <div className="text-center text-sm">
        Non hai un account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Iscriviti
        </Link>
      </div>
      
    </Form>
  )
}

