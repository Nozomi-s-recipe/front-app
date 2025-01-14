import { Shippori_Antique, Shippori_Mincho } from 'next/font/google';

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  preload: false,
  display: 'swap',
  variable: '--font-shippori-mincho', // CSS変数として定義
});

export const shipporiAntique = Shippori_Antique({
  subsets: ['latin'],
  weight: ['400'], // Shippori Antiqueは400のみ利用可能
  preload: false,
  display: 'swap',
  variable: '--font-shippori-antique',
});
