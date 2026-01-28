# Research: Homepage Design Redesign

**Feature**: Homepage Design Redesign  
**Branch**: `002-homepage-redesign`  
**Date**: 2026-01-28

## Purpose

This document resolves technical unknowns and documents best practices for implementing the homepage visual redesign with modern aesthetics, animations, and localStorage-based favorites.

## Research Topics

### 1. Google Fonts Integration in Next.js 16

**Question**: How to efficiently load Crimson Pro and Outfit fonts in Next.js 16 with App Router?

**Decision**: Use `next/font/google` with font optimization

**Rationale**:

- Next.js 16 provides built-in Google Fonts optimization via `next/font/google`
- Automatically self-hosts fonts (no external requests, better privacy and performance)
- Provides automatic font subsetting based on used characters
- Supports variable fonts and multiple weights efficiently
- Built-in `display: swap` to prevent FOUT (Flash of Unstyled Text)

**Implementation Pattern**:

```typescript
// src/app/layout.tsx
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

// Apply to body: className={`${crimsonPro.variable} ${outfit.variable}`}
```

**Alternatives Considered**:

- Manual @font-face declarations: Rejected (requires manual optimization, no subsetting)
- External Google Fonts CDN: Rejected (privacy concerns, additional DNS lookup, no self-hosting)
- System fonts only: Rejected (doesn't meet design requirements for premium typography)

**Performance Impact**: ~50-80KB total for both fonts with subsetting, loaded with `font-display: swap`

---

### 2. CSS Custom Properties vs Tailwind Config for Theme Colors

**Question**: Should new color theme be defined in CSS custom properties or Tailwind config?

**Decision**: Use both - CSS custom properties in globals.css, extend in tailwind.config

**Rationale**:

- CSS custom properties allow runtime theming and better browser DevTools debugging
- Tailwind config enables type-safe color classes throughout components
- Hybrid approach gives flexibility: use `bg-cream` in components, `var(--color-cream)` in custom CSS
- Design reference already uses CSS custom properties (`:root` variables)
- Supports future dark mode implementation via CSS variable swapping

**Implementation Pattern**:

```css
/* src/app/globals.css */
:root {
  --color-bg-primary: #f8f7f4;
  --color-bg-secondary: #ffffff;
  --color-text-primary: #2d3436;
  --color-text-secondary: #636e72;
  --color-text-muted: #95a3ab;
  --color-accent-primary: #e17055;
  --color-accent-secondary: #fab1a0;
  --color-border: #e8e6e1;
}
```

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'cream': 'var(--color-bg-primary)',
        'coral': 'var(--color-accent-primary)',
        // ... map all CSS variables
      }
    }
  }
}
```

**Alternatives Considered**:

- Tailwind config only: Rejected (harder to debug, no runtime flexibility)
- CSS custom properties only: Rejected (loses Tailwind's utility class convenience)

---

### 3. localStorage Best Practices for Favorites Persistence

**Question**: How to safely handle localStorage for favorite recipe persistence with error handling and quota limits?

**Decision**: Implement defensive wrapper with try-catch, quota detection, and graceful degradation

**Rationale**:

- localStorage can throw exceptions (quota exceeded, disabled in private mode, browser restrictions)
- Need graceful degradation to session-only favorites if storage unavailable
- Should validate data on read to handle corruption
- Need to handle edge cases: disabled cookies, incognito mode, Safari cross-origin restrictions

**Implementation Pattern**:

```typescript
// src/lib/utils/localStorage.ts
const FAVORITES_KEY = 'recipe-favorites'

export const saveFavorites = (recipeIds: string[]): boolean => {
  try {
    const data = JSON.stringify(recipeIds)
    localStorage.setItem(FAVORITES_KEY, data)
    return true
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded')
      }
    }
    return false // Graceful degradation
  }
}

export const loadFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] // Invalid data, return empty
  }
}
```

**Custom Hook Pattern**:

```typescript
// src/hooks/useFavorites.ts
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    const loaded = loadFavorites()
    setFavorites(loaded)
  }, [])

  const toggleFavorite = (recipeId: string) => {
    const updated = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId]
    
    setFavorites(updated)
    const saved = saveFavorites(updated)
    if (!saved) setStorageAvailable(false)
  }

  return { favorites, toggleFavorite, storageAvailable }
}
```

**Alternatives Considered**:

- Direct localStorage calls in components: Rejected (no error handling, repeated logic)
- IndexedDB: Rejected (overkill for simple array of IDs, more complex API)
- Cookies: Rejected (size limits, sent with every request, privacy concerns)
- Session storage: Rejected (doesn't persist across sessions as required)

**Storage Limits**: localStorage typically ~5-10MB, storing ~1000 recipe IDs = ~20KB (well within limits)

---

### 4. CSS Animation Performance & GPU Acceleration

**Question**: Which CSS properties can be animated at 60fps without causing layout recalculations?

**Decision**: Use only `transform` and `opacity` for animations, avoid layout-triggering properties

**Rationale**:

- `transform` (translateY, scale) and `opacity` are GPU-accelerated, don't trigger layout/paint
- Properties like `height`, `width`, `top`, `left` cause expensive layout recalculations
- `will-change` hints browser to optimize specific properties (use sparingly)
- Modern browsers composite `transform` and `opacity` on GPU layer

**Performance Hierarchy** (fast to slow):

1. ✅ **GPU-accelerated** (60fps): `transform`, `opacity`
2. ⚠️ **Paint-only** (30-60fps): `color`, `background-color`, `box-shadow`
3. ❌ **Layout-triggering** (<30fps): `width`, `height`, `top`, `left`, `margin`, `padding`

**Implementation Pattern**:

```css
/* ✅ GOOD: GPU-accelerated hover effect */
.recipe-card {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.recipe-card:hover {
  transform: translateY(-8px); /* GPU-accelerated */
  box-shadow: 0 8px 30px rgba(0,0,0,0.12); /* Composited */
}

.recipe-card img {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.recipe-card:hover img {
  transform: scale(1.08); /* GPU-accelerated */
}

/* ❌ BAD: Causes layout recalculation */
.recipe-card:hover {
  height: 420px; /* DON'T DO THIS */
  margin-top: -8px; /* DON'T DO THIS */
}
```

**Accessibility Consideration**:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.15s !important;
    transition-duration: 0.15s !important;
  }
  
  .recipe-card {
    /* Disable complex animations */
    transform: none !important;
  }
  
  .recipe-card:hover {
    /* Keep subtle opacity change only */
    opacity: 0.9;
  }
}
```

**Alternatives Considered**:

- JavaScript animations (GSAP, Framer Motion): Rejected (adds bundle size, CSS sufficient for simple transitions)
- CSS animations with layout properties: Rejected (poor performance)
- No animations: Rejected (design requires smooth interactions)

---

### 5. Sticky Header Implementation in React

**Question**: How to implement sticky header with scroll-based class changes efficiently?

**Decision**: Use intersection Observer API for scroll detection, CSS `position: sticky` for header

**Rationale**:

- `position: sticky` is CSS-native, performant, no JavaScript for positioning
- IntersectionObserver is more performant than scroll event listeners (no continuous firing)
- Can detect when header crosses threshold with single observer
- Better for battery life on mobile (fewer event handler calls)

**Implementation Pattern**:

```typescript
// src/hooks/useScrolled.ts
import { useState, useEffect } from 'react'

export const useScrolled = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

// Usage in Header component:
const Header = () => {
  const isScrolled = useScrolled(50)
  
  return (
    <header className={`sticky top-0 transition-all ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
      {/* header content */}
    </header>
  )
}
```

**Alternatives Considered**:

- Fixed positioning with JavaScript: Rejected (requires manual offset calculations)
- Pure scroll event listener: Rejected (can be throttled but still less efficient than sticky)
- No sticky header: Rejected (design requirement for persistent navigation)

---

### 6. CSS Grid Auto-Fit vs Auto-Fill for Responsive Layout

**Question**: Should responsive recipe grid use `auto-fit` or `auto-fill` with minmax?

**Decision**: Use `repeat(auto-fill, minmax(340px, 1fr))`

**Rationale**:

- `auto-fill` creates as many columns as fit, even if some are empty (better for consistent spacing)
- `auto-fit` collapses empty columns (causes cards to stretch unnaturally on wide screens)
- `minmax(340px, 1fr)` ensures cards are at least 340px (readable) but can grow to fill space
- Works without media queries - truly responsive to container width
- Cards automatically reflow: 1 col mobile → 2-3 cols tablet → 3-4 cols desktop

**Implementation Pattern**:

```css
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}
```

**Visual Behavior**:

- 375px viewport: 1 column (340px + 35px padding)
- 768px viewport: 2 columns (340px × 2 + gap)
- 1024px viewport: 2-3 columns (depends on padding)
- 1440px viewport: 3-4 columns

**Alternatives Considered**:

- `auto-fit`: Rejected (causes cards to stretch too wide on large screens)
- Fixed breakpoints with media queries: Rejected (less flexible, more code)
- Flexbox with flex-basis: Rejected (doesn't create true grid alignment)

---

## Technology Stack Summary

### Frontend

- **Framework**: Next.js 16.0.10 (App Router, React 19)
- **Styling**: Tailwind CSS 3.4+ with custom theme extension
- **Typography**: Google Fonts (Crimson Pro, Outfit) via next/font/google
- **State Management**: React hooks (useState, useEffect) for client-side state
- **Storage**: Browser localStorage for favorites persistence
- **UI Components**: shadcn/ui (existing) for base components

### Performance Optimizations

- Next.js automatic font optimization (self-hosting, subsetting)
- CSS-based animations (GPU-accelerated transforms)
- Intersection Observer for scroll detection
- CSS Grid auto-fill for responsive layout (no JavaScript)
- Passive event listeners for scroll handling

### Accessibility

- WCAG 2.1 AA compliance maintained
- prefers-reduced-motion media query support
- Semantic HTML preserved
- Keyboard navigation with visible focus states
- Color contrast ratios validated

### Browser Support

- Chrome/Edge 90+ (last 2 years)
- Firefox 88+ (last 2 years)
- Safari 14+ (iOS 14+)
- Modern browsers with CSS Grid, Custom Properties, IntersectionObserver support

## Implementation Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Font loading delays | Medium | Medium | Use font-display: swap, system font fallbacks |
| localStorage quota exceeded | Low | Low | Graceful degradation to session-only |
| Animation performance on low-end devices | Medium | Medium | prefers-reduced-motion support, test on older devices |
| CSS Grid browser support issues | Low | High | Already supported in target browsers (95%+ globally) |
| Color contrast issues in new palette | Low | High | Pre-validated all color combinations, tested with tools |

## Next Steps

With research complete, proceed to Phase 1:

1. Generate data-model.md (document UI state structure)
2. Generate quickstart.md (local development guide)
3. Update agent context with new technologies
4. Proceed to task breakdown via `/speckit.tasks`
