# Data Model: Homepage Design Redesign

**Feature**: Homepage Design Redesign  
**Branch**: `002-homepage-redesign`  
**Date**: 2026-01-28

## Purpose

This document defines the data structures and state management for the homepage redesign feature. Since this is primarily a visual/styling update, the data model focuses on client-side UI state rather than backend entities.

## Client-Side State Models

### 1. Favorite Recipes State

**Purpose**: Track which recipes the user has marked as favorite for persistence across sessions.

**Storage**: Browser localStorage

**Structure**:

```typescript
// localStorage key: 'recipe-favorites'
type FavoriteRecipes = string[] // Array of recipe IDs

// Example stored value:
// ["recipe-001", "recipe-042", "recipe-123"]
```

**Fields**:

- **Recipe IDs** (string[]): Array of unique recipe identifiers
  - Format: String IDs as provided by microCMS
  - No duplicates (Set-like behavior enforced in code)
  - No size limit enforced (typical usage: 0-50 favorites)

**Operations**:

- `loadFavorites()`: Read from localStorage, return array (empty if not found or error)
- `saveFavorites(ids: string[])`: Write to localStorage, return success boolean
- `toggleFavorite(id: string)`: Add if not present, remove if present
- `isFavorite(id: string)`: Check if ID exists in favorites

**Validation Rules**:

- Must be valid JSON array
- All elements must be strings
- Gracefully handle corrupted data (return empty array)
- Handle storage quota exceeded (return false, continue with session-only state)

**Lifecycle**:

1. **Page Load**: Read from localStorage, initialize state
2. **User Interaction**: Toggle favorite → update state → save to localStorage
3. **Render**: Check each recipe against favorites to determine heart icon state
4. **Error Handling**: If save fails, state persists in memory for current session only

---

### 2. Header Scroll State

**Purpose**: Track whether user has scrolled past threshold to apply "scrolled" styling to header.

**Storage**: React component state (no persistence)

**Structure**:

```typescript
interface HeaderScrollState {
  isScrolled: boolean // true if scrollY > threshold (50px)
}
```

**Fields**:

- **isScrolled** (boolean): Whether scroll threshold has been crossed
  - `true`: Apply compact header styles (reduced padding, shadow)
  - `false`: Apply default header styles (normal padding, no shadow)

**Operations**:

- `useScrolled(threshold: number)`: Custom hook that returns isScrolled boolean
- Updates on scroll event (passive listener for performance)
- Checks initial state on mount

**Lifecycle**:

1. **Component Mount**: Attach scroll listener, check initial scroll position
2. **User Scrolls**: Update state when crossing 50px threshold
3. **Component Unmount**: Remove scroll listener

---

### 3. Tab Navigation State

**Purpose**: Track which tab is currently active (visual state only, no content filtering in this phase).

**Storage**: React component state (no persistence)

**Structure**:

```typescript
type TabId = 'all' | 'recommended' | 'categories' | 'favorites'

interface TabState {
  activeTab: TabId
}
```

**Fields**:

- **activeTab** (TabId): Currently selected tab identifier
  - Default: `'all'` (すべてのレシピ)
  - Options: `'all'`, `'recommended'`, `'categories'`, `'favorites'`

**Operations**:

- `setActiveTab(tabId: TabId)`: Update active tab (visual state only)
- Tab click updates state but does NOT filter content in this phase

**Lifecycle**:

1. **Component Mount**: Initialize with `'all'` as default
2. **User Clicks Tab**: Update activeTab state, render visual indicator
3. **Content**: Remains unchanged (all recipes always displayed)

**Note**: Content filtering functionality deferred to future enhancement. This phase implements visual tab switching only.

---

### 4. Animation State

**Purpose**: Track whether animations should be reduced based on user's motion preferences.

**Storage**: CSS media query detection (no state management)

**Structure**:

```typescript
// Detected via CSS media query, no JavaScript state needed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

**Behavior**:

- **Normal**: Full animations (staggered cards, hover effects, transforms)
- **Reduced Motion**: Simplified animations (0.15s duration, no transforms, opacity only)

**Implementation**: CSS-only via `@media (prefers-reduced-motion: reduce)` - no JavaScript state required

---

## Existing Data Models (No Changes)

These existing data structures from microCMS are used but NOT modified:

### Recipe Preview Data

```typescript
// Existing structure from microCMS (read-only for this feature)
interface RecipePreview {
  recipeId: string
  title: string
  description: string
  thumbnailUrl: string
  category: string // e.g., "和食", "中華", "地中海食"
  likes: number
  cookingTime: number // minutes
  servings: number
  tags: string[]
}
```

**Usage**: Display recipe cards with new styling, no structure changes

---

## State Management Architecture

### Component Hierarchy

```
App
└── Homepage
    ├── Header (uses: HeaderScrollState)
    │   ├── Logo (click behavior based on current route)
    │   └── Tagline (responsive visibility)
    ├── HeroSection
    │   ├── SearchBox (styling only, existing functionality)
    │   └── TabNavigation (uses: TabState)
    ├── RecipeSection (New Recipes)
    │   ├── SectionHeader
    │   └── RecipeGrid
    │       └── RecipeCard[] (uses: FavoriteRecipes)
    │           ├── RecipeImage
    │           ├── CategoryBadge
    │           ├── FavoriteButton (manages: FavoriteRecipes)
    │           └── RecipeMetadata
    └── RecipeSection (Popular Recipes)
        └── [same structure as New Recipes]
```

### State Flow Diagrams

#### Favorite Toggle Flow

```
User clicks heart button
  → Check current favorite status (from state)
  → Toggle in state (add/remove recipe ID)
  → Save to localStorage
  → If save fails: set storageAvailable=false, show warning
  → Re-render heart icon (filled/outline)
```

#### Scroll Detection Flow

```
Page loads
  → useScrolled hook attaches scroll listener
  → User scrolls
  → Check if scrollY > 50px
  → Update isScrolled state
  → Header component re-renders with new className
  → CSS applies transition effects
```

#### Tab Navigation Flow (Visual Only)

```
User clicks tab
  → Update activeTab state
  → Re-render tabs with new active indicator
  → Content remains unchanged (all recipes still visible)
```

---

## Custom Hooks API

### useFavorites

```typescript
interface UseFavoritesReturn {
  favorites: string[]
  isFavorite: (recipeId: string) => boolean
  toggleFavorite: (recipeId: string) => void
  storageAvailable: boolean
}

const useFavorites = (): UseFavoritesReturn
```

**Responsibilities**:

- Load favorites from localStorage on mount
- Provide toggle function with localStorage persistence
- Track storage availability for error handling
- Memoize functions to prevent unnecessary re-renders

### useScrolled

```typescript
const useScrolled = (threshold: number = 50): boolean
```

**Responsibilities**:

- Attach passive scroll event listener
- Debounce unnecessary state updates (RAF or simple threshold check)
- Return boolean indicating scroll state
- Clean up listener on unmount

---

## localStorage Schema

### Storage Keys

```typescript
const STORAGE_KEYS = {
  FAVORITES: 'recipe-favorites', // string[]
} as const
```

### Data Format

```json
{
  "recipe-favorites": ["recipe-001", "recipe-042", "recipe-123"]
}
```

### Size Estimation

- Average recipe ID: ~12 characters
- 100 favorites: ~1.2KB
- 1000 favorites: ~12KB
- Well within 5MB localStorage limit

### Error Handling

| Error | Handling Strategy |
|-------|------------------|
| QuotaExceededError | Log warning, continue with session-only state |
| SecurityError (disabled) | Catch and ignore, session-only state |
| Invalid JSON | Return empty array, log error |
| Corrupted data | Return empty array, attempt to clear and reset |

---

## Theme Configuration

### Color Palette (CSS Custom Properties)

```css
:root {
  /* Backgrounds */
  --color-bg-primary: #f8f7f4;    /* Cream background */
  --color-bg-secondary: #ffffff;   /* White cards */
  
  /* Text */
  --color-text-primary: #2d3436;   /* Dark text */
  --color-text-secondary: #636e72; /* Secondary text */
  --color-text-muted: #95a3ab;     /* Muted text */
  
  /* Accents */
  --color-accent-primary: #e17055;   /* Coral primary */
  --color-accent-secondary: #fab1a0; /* Coral light */
  
  /* Borders & Shadows */
  --color-border: #e8e6e1;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
}
```

### Typography Scale

```typescript
const typography = {
  fonts: {
    serif: 'var(--font-crimson)', // Crimson Pro for headings
    sans: 'var(--font-outfit)',   // Outfit for body
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  sizes: {
    'recipe-title': '1.35rem',
    'section-title': '2rem',
    'body': '1rem',
    'small': '0.85rem',
  }
}
```

### Animation Timing

```css
:root {
  --timing-fast: 0.15s;
  --timing-normal: 0.3s;
  --timing-slow: 0.6s;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --timing-fast: 0.15s;
    --timing-normal: 0.15s;
    --timing-slow: 0.15s;
  }
}
```

---

## Validation & Constraints

### Favorite Management

- ✅ Must handle localStorage unavailable gracefully
- ✅ Must validate recipe IDs are strings
- ✅ Must prevent duplicate IDs in favorites array
- ✅ Must handle corrupted localStorage data
- ✅ Must work in private/incognito mode (session-only fallback)

### Performance

- ✅ Favorites check must be O(1) or O(n) with small n
- ✅ Scroll listener must use passive events
- ✅ State updates must not cause unnecessary re-renders
- ✅ localStorage operations must be wrapped in try-catch

### Accessibility

- ✅ Favorite button must announce state to screen readers
- ✅ Tab navigation must be keyboard accessible
- ✅ Header scroll state must not affect screen reader navigation
- ✅ Motion preferences must be respected

---

## Migration & Backwards Compatibility

**Current Implementation**: Favorites may already exist via existing localStorage implementation

**Migration Strategy**:

1. Check for existing favorites data on first load
2. Validate format matches expected structure
3. If invalid, log warning and reset to empty array
4. No data migration needed (read-only visual redesign)

**Rollback**: Remove new localStorage key if feature is rolled back (no data loss risk)

---

## Testing Considerations

### Unit Tests

- useFavorites hook: toggle, persistence, error handling
- useScrolled hook: threshold detection, cleanup
- localStorage utils: save, load, error cases

### Integration Tests

- Favorite button click → localStorage → state → UI update
- Scroll behavior → header style change
- Tab click → active state → visual indicator

### Manual Testing

- Test in incognito mode (storage disabled)
- Test with localStorage quota filled
- Test with prefers-reduced-motion enabled
- Test scroll behavior on iOS Safari (bounce scrolling)
- Test tab navigation on mobile (horizontal scroll)

---

## Next Steps

With data model defined, proceed to:

1. Generate quickstart.md (local development setup)
2. Update agent context with new hooks and utilities
3. Generate tasks.md via `/speckit.tasks` command
