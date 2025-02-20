import '@/app/globals.css';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import Script from 'next/script';

const description =
  '赤身肉、加工肉、バターを使わない健康レシピを発信してます。栄養士がじっくり考えたレシピを投稿しています。◎';
const serviceName = 'Nozomi‘s Recipes';

export const metadata: Metadata = {
  metadataBase: new URL('https://n-recipes.com'),
  appleWebApp: {
    title: "N's Recipes",
  },
  title: serviceName,
  description: description,
  openGraph: {
    images: [
      {
        url: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/7cb8d9e456b44391b07aa662dca5f499/opengraph-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    title: serviceName,
    description: description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <GoogleTagManager gtmId='GTM-TZFSFDLH' />
      <body
        // className={`base ${shipporiMincho.variable} ${shipporiAntique.variable} antialiased bg-white h-screen flex flex-col`}
        className={`base antialiased h-screen flex flex-col`}
      >
        <Header />
        {/* <GoogleSignIn /> */}
        {children}
        <Footer />
        <Toaster />
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='afterInteractive'
        />
      </body>
      {/* <GoogleAnalytics gaId='G-8XQ426S2XN' /> */}
    </html>
  );
}
