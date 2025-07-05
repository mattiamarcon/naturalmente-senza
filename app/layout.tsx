import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";


const playfairDisplay=Playfair_Display({
  subsets:["latin"]
})


export const metadata: Metadata = {
  title: "Naturalmente Senza",
  description: "Naturalmente Senza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>     
        <script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.UMAMI_WEBSITE_ID} ></script>
      </head>
      <body
        className={`${playfairDisplay.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
