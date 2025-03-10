import '@/app/globals.css';
import { Footer } from '@/components/footer/Footer';
import { MenuHeader } from '@/components/header/MenuHeader';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <GoogleTagManager gtmId='GTM-TZFSFDLH' />
      <body>
        <div className='min-h-screen bg-background'>
          <MenuHeader />
          <main className='container mx-auto px-6 md:px-16 lg:px-24'>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
