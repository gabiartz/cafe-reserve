import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reserve.allexclusive.com.br"),
  title: "Café de Conexões e Negócios | Reserve Sua Vaga",
  description: "Um dia exclusivo de estratégias, networking e experiências premium. 15 de Agosto de 2026 em São Paulo. Apenas R$ 1.990",
  keywords: ["networking", "negocios", "conexoes", "evento premium", "sao paulo"],
  openGraph: {
    title: "Café de Conexões e Negócios | Reserve Sua Vaga",
    description: "Um dia exclusivo de estratégias, networking e experiências premium. Apenas R$ 1.990",
    type: "website",
    url: "https://reserve.allexclusive.com.br",
    siteName: "All Exclusive",
    images: [
      {
        url: "https://reserve.allexclusive.com.br/logo-allexclusive.png",
        width: 200,
        height: 200,
        alt: "All Exclusive",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Café de Conexões e Negócios | Reserve Sua Vaga",
    description: "Um dia exclusivo de estratégias, networking e experiências premium. Apenas R$ 1.990",
    images: ["https://reserve.allexclusive.com.br/logo-allexclusive.png"],
  },
  icons: {
    icon: "/logo-allexclusive.png",
    apple: "/logo-allexclusive.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">{children}</body>
    </html>
  );
}
