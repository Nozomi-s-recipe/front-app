import { Shippori_Antique, Shippori_Mincho } from 'next/font/google';

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'], // 日本語サブセットを追加
  weight: ['400', '500'], // 実際に使用するウェイトのみに限定
  preload: true, // プリロードを有効化
  display: 'swap',
  variable: '--font-shippori-mincho',
});

export const shipporiAntique = Shippori_Antique({
  subsets: ['latin'], // 日本語サブセットを追加
  weight: ['400'],
  preload: true, // プリロードを有効化
  display: 'swap',
  variable: '--font-shippori-antique',
});
