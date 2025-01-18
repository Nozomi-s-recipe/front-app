import type { Config } from 'tailwindcss';

export default {
  // 未使用の機能を無効化
  // 最新のfuture設定
  future: {
    hoverOnlyWhenSupported: true, // hover機能のサポート有無に応じた最適化
  },

  // 必要に応じてcore pluginsの設定
  corePlugins: {
    preflight: true, // 必要な場合のみfalseに
  },

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'base-white': '#F6F6F5',
        primary: '#1ABACC',
        'secondary-A': '#1ACCCC',
        'secondary-B': '#FFC616',
        accent: '#FF9615',
      },
      fontFamily: {
        mincho: ['var(--font-shippori-mincho)'],
        antique: ['var(--font-shippori-antique)'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
