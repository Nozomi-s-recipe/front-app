import { Shippori_Antique, Shippori_Mincho } from 'next/font/google';

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500'],
  preload: true,
  display: 'optional',
  variable: '--font-shippori-mincho',
  fallback: ['system-ui', 'sans-serif'],
});

export const shipporiAntique = Shippori_Antique({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
  display: 'optional',
  variable: '--font-shippori-antique',
  fallback: ['system-ui', 'sans-serif'],
});
