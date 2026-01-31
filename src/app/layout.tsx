import '@/app/globals.css';
import { Footer } from '@/components/footer/Footer';
import { MenuHeader } from '@/components/header/MenuHeader';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Crimson_Pro, Outfit } from 'next/font/google';

// Configure Google Fonts with optimization
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-crimson',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const description =
  '赤身肉、加工肉、バターを使わない健康レシピを発信してます。栄養士がじっくり考えたレシピを投稿しています。◎';
const serviceName = 'Nozomi‘s Recipes';

export const metadata: Metadata = {
  metadataBase: new URL('https://n-recipes.com'),
  appleWebApp: {
    title: serviceName,
    capable: true,
    statusBarStyle: 'default',
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
  other: {
    'google-adsense-account': 'ca-pub-4065667299872259',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja' className={`${crimsonPro.variable} ${outfit.variable}`}>
      <head>
        {/* AdSense自動広告コード追加（推奨） - defer to prevent CLS */}
        <script
          async
          defer
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4065667299872259'
          crossOrigin='anonymous'
        />
      </head>
      <GoogleTagManager gtmId='GTM-TZFSFDLH' />
      <body>
        <div className='min-h-screen bg-background'>
          {children}
          <ServiceWorkerRegistration />
          <InstallPrompt />
        </div>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
