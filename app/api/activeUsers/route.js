import {  NextResponse } from 'next/server';

export async function GET(){
    const baseUrl = `${process.env.UMAMI_URL}/websites/${process.env.UMAMI_WEBSITE_ID}`;
    const headers = {
      'x-umami-api-key': process.env.UMAMI_API_KEY,
      'Accept': 'application/json'
    };
    
    const response = await fetch(`${baseUrl}/active`, { headers })//.then((res)=>res.json).then((res)=>console.log(res));
    
   if(!response.ok)
      console.log(response.status)

   const resJson=await response.json();

    
    return NextResponse.json(resJson.visitors);
}