# Quickstart: Basic Recipe Filtering

**Feature**: 001-recipe-filter  
**For**: Developers implementing the recipe filtering feature  
**Prerequisites**: Familiarity with Next.js 16 App Router, TypeScript, React hooks

## Overview

This guide provides a step-by-step walkthrough for implementing client-side recipe filtering with URL parameter state management.

## Architecture Summary

```
User clicks filter
       ↓
Component updates FilterState
       ↓
Hook encodes state to URL params
       ↓
Next.js router updates URL (no reload)
       ↓
Filter function filters recipes
       ↓
UI re-renders with filtered results
```

**Key Points**:

- Client-side only (no API calls for filtering)
- URL is source of truth for filter state
- Filters use hybrid logic: OR within type, AND across types
- Works with existing recipe data from microCMS

## Implementation Steps

### Step 1: Set Up Type Definitions

Copy type definitions from contracts to your project:

```bash
# Create types file in your lib
cp specs/001-recipe-filter/contracts/filter-types.ts src/lib/filters/filterTypes.ts
```

Or import directly from spec contracts (if keeping specs in repo):

```typescript
// src/lib/filters/filterTypes.ts
export * from '@/specs/001-recipe-filter/contracts/filter-types';
```

### Step 2: Implement Core Filter Logic

Create the filter function that operates on recipe arrays:

```typescript
// src/lib/filters/filterRecipes.ts
import type { FilterState, RecipeMetadata } from './filterTypes';

export function filterRecipes(
  recipes: RecipeMetadata[],
  filters: FilterState
): RecipeMetadata[] {
  return recipes.filter(recipe => {
    // Time filter (AND) - single select
    if (filters.timeRange) {
      if (!recipe.cookingTime) return false;
      const range = timeRangeToMinutes(filters.timeRange);
      if (recipe.cookingTime < range.min || recipe.cookingTime > range.max) {
        return false;
      }
    }

    // Genre filter (OR within, AND across)
    if (filters.genres.length > 0) {
      if (!recipe.genres || recipe.genres.length === 0) return false;
      const hasMatch = recipe.genres.some(g => filters.genres.includes(g));
      if (!hasMatch) return false;
    }

    // Ingredient count filter (AND) - single select
    if (filters.ingredientRange) {
      if (!recipe.ingredientCount) return false;
      const range = ingredientRangeToCount(filters.ingredientRange);
      if (recipe.ingredientCount < range.min || recipe.ingredientCount > range.max) {
        return false;
      }
    }

    return true;
  });
}

// Helper: Convert time range string to numeric range
function timeRangeToMinutes(range: TimeRange): { min: number; max: number } {
  const ranges = {
    "0-15": { min: 0, max: 15 },
    "15-30": { min: 15, max: 30 },
    "30-45": { min: 30, max: 45 },
    "45-60": { min: 45, max: 60 },
    "60+": { min: 60, max: Infinity }
  };
  return ranges[range];
}

// Helper: Convert ingredient range string to numeric range
function ingredientRangeToCount(range: IngredientRange): { min: number; max: number } {
  const ranges = {
    "0-5": { min: 0, max: 5 },
    "6-10": { min: 6, max: 10 },
    "11-15": { min: 11, max: 15 },
    "16-20": { min: 16, max: 20 },
    "20+": { min: 20, max: Infinity }
  };
  return ranges[range];
}
```

### Step 3: Implement URL Parameter Handling

Create functions to sync filter state with URL parameters:

```typescript
// src/lib/filters/filterUrlParams.ts
import type { FilterState } from './filterTypes';
import { FILTER_URL_PARAMS, EMPTY_FILTER_STATE } from './filterTypes';

export function encodeFilters(filters: FilterState): string {
  const params = new URLSearchParams();
  
  if (filters.timeRange) {
    params.set(FILTER_URL_PARAMS.TIME, filters.timeRange);
  }
  
  if (filters.genres.length > 0) {
    params.set(FILTER_URL_PARAMS.GENRE, filters.genres.join(','));
  }
  
  if (filters.ingredientRange) {
    params.set(FILTER_URL_PARAMS.INGREDIENTS, filters.ingredientRange);
  }
  
  return params.toString();
}

export function decodeFilters(searchParams: URLSearchParams): FilterState {
  const timeRange = searchParams.get(FILTER_URL_PARAMS.TIME);
  const genreParam = searchParams.get(FILTER_URL_PARAMS.GENRE);
  const ingredientRange = searchParams.get(FILTER_URL_PARAMS.INGREDIENTS);
  
  // Validate and parse
  return {
    timeRange: isValidTimeRange(timeRange) ? timeRange : undefined,
    genres: genreParam ? genreParam.split(',').filter(Boolean) : [],
    ingredientRange: isValidIngredientRange(ingredientRange) ? ingredientRange : undefined,
  };
}

// Validation helpers
function isValidTimeRange(value: string | null): value is TimeRange {
  return value !== null && ["0-15", "15-30", "30-45", "45-60", "60+"].includes(value);
}

function isValidIngredientRange(value: string | null): value is IngredientRange {
  return value !== null && ["0-5", "6-10", "11-15", "16-20", "20+"].includes(value);
}
```

### Step 4: Create Filter State Hook

Build a custom hook to manage filter state and URL synchronization:

```typescript
// src/hooks/useRecipeFilters.ts
'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import type { FilterState, RecipeMetadata } from '@/lib/filters/filterTypes';
import { EMPTY_FILTER_STATE } from '@/lib/filters/filterTypes';
import { encodeFilters, decodeFilters } from '@/lib/filters/filterUrlParams';
import { filterRecipes } from '@/lib/filters/filterRecipes';

export function useRecipeFilters(recipes: RecipeMetadata[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Parse current filters from URL
  const filters = useMemo(
    () => decodeFilters(searchParams),
    [searchParams]
  );
  
  // Filter recipes based on current state
  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, filters),
    [recipes, filters]
  );
  
  // Update filters (updates URL)
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    const queryString = encodeFilters(updatedFilters);
    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);
  
  // Clear specific filter
  const clearFilter = useCallback((filterType: keyof FilterState) => {
    const clearedFilters = { ...filters };
    if (filterType === 'genres') {
      clearedFilters.genres = [];
    } else {
      clearedFilters[filterType] = undefined;
    }
    const queryString = encodeFilters(clearedFilters);
    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push(window.location.pathname, { scroll: false });
  }, [router]);
  
  // Check if any filters are active
  const hasActiveFilters = filters.timeRange !== undefined ||
                          filters.genres.length > 0 ||
                          filters.ingredientRange !== undefined;
  
  return {
    filters,
    filteredRecipes,
    updateFilters,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    resultCount: filteredRecipes.length,
  };
}
```

### Step 5: Build Filter UI Components

#### Time Filter (Radio Group)

```typescript
// src/components/filters/TimeFilter.tsx
'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TIME_FILTER_OPTIONS } from '@/lib/filters/filterTypes';
import type { TimeRange } from '@/lib/filters/filterTypes';

interface TimeFilterProps {
  value?: TimeRange;
  onChange: (value: TimeRange | undefined) => void;
}

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Cooking Time</h3>
      <RadioGroup value={value} onValueChange={(v) => onChange(v as TimeRange)}>
        {TIME_FILTER_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`time-${option.value}`} />
            <Label htmlFor={`time-${option.value}`} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {value && (
        <button
          onClick={() => onChange(undefined)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

#### Genre Filter (Checkboxes)

```typescript
// src/components/filters/GenreFilter.tsx
'use client'

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Genre } from '@/lib/filters/filterTypes';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: string[];
  onChange: (genreIds: string[]) => void;
}

export function GenreFilter({ genres, selectedGenres, onChange }: GenreFilterProps) {
  const handleToggle = (genreId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedGenres, genreId]);
    } else {
      onChange(selectedGenres.filter(id => id !== genreId));
    }
  };
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Genre</h3>
      <div className="space-y-2">
        {genres.map((genre) => (
          <div key={genre.id} className="flex items-center space-x-2">
            <Checkbox
              id={`genre-${genre.id}`}
              checked={selectedGenres.includes(genre.id)}
              onCheckedChange={(checked) => handleToggle(genre.id, checked as boolean)}
            />
            <Label htmlFor={`genre-${genre.id}`} className="cursor-pointer">
              {genre.name}
            </Label>
          </div>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

### Step 6: Integrate Filters into Page

```typescript
// src/app/recipes/page.tsx (or relevant listing page)
'use client'

import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import { TimeFilter } from '@/components/filters/TimeFilter';
import { GenreFilter } from '@/components/filters/GenreFilter';
import { IngredientCountFilter } from '@/components/filters/IngredientCountFilter';

export default function RecipesPage({ recipes, genres }) {
  const {
    filters,
    filteredRecipes,
    updateFilters,
    clearAllFilters,
    hasActiveFilters,
    resultCount,
  } = useRecipeFilters(recipes);
  
  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 sticky top-20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-sm text-blue-600">
                Clear all
              </button>
            )}
          </div>
          
          <TimeFilter
            value={filters.timeRange}
            onChange={(value) => updateFilters({ timeRange: value })}
          />
          
          <GenreFilter
            genres={genres}
            selectedGenres={filters.genres}
            onChange={(genres) => updateFilters({ genres })}
          />
          
          <IngredientCountFilter
            value={filters.ingredientRange}
            onChange={(value) => updateFilters({ ingredientRange: value })}
          />
        </div>
      </aside>
      
      {/* Recipe List */}
      <main className="flex-1">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {resultCount} recipes found
          </p>
        </div>
        
        <RecipeGrid recipes={filteredRecipes} />
      </main>
    </div>
  );
}
```

## Testing Checklist

- [ ] Time filter excludes recipes without `cookingTime`
- [ ] Genre filter uses OR logic (Japanese OR Italian)
- [ ] Multiple filter types use AND logic (Time AND Genre)
- [ ] URL parameters update when filters change
- [ ] Browser back/forward buttons work correctly
- [ ] Filter state initializes from URL on page load
- [ ] Shared URLs restore filter state for recipients
- [ ] "Clear all" removes all URL parameters
- [ ] Mobile drawer opens/closes properly
- [ ] Keyboard navigation works for all controls
- [ ] Screen reader announces filter changes
- [ ] Analytics events fire on filter changes

## Common Patterns

### Pattern: Debounced URL Updates

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedUpdate = useDebouncedCallback((filters) => {
  const queryString = encodeFilters(filters);
  router.push(`?${queryString}`, { scroll: false });
}, 300);
```

### Pattern: Filter Result Count

```typescript
function getFilterOptionCounts(recipes: RecipeMetadata[], currentFilters: FilterState) {
  return TIME_FILTER_OPTIONS.map(option => ({
    ...option,
    count: filterRecipes(recipes, { ...currentFilters, timeRange: option.value }).length
  }));
}
```

### Pattern: Analytics Tracking

```typescript
import { trackFilterApplied } from '@/utils/analytics';

const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
  const updatedFilters = { ...filters, ...newFilters };
