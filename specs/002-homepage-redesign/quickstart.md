
# Quickstart Guide: Homepage Design Redesign

**Feature**: Homepage Design Redesign  
**Branch**: `002-homepage-redesign`  
**Date**: 2026-01-28

## Overview

This guide helps developers set up their local environment and start implementing the homepage visual redesign. The changes are frontend-only with no backend modifications required.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git access to the repository
- Code editor (VS Code recommended)
- Modern browser for testing (Chrome/Firefox/Safari)

## Quick Start (5 minutes)

### 1. Checkout the Feature Branch

```bash
git fetch origin
git checkout 002-homepage-redesign

# Or create from main if not yet pushed:
git checkout -b 002-homepage-redesign
```

### 2. Install Dependencies (if not already done)

```bash
npm install
# or
yarn install
```

**Note**: No new dependencies required for this feature. We use existing Next.js, React, Tailwind, and shadcn/ui.

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Server will start at `http://localhost:3000`

### 4. View Design Reference

Open the design reference in your browser:

```bash
open design/recipe-homepage.html
# or manually navigate to the file
```

Compare your implementation against this reference as you work.

### 5. Start Implementing

Begin with high-impact visual changes:

1. Color theme (CSS custom properties in `globals.css`)
2. Google Fonts setup (`layout.tsx`)
3. Recipe card styling
4. Header updates

---

## Project Structure

### Key Files to Modify

```
src/
├── app/
│   ├── globals.css           # ⚠️ MODIFY: Add color theme, font variables
│   ├── layout.tsx            # ⚠️ MODIFY: Configure Google Fonts
│   └── page.tsx              # ⚠️ MODIFY: Update component structure
├── components/
│   ├── header/
│   │   └── Header.tsx        # ⚠️ MODIFY: Sticky header, logo, tagline
│   ├── recipe-preview/
│   │   ├── RecipePreview.tsx # ⚠️ MODIFY: Card styling, favorite button
│   │   └── RecipePreviewList.tsx # ⚠️ MODIFY: Grid layout
│   └── search/
│       └── SearchField.tsx   # ⚠️ MODIFY: Search box styling
├── hooks/
│   ├── useFavorites.ts       # ✨ CREATE: Favorite management hook
│   └── useScrolled.ts        # ✨ CREATE: Scroll detection hook
└── lib/
    └── utils/
        └── localStorage.ts   # ✨ CREATE: localStorage helpers

design/
└── recipe-homepage.html      # 📖 REFERENCE: Visual design spec
```

### Files Not Modified

```
src/utils/micro-cms/         # No changes to CMS integration
src/types/                   # No type changes needed
public/                      # No new assets required (uses existing images)
```

---

## Development Workflow

### Step-by-Step Implementation Order

**Phase 1: Foundation (30 min)**

1. Set up color theme in `globals.css`
2. Configure Google Fonts in `layout.tsx`
3. Create localStorage utility functions
4. Create custom hooks (useFavorites, useScrolled)

**Phase 2: Components (2 hours)**

1. Update Header component (sticky, logo, tagline, scroll behavior)
2. Update SearchField styling
3. Add tab navigation (visual only)
4. Update recipe card styling

**Phase 3: Animations (1 hour)**

1. Add hover effects (cards, buttons, links)
2. Add staggered fade-in animations
3. Implement prefers-reduced-motion support

**Phase 4: Polish (30 min)**

1. Test responsive behavior (mobile, tablet, desktop)
2. Test accessibility (keyboard navigation, screen readers)
3. Test performance (Lighthouse score)

---

## Code Examples

### 1. Color Theme Setup

**File**: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* New color theme */
    --color-bg-primary: #f8f7f4;
    --color-bg-secondary: #ffffff;
    --color-text-primary: #2d3436;
    --color-text-secondary: #636e72;
    --color-text-muted: #95a3ab;
    --color-accent-primary: #e17055;
    --color-accent-secondary: #fab1a0;
    --color-border: #e8e6e1;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
    --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
    
    /* Animation timing */
    --timing-normal: 0.3s;
    --timing-slow: 0.6s;
    --easing: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  body {
    @apply bg-[var(--color-bg-primary)] text-[var(--color-text-primary)];
    font-family: var(--font-outfit), -apple-system, sans-serif;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.15s !important;
    transition-duration: 0.15s !important;
  }
}
```

### 2. Google Fonts Configuration

**File**: `src/app/layout.tsx`

```typescript
import { Crimson_Pro, Outfit } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-crimson',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={`${crimsonPro.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### 3. Custom Hook: useFavorites

**File**: `src/hooks/useFavorites.ts`

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'recipe-favorites'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setFavorites(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      setStorageAvailable(false)
    }
  }, [])

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      } catch {
        setStorageAvailable(false)
      }
      
      return updated
    })
  }, [])

  const isFavorite = useCallback(
    (recipeId: string) => favorites.includes(recipeId),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite, storageAvailable }
}
```

### 4. Custom Hook: useScrolled

**File**: `src/hooks/useScrolled.ts`

```typescript
'use client'

import { useState, useEffect } from 'react'

export const useScrolled = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
```

### 5. Recipe Card Component

**File**: `src/components/recipe-preview/RecipePreview.tsx`

```typescript
'use client'

import { useFavorites } from '@/hooks/useFavorites'

export const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  
  return (
    <article className="recipe-card group cursor-pointer rounded-[20px] bg-white shadow-[var(--shadow-sm)] transition-all duration-[0.4s] ease-[var(--easing)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]">
      <div className="relative pt-[75%] overflow-hidden rounded-t-[20px]">
        <img
          src={recipe.thumbnailUrl}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[0.6s] ease-[var(--easing)] group-hover:scale-108"
        />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
          {recipe.category}
        </span>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(recipe.recipeId)
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className={`w-5 h-5 ${isFavorite(recipe.recipeId) ? 'fill-[var(--color-accent-primary)]' : 'fill-none'} stroke-[var(--color-accent-primary)]`}>
            {/* Heart icon path */}
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="font-[var(--font-crimson)] text-[1.35rem] font-semibold mb-2">
          {recipe.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {recipe.description}
        </p>
        <div className="flex items-center gap-5 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span>{recipe.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{recipe.cookingTime}分</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{recipe.servings}人分</span>
          </div>
        </div>
      </div>
    </article>
  )
}
```

---

## Testing Checklist

### Visual Testing

- [ ] Colors match design reference exactly
- [ ] Fonts load correctly (Crimson Pro for titles, Outfit for body)
- [ ] Shadows appear as specified (subtle on default, enhanced on hover)
- [ ] Border radius matches design (20px cards, 16px search, 10px logo)
- [ ] Spacing matches design (consistent padding, gaps)

### Interaction Testing

- [ ] Recipe card hover effect works smoothly
- [ ] Favorite button toggles heart icon fill
- [ ] Favorite state persists after page refresh
- [ ] Header becomes compact when scrolling past 50px
- [ ] Logo scrolls to top on homepage, navigates on other pages
- [ ] Search box shows focus state with coral border
- [ ] Tab navigation shows active state

### Responsive Testing

- [ ] Mobile (<768px): 1 column grid, tagline hidden
- [ ] Tablet (768-1024px): 2-3 columns grid
- [ ] Desktop (>1024px): 3-4 columns grid
- [ ] Touch scrolling works for horizontal tabs on mobile

### Accessibility Testing

- [ ] Keyboard navigation works (Tab through interactive elements)
- [ ] Focus indicators visible on all interactive elements
- [ ] Favorite button announces state to screen readers
- [ ] Reduced motion preference simplifies animations
- [ ] Color contrast meets WCAG AA standards

### Performance Testing

- [ ] Lighthouse performance score >90
- [ ] Animations run at 60fps (check with DevTools Performance tab)
- [ ] No layout shifts during load (CLS <0.1)
- [ ] Fonts load without blocking render

---

## Common Issues & Solutions

### Issue: Fonts Not Loading

**Symptoms**: Text displays in fallback font (system sans-serif)

**Solution**:

```typescript
// Verify font configuration in layout.tsx
// Check className includes both font variables
<html className={`${crimsonPro.variable} ${outfit.variable}`}>
```

### Issue: localStorage Quota Exceeded

**Symptoms**: Favorites not saving after certain number

**Solution**: Already handled in useFavorites hook - falls back to session-only state

### Issue: Animations Janky/Slow

**Symptoms**: Hover effects lag or stutter

**Solution**:

- Use only `transform` and `opacity` for animations
- Avoid animating `height`, `width`, `margin`, `padding`
- Check in DevTools Performance tab for layout recalculations

### Issue: Grid Not Responsive

**Symptoms**: Too many/few columns on certain screen sizes

**Solution**:

```css
/* Verify grid configuration */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}
```

---

## Development Tools

### VS Code Extensions (Recommended)

- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **PostCSS Language Support**: CSS custom properties syntax
- **ES7+ React/Redux/React-Native snippets**: React component snippets
- **Prettier**: Code formatting

### Browser DevTools Tips

**Chrome DevTools**:

- Performance tab: Check animation performance (60fps target)
- Lighthouse: Run performance audit (target >90)
- Application tab → LocalStorage: Inspect favorites data
- Elements tab → Computed: Verify CSS custom property values

**Firefox DevTools**:

- Accessibility inspector: Check ARIA labels, contrast ratios
- Responsive Design Mode: Test different screen sizes

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production (test build)
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit

# View design reference
open design/recipe-homepage.html
```

---

## Getting Help

### Documentation References

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
-
