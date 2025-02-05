import { Shippori_Antique, Shippori_Mincho } from 'next/font/google';

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  preload: false,
  display: 'swap',
  variable: '--font-shippori-mincho',
});

export const shipporiAntique = Shippori_Antique({
  subsets: ['latin'],
  weight: ['400'],
  preload: false,
  display: 'swap',
  variable: '--font-shippori-antique',
});
