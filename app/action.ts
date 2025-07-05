"use server"

import { createSupabaseClient } from "@/utils/supabase/client"
import { createSupabaseServer } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

const dbClient=createSupabaseClient();


interface actionState{
    message:string
}

export async function login(currentState:actionState,formData:FormData){
    const dbServer= await createSupabaseServer();

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const {data}=await dbClient.from("users").select("stato").eq("email",email)

    if(data){
        if(data[0].stato){
            const {error} = await dbServer.auth.signInWithPassword({
                email,
                password,
            })

            if(!error){
                redirect("/dashboard")                
            }
            else if(error.code=="invalid_credentials")
                return {message:"Credenziali errate, riprova!"}
        }else{
            return {message:"Il tuo account non è ancora stato approvato, richiedi informazioni al tuo amministratore"}
        }
    }

    return {message:"Errore non previsto, riprova!"}
}

export async function signup(currentState:actionState,formData:FormData){
    const dbServer= await createSupabaseServer();

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confermaPassword = formData.get("confermaPassword") as string

    if(password!==confermaPassword)
        return {message:"password e conferma password sono differenti"}

    const {data,error}=await dbServer.auth.signUp({
        email,
        password,
        options:{
            emailRedirectTo:`${window.location.href}/login`
        }
    })

    if(error)
        return {message:"Errore non previsto, riprova!"}


    if(data){
        await dbClient.from("users").insert({
            email,
            ruolo:"utente"
        })

        return {message:"Conferma iscrizione via email!"}
    }

    return {message:"ok"}

}

    

export async function resetPassword(formData:FormData){
    const dbServer= await createSupabaseServer();

    const email = formData.get("email") as string

    await dbServer.auth.resetPasswordForEmail(email)

}

export async function setNewPassword(currentState: actionState, formData: FormData) {
    const dbServer = await createSupabaseServer();
    
    const password = formData.get("password") as string;
    const confermaPassword = formData.get("confermaPassword") as string;
    const tokenHash = formData.get("token_hash") as string; // Ottieni dall'URL
    
    if (password !== confermaPassword) {
        return { message: "Password e conferma password sono differenti" };
    }
    
    if (!tokenHash) {
        return { message: "Token di reset non valido" };
    }
    
    // Usa verifyOtp per stabilire la sessione
    const { error: verifyError } = await dbServer.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'recovery'
    });
    
    if (verifyError) {
        console.error('Errore verifica OTP:', verifyError);
        return { message: "Token di reset non valido o scaduto" };
    }
    
    // Ora puoi aggiornare la password
    const { error } = await dbServer.auth.updateUser({
        password: password
    });
    
    if (error) {
        console.error('Errore aggiornamento password:', error);
        return { message: "Errore nell'aggiornamento della password" };
    }
    
    return { message: "Password aggiornata correttamente" };
}
