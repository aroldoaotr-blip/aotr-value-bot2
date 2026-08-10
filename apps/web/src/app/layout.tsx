import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "AOTR Values — Precios en tiempo real",
  description:
    "Plataforma de valores de AOTR: precios oficiales de la hoja AOTR y precios de tradeo en tiempo real, sincronizada por nuestro bot de Discord.",
  openGraph: {
    title: "AOTR Values",
    description: "Precios oficiales y de tradeo de AOTR, en tiempo real.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('aotr-theme')==='ember'){document.documentElement.setAttribute('data-theme','ember')}}catch(e){}`
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <Providers>
          <SplashScreen />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
