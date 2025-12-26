# Data Model: Basic Recipe Filtering

**Feature**: 001-recipe-filter  
**Date**: 2025-12-26  
**Purpose**: Define data structures and state management for recipe filtering

## Overview

This document defines the data model for client-side recipe filtering, including filter state representation, URL parameter encoding, and recipe metadata requirements.

## Core Entities

### 1. FilterState

Represents the current active filter selections.

**Purpose**: Central state for all filter selections, synced with URL parameters

**Fields**:

| Field | Type | Optional | Description | Validation |
|-------|------|----------|-------------|------------|
| `timeRange` | `TimeRange` | Yes | Selected cooking time range | Must match predefined ranges |
| `genres` | `string[]` | No | Selected genre IDs (OR logic) | Each must exist in genre taxonomy |
| `ingredientRange` | `IngredientRange` | Yes | Selected ingredient count range | Must match predefined ranges |

**Example**:

```typescript
{
  timeRange: "15-30",
  genres: ["japanese", "italian"],
  ingredientRange: "5-"
}
```

**State Transitions**:

- **Initial State**: All fields empty/undefined (no filters active)
- **Single Filter Applied**: One field populated
- **Multiple Filters Applied**: Multiple fields populated (AND logic across types)
- **Filter Cleared**: Specific field reset to empty/undefined
- **All Filters Cleared**: All fields reset to initial state

**Validation Rules**:

- `timeRange`: Must be one of predefined `TimeRange` values or undefined
- `genres`: Array can be empty (no genre filter), but each entry must be valid genre ID
- `ingredientRange`: Must be one of predefined `IngredientRange` values or undefined
- At least one filter should be active for filtered state (all empty = no filtering)

---

### 2. TimeRange

Enumeration of cooking time filter options (single-select).

**Purpose**: Define available time range filters

**Type**: String literal union

**Values**:

```typescript
type TimeRange = "0-15" | "15-30" | "30-45" | "45-60" | "60+"
```

**Display Labels**:

| Value | Display Label | Min Minutes | Max Minutes |
|-------|---------------|-------------|-------------|
| `"0-15"` | "15 minutes or less" | 0 | 15 |
| `"15-30"` | "15-30 minutes" | 15 | 30 |
| `"30-45"` | "30-45 minutes" | 30 | 45 |
| `"45-60"` | "45-60 minutes" | 45 | 60 |
| `"60+"` | "Over 60 minutes" | 60 | Infinity |

**Conversion Logic**:

```typescript
function timeRangeToMinutes(range: TimeRange): { min: number; max: number } {
  const ranges = {
    "0-15": { min: 0, max: 15 },
    "15-30": { min: 15, max: 30 },
    "30-45": { min: 30, max: 45 },
    "45-60": { min: 45, max: 60 },
    "60+": { min: 60, max: Infinity }
  }
  return ranges[range]
}
```

---

### 3. IngredientRange

Enumeration of ingredient count filter options (single-select).

**Purpose**: Define available ingredient count filters

**Type**: String literal union

**Values**:

```typescript
type IngredientRange = "0-5" | "6-10" | "11-15" | "16-20" | "20+"
```

**Display Labels**:

| Value | Display Label | Min Count | Max Count |
|-------|---------------|-----------|-----------|
| `"0-5"` | "5 or less" | 0 | 5 |
| `"6-10"` | "6-10 ingredients" | 6 | 10 |
| `"11-15"` | "11-15 ingredients" | 11 | 15 |
| `"16-20"` | "16-20 ingredients" | 16 | 20 |
| `"20+"` | "More than 20" | 20 | Infinity |

**Conversion Logic**:

```typescript
function ingredientRangeToCount(range: IngredientRange): { min: number; max: number } {
  const ranges = {
    "0-5": { min: 0, max: 5 },
    "6-10": { min: 6, max: 10 },
    "11-15": { min: 11, max: 15 },
    "16-20": { min: 16, max: 20 },
    "20+": { min: 20, max: Infinity }
  }
  return ranges[range]
}
```

---

### 4. Genre

Represents a recipe genre/category for filtering.

**Purpose**: Connect to existing microCMS category taxonomy

**Note**: Genres are sourced from existing microCMS data. This entity documents the expected structure.

**Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique genre identifier (used in URLs and filters) |
| `name` | `string` | Display name for the genre |

**Example**:

```typescript
{
  id: "japanese",
  name: "和食"
}
```

**Source**: Fetched from microCMS category API (existing functionality)

---

### 5. RecipeMetadata

Subset of recipe data relevant for filtering.

**Purpose**: Define minimum recipe fields required for filter operations

**Fields**:

| Field | Type | Optional | Description | Source |
|-------|------|----------|-------------|--------|
| `id` | `string` | No | Recipe unique identifier | microCMS |
| `cookingTime` | `number` | Yes | Total cooking time in minutes | microCMS |
| `genres` | `string[]` | Yes | Array of genre IDs | microCMS categories |
| `ingredientCount` | `number` | Yes | Number of ingredients | microCMS or computed |

**Filtering Behavior**:

- Recipes with undefined `cookingTime` excluded from time-filtered results
- Recipes with empty/undefined `genres` excluded from genre-filtered results
- Recipes with undefined `ingredientCount` excluded from ingredient-count-filtered results
- Recipes with missing data appear in unfiltered views

**Example**:

```typescript
{
  id: "recipe-123",
  cookingTime: 25,
  genres: ["japanese", "dinner"],
  ingredientCount: 8
}
```

---

### 6. FilterOption

Represents a single selectable filter option in the UI.

**Purpose**: Generic structure for rendering filter controls

**Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Filter value (used in state and URLs) |
| `label` | `string` | Display label for UI |
| `count` | `number` | Optional: number of recipes matching this filter |

**Usage**:

- Time filter options (radio buttons)
- Ingredient count filter options (radio buttons)
- Genre filter options (checkboxes)

**Example**:

```typescript
{
  value: "15-30",
  label: "15-30 minutes",
  count: 42  // Optional: 42 recipes in this range
}
```

---

## State Management

### URL Parameter Schema

**Format**: `?time=<range>&genre=<id1>,<id2>&ingredients=<range>`

**Parameters**:

| Parameter | Type | Format | Example |
|-----------|------|--------|---------|
| `time` | Single value | TimeRange string | `?time=15-30` |
| `genre` | Multi-value | Comma-separated IDs | `?genre=japanese,italian` |
| `ingredients` | Single value | IngredientRange string | `?ingredients=0-5` |

**Encoding Rules**:

1. Omit parameter if filter not active
2. URL-encode special characters
3. Comma-separate multiple genres (no spaces)
4. No empty values (remove parameter instead)

**Examples**:

```
# Single filter
?time=15-30

# Multiple filters
?time=15-30&genre=japanese,italian&ingredients=0-5

# Genre filter only
?genre=japanese

# No filters (empty query string)
/recipes
```

---

### State Synchronization

**Flow**:

```
User Interaction → FilterState Update → URL Update → Re-render with New Filters
                                     ↓
                              Browser History Entry
```

**Key Points**:

1. **URL is source of truth**: Always initialize from URL params
2. **Bidirectional sync**: UI changes update URL, URL changes update UI
3. **No full page reload**: Use `router.push()` with `scroll: false`
4. **Session persistence**: Browser maintains URL history
5. **Shareable state**: URL can be copied and shared

---

## Relationships

```
FilterState
├── timeRange?: TimeRange
│   └── Converts to { min, max } for filtering
├── genres: string[]
│   └── References Genre.id (from microCMS)
└── ingredientRange?: IngredientRange
    └── Converts to { min, max } for filtering

RecipeMetadata
├── cookingTime? (filtered by TimeRange)
├── genres? (filtered by Genre IDs)
└── ingredientCount? (filtered by IngredientRange)

URL Parameters ↔ FilterState (bidirectional)
```

---

## Filter Logic Specification

### Algorithm

For each recipe, apply filters with AND logic across filter types:

1. **If timeRange is set**: Recipe must have `cookingTime` within range OR be excluded
2. **If genres array is not empty**: Recipe must have at least one matching genre (OR within genres) OR be excluded
3. **If ingredientRange is set**: Recipe must have `ingredientCount` within range OR be excluded
4. **If all checks pass**: Include recipe in filtered results

### Pseudo-code

```
function filterRecipes(recipes, filterState):
  result = []
  
  for each recipe in recipes:
    // Time filter check (AND)
    if filterState.timeRange is set:
      if recipe.cookingTime is undefined:
        continue  // Exclude recipe
      if recipe.cookingTime not in range(filterState.timeRange):
        continue  // Exclude recipe
    
    // Genre filter check (OR within, AND across)
    if filterState.genres is not empty:
      if recipe.genres is empty or undefined:
        continue  // Exclude recipe
      if no overlap between recipe.genres and filterState.genres:
        continue  // Exclude recipe
    
    // Ingredient count filter check (AND)
    if filterState.ingredientRange is set:
      if recipe.ingredientCount is undefined:
        continue  // Exclude recipe
      if recipe.ingredientCount not in range(filterState.ingredientRange):
        continue  // Exclude recipe
    
    // Recipe passed all filters
    result.add(recipe)
  
  return result
```

---

## Performance Considerations

### Scale Assumptions

- **Recipe Count**: <10,000 recipes (current scale)
- **Filter Operations**: ~100-500 ms for full dataset
- **UI Update**: <100 ms after filter change

### Optimization Strategies

1. **Memoization**: Cache filtered results until FilterState changes
2. **Debouncing**: Wait 300ms after last filter change before updating URL
3. **Lazy Loading**: Only filter visible recipes if pagination implemented
4. **Future**: Consider Web Workers if dataset exceeds 50,000 recipes

---

## Validation Rules

### Input Validation

- **Time Range**: Must match TimeRange enum or be undefined
- **Genres**: Each entry must exist in available genres list
- **Ingredient Range**: Must match IngredientRange enum or be undefined

### URL Parameter Validation

- **Invalid time**: Ignore and treat as no time filter
- **Invalid genre**: Filter out invalid IDs, keep valid ones
- **Invalid ingredient range**: Ignore and treat as no ingredient filter
- **Malformed parameters**: Parse what's valid, ignore rest

### Edge Cases

- Empty filter state → Show all recipes
- All filters active but no matches → Show "No recipes found" message
- Recipe missing all filterable fields → Only appears in unfiltered view
- URL with conflicting filters → Accept as-is (user may want to see "no results")

---

## Summary

This data model provides:

- ✅ Type-safe filter state representation
- ✅ Clear URL parameter encoding schema
- ✅ Explicit filter logic specification (AND/OR hybrid)
- ✅ Recipe metadata requirements
- ✅ Validation rules for all inputs
- ✅ Performance considerations for scale

Next: Generate TypeScript interfaces in contracts/
