import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Material Design Color System
        md: {
          primary: 'var(--md-primary)',
          'on-primary': 'var(--md-on-primary)',
          'primary-container': 'var(--md-primary-container)',
          'on-primary-container': 'var(--md-on-primary-container)',
          secondary: 'var(--md-secondary)',
          'on-secondary': 'var(--md-on-secondary)',
          'secondary-container': 'var(--md-secondary-container)',
          'on-secondary-container': 'var(--md-on-secondary-container)',
          surface: 'var(--md-surface)',
          'on-surface': 'var(--md-on-surface)',
          'surface-variant': 'var(--md-surface-variant)',
          'on-surface-variant': 'var(--md-on-surface-variant)',
          error: 'var(--md-error)',
          'on-error': 'var(--md-on-error)',
          outline: 'var(--md-outline)',
          'outline-variant': 'var(--md-outline-variant)',
        },
        // shadcn/ui compatibility layer
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        crimson: ['var(--font-crimson)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out backwards',
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
