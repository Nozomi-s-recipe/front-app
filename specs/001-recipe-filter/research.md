# Research: Basic Recipe Filtering

**Feature**: 001-recipe-filter  
**Date**: 2025-12-26  
**Purpose**: Resolve technical unknowns and establish implementation patterns

## Overview

This document consolidates research findings for implementing client-side recipe filtering with URL parameter state management in a Next.js 16 App Router application.

## Research Areas

### 1. URL Parameter State Management in Next.js App Router

**Decision**: Use `useSearchParams` and `useRouter` from `next/navigation` with client components

**Rationale**:

- Next.js 16 App Router provides `useSearchParams` hook for reading URL parameters
- `useRouter().push()` allows programmatic URL updates without full page reload
- Shallow routing preserves React component state while updating URL
- URLSearchParams API provides standard encoding/decoding
- Client components can reactively respond to URL parameter changes

**Implementation Pattern**:

```typescript
'use client'
import { useSearchParams, useRouter } from 'next/navigation'

const searchParams = useSearchParams()
const router = useRouter()

// Read filters from URL
const timeFilter = searchParams.get('time')
const genres = searchParams.get('genre')?.split(',') || []

// Update URL when filters change
const updateFilters = (newFilters) => {
  const params = new URLSearchParams(searchParams)
  params.set('time', newFilters.time)
  params.set('genre', newFilters.genres.join(','))
  router.push(`?${params.toString()}`, { scroll: false })
}
```

**Alternatives Considered**:

- Server-side filtering with URL parameters: Rejected - requires server round-trip, slower UX, unnecessary for client-side data
- React Context without URL sync: Rejected - filters not shareable, breaks browser back/forward
- Hash-based routing: Rejected - less SEO-friendly, non-standard pattern

**References**:

- [Next.js useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [Next.js useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)

---

### 2. Responsive Filter UI Pattern (Sidebar vs Drawer)

**Decision**: Use shadcn/ui Sheet component for mobile drawer, conditional rendering for desktop sidebar

**Rationale**:

- Sheet component provides accessible drawer with proper focus management
- Built-in animations and overlay for mobile experience
- Tailwind `hidden lg:block` pattern for responsive sidebar visibility
- Consistent with existing shadcn/ui components in the project
- ARIA compliant out of the box

**Implementation Pattern**:

```tsx
// Desktop: Always visible sidebar
<aside className="hidden lg:block w-64 sticky top-20">
  <FilterContent />
</aside>

// Mobile: Sheet drawer
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button>Filters</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <FilterContent />
  </SheetContent>
</Sheet>
```

**Alternatives Considered**:

- Custom drawer implementation: Rejected - reinventing accessibility features, more maintenance
- Modal for mobile: Rejected - drawer UX better for filters (partial overlay, swipe to close)
- Always-visible filters on mobile: Rejected - consumes too much screen space

**References**:

- [shadcn/ui Sheet](https://ui.shadcn.com/docs/components/sheet)
- [Radix UI Dialog (Sheet base)](https://www.radix-ui.com/primitives/docs/components/dialog)

---

### 3. Filter Logic Implementation (AND/OR Hybrid)

**Decision**: Client-side filter function with explicit AND/OR logic separation

**Rationale**:

- Pure function for testability
- Clear separation: OR within filter type, AND across types
- Efficient with JavaScript array methods
- Handles missing data gracefully (exclude from filtered results)
- Performance acceptable for <10,000 recipes

**Implementation Pattern**:

```typescript
interface FilterCriteria {
  timeRange?: { min: number; max: number }
  genres: string[]  // OR logic
  ingredientRange?: { min: number; max: number }
}

function filterRecipes(recipes: Recipe[], criteria: FilterCriteria): Recipe[] {
  return recipes.filter(recipe => {
    // Time filter (AND) - single select so simple check
    if (criteria.timeRange) {
      if (!recipe.cookingTime) return false  // Exclude recipes without time
      const inRange = recipe.cookingTime >= criteria.timeRange.min && 
                      recipe.cookingTime <= criteria.timeRange.max
      if (!inRange) return false
    }
    
    // Genre filter (OR within, AND across)
    if (criteria.genres.length > 0) {
      if (!recipe.genres || recipe.genres.length === 0) return false
      const hasMatchingGenre = recipe.genres.some(g => 
        criteria.genres.includes(g)
      )
      if (!hasMatchingGenre) return false
    }
    
    // Ingredient count filter (AND) - single select
    if (criteria.ingredientRange) {
      if (!recipe.ingredientCount) return false
      const inRange = recipe.ingredientCount >= criteria.ingredientRange.min &&
                      recipe.ingredientCount <= criteria.ingredientRange.max
      if (!inRange) return false
    }
    
    return true  // Passes all filters
  })
}
```

**Performance Considerations**:

- O(n*m) complexity where n=recipes, m=average filters per recipe
- For 10,000 recipes with 3 filters: ~30,000 comparisons
- JavaScript array methods are optimized
- Consider memoization if performance becomes issue
- No premature optimization - measure first

**Alternatives Considered**:

- Server-side filtering with Hasura: Rejected - adds latency, filters already on client
- IndexedDB with queries: Rejected - overkill for current scale, adds complexity
- Web Workers: Rejected - current scale doesn't justify threading overhead

---

### 4. Accessibility Requirements for Filter UI

**Decision**: Implement comprehensive keyboard navigation and screen reader support

**Rationale**:

- WCAG 2.1 Level AA compliance is constitutional requirement
- Filters are interactive controls requiring careful accessibility
- Screen reader users need filter state announcements
- Keyboard users need focus management

**Implementation Checklist**:

**Keyboard Navigation**:

- Tab order: Filter button → Filter sections → Individual controls → Clear button
- Enter/Space to toggle checkboxes and select radio buttons
- Escape to close mobile drawer
- Focus trap within open drawer (prevents tabbing outside)

**Screen Reader Support**:

- `role="search"` on filter container
- `aria-label="Recipe filters"` on filter section
- `aria-live="polite"` region for result count updates
- `aria-expanded` on mobile filter button
- `aria-checked` managed by shadcn/ui components
- Announce filter changes: "Filtered to 42 recipes"

**Visual Indicators**:

- Clear focus outlines (Tailwind `focus:ring-2`)
- Active filter pills with remove buttons
- Result count always visible
- Color contrast ≥4.5:1 for filter labels

**Testing Requirements**:

- VoiceOver (macOS/iOS) testing
- NVDA (Windows) testing
- Keyboard-only navigation testing
- Automated accessibility testing (axe-core)

**References**:

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&levels=aaa)
- [Inclusive Components: Filter](https://inclusive-components.design/)

---

### 5. Analytics Tracking for Filter Usage

**Decision**: Track filter interactions with Google Analytics 4 events

**Rationale**:

- Constitutional requirement for observability
- Understand which filters users value most
- Identify "no results" scenarios for content gap analysis
- Measure filter performance impact on user behavior

**Events to Track**:

```typescript
// Filter applied
gtag('event', 'filter_applied', {
  filter_type: 'time' | 'genre' | 'ingredient_count',
  filter_value: string,
  total_active_filters: number,
  result_count: number,
  user_id?: string  // if authenticated
})

// Filter cleared
gtag('event', 'filter_cleared', {
  filter_type: 'time' | 'genre' | 'ingredient_count' | 'all',
  previous_result_count: number
})

// No results scenario
gtag('event', 'filter_no_results', {
  active_filters: string[],  // e.g., ["time:15-30", "genre:japanese"]
  user_id?: string
})

// Mobile drawer interaction
gtag('event', 'filter_drawer_opened', {
  page_type: 'category' | 'search' | 'home'
})
```

**Implementation Location**:

- Centralized in `/src/utils/analytics.ts`
- Called from filter hooks when state changes
- Debounced to avoid excessive events (wait 500ms after last change)

**Alternatives Considered**:

- Custom analytics solution: Rejected - GA4 already integrated, standard tool
- No analytics: Rejected - violates constitution, can't measure success
- Server-side tracking only: Rejected - misses client-side interactions

**References**:

- [GA4 Custom Events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Analytics Integration](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

### 6. URL Parameter Encoding Strategy

**Decision**: Use comma-separated values for multi-select (genres), single values for single-select (time, ingredient count)

**Rationale**:

- URLSearchParams supports multiple same-key params but harder to read
- Comma-separated is human-readable and shorter
- Aligns with common URL patterns (e.g., YouTube filters)
- Easy to encode/decode with `split(',')` and `join(',')`

**Encoding Format**:

```
?time=15-30&genre=japanese,italian&ingredients=5
```

**Mapping**:

- `time`: `"0-15"` | `"15-30"` | `"30-45"` | `"45-60"` | `"60+"` | undefined
- `genre`: comma-separated genre IDs (e.g., `"japanese,italian,dessert"`)
- `ingredients`: `"0-5"` | `"6-10"` | `"11-15"` | `"16-20"` | `"20+"` | undefined

**Special Cases**:

- Empty filter: omit parameter entirely (not `?time=`)
- Invalid values: ignore and use defaults
- URL decoding: handle spaces and special chars with `decodeURIComponent`

**Implementation**:

```typescript
function encodeFilters(filters: FilterState): string {
  const params = new URLSearchParams()
  if (filters.timeRange) params.set('time', filters.timeRange)
  if (filters.genres.length > 0) params.set('genre', filters.genres.join(','))
  if (filters.ingredientRange) params.set('ingredients', filters.ingredientRange)
  return params.toString()
}

function decodeFilters(searchParams: URLSearchParams): FilterState {
  return {
    timeRange: searchParams.get('time') || undefined,
    genres: searchParams.get('genre')?.split(',').filter(Boolean) || [],
    ingredientRange: searchParams.get('ingredients') || undefined
  }
}
```

**Alternatives Considered**:

- JSON in single parameter: Rejected - not human-readable, harder to share
- Multiple same-key parameters: Rejected - less readable URLs
- Base64 encoding: Rejected - obscures filter values, harder to debug

---

## Summary of Technical Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| URL State | Next.js useSearchParams + useRouter | Native Next.js pattern, no extra deps |
| Mobile UI | shadcn/ui Sheet component | Accessible, consistent with design system |
| Filter Logic | Pure function with AND/OR hybrid | Testable, performant, clear logic |
| Accessibility | Comprehensive ARIA + keyboard nav | Constitutional compliance, inclusive |
| Analytics | GA4 custom events | Observability, data-driven optimization |
| URL Encoding | Comma-separated multi-values | Human-readable, standard pattern |

## Open Questions

None - all technical unknowns have been resolved.

## Next Steps

Proceed to Phase 1:

1. Generate data-model.md (filter state types)
2. Generate contracts/ (TypeScript interfaces)
3. Generate quickstart.md (developer guide)
4. Update agent context
