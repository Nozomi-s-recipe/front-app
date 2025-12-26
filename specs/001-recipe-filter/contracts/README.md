# Filter Contracts

This directory contains TypeScript type definitions and interfaces for the recipe filtering feature.

## Files

### [`filter-types.ts`](./filter-types.ts)

Complete type definitions for the filtering system including:

- **Filter State Types**: `FilterState`, `TimeRange`, `IngredientRange`
- **Recipe Types**: `RecipeMetadata`, `Genre`
- **UI Types**: `FilterOption`, `TimeFilterOption`, `IngredientFilterOption`
- **Function Signatures**: Type-safe signatures for all filter operations
- **Constants**: Predefined filter options and URL parameter keys

## Usage

Import types in your implementation files:

```typescript
import type {
  FilterState,
  TimeRange,
  IngredientRange,
  RecipeMetadata,
  FilterRecipesFunction,
  EncodeFiltersFunction,
  DecodeFiltersFunction,
} from '@/specs/001-recipe-filter/contracts/filter-types';

import {
  TIME_FILTER_OPTIONS,
  INGREDIENT_FILTER_OPTIONS,
  FILTER_URL_PARAMS,
  EMPTY_FILTER_STATE,
} from '@/specs/001-recipe-filter/contracts/filter-types';
```

## Type Safety Guarantees

1. **Filter State**: All filter combinations are type-safe
2. **Range Values**: Only valid range strings accepted (enforced by literal unions)
3. **Function Contracts**: All filter operations have explicit input/output types
4. **Constants**: Filter options are readonly to prevent mutation

## Validation

Types include JSDoc comments describing:

- Validation rules
- Example usage
- Expected behavior
- Edge cases

Refer to [`data-model.md`](../data-model.md) for detailed validation specifications.
