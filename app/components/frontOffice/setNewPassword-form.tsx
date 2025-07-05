"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useActionState } from "react"
import { setNewPassword } from "../../action"
import Form from "next/form"
//aggiungere controlli di autenticazione

export function SetNewPasswordForm({
  className,
  tokenHash,
  ...props
}: React.ComponentProps<"form"> & { tokenHash: string }) {

  const [state, formAction, isPending] = useActionState(setNewPassword, {message:""});

  return (
    <Form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
      <input type="hidden" name="token_hash" value={tokenHash} />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crea account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Inserisci le tue credenziali
        </p>
      </div>
      <div className="grid gap-6">
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
          {isPending?"Aggiornamento in corso...":"Aggiorna password"}
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