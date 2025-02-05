import '@/app/globals.css';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { shipporiAntique, shipporiMincho } from './font';

export const metadata: Metadata = {
  metadataBase: new URL('https://n-recipes.com'),
  appleWebApp: {
    title: "N's Recipes",
  },
  title: 'Nozomi‘s Recipes',
  description: 'カラダに良い究極の食材を使用したレシピを提供しています◎',
  openGraph: {
    url: 'https://n-recipes.com',
    siteName: 'Nozomi‘s Recipes',
    images: [
      {
        url: 'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/7cb8d9e456b44391b07aa662dca5f499/opengraph-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    title: 'Nozomi‘s Recipes',
    description: 'カラダに良い究極の食材を使用したレシピを提供しています◎',
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      'https://images.microcms-assets.io/assets/888d632d12c2409a941139ea8e9d5adc/7cb8d9e456b44391b07aa662dca5f499/opengraph-image.jpg',
    ],
    title: 'Nozomi‘s Recipes',
    description: 'カラダに良い究極の食材を使用したレシピを提供しています◎',
  },
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
        // className={`base antialiased bg-white h-screen flex flex-col`}
      >
        <Header />
        {/* <GoogleSignIn /> */}
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId='G-8XQ426S2XN' />
    </html>
  );
}
