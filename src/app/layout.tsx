import { shipporiAntique, shipporiMincho } from '@/app/font';
import '@/app/globals.css';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://n-recipes.com'),
  appleWebApp: {
    title: "N's Recipes",
  },
  title: 'Nozomi‘s Recipes',
  description: 'カラダに良い究極の食材を使用したレシピを提供しています◎',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body
        className={`base ${shipporiMincho.variable} ${shipporiAntique.variable} antialiased bg-white h-screen flex flex-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
