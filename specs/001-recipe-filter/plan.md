# Implementation Plan: Basic Recipe Filtering

**Branch**: `001-recipe-filter` | **Date**: 2025-12-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-recipe-filter/spec.md`

## Summary

Implement client-side recipe filtering functionality allowing users to filter recipes by cooking time, genre/category, and ingredient count. Filters will be displayed in a responsive sidebar on desktop and collapsible drawer on mobile, with filter state encoded in URL query parameters for shareability and browser navigation support. The feature uses hybrid filter logic (OR within filter types, AND across filter types) and requires URL parameter handling for state persistence.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.10 (React 19.0.0)  
**Primary Dependencies**: Next.js App Router, React Server Components, Tailwind CSS 3.4+, shadcn/ui, microCMS (content source)  
**Storage**: No additional storage - filters query existing recipe data from microCMS  
**Testing**: Jest + React Testing Library (unit tests), Playwright (E2E tests - when implemented)  
**Target Platform**: Web application (Vercel hosted), responsive design for mobile/tablet/desktop  
**Project Type**: Web application with Next.js App Router  
**Performance Goals**: Filter results display <3s, page load <2s, Lighthouse score >90  
**Constraints**: Client-side filtering for <10,000 recipes (current scale), session-only persistence, URL parameters for shareability  
**Scale/Scope**: ~3-5 filter components, URL parameter encoding/decoding, responsive UI with sidebar/drawer patterns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Performance-First Architecture ✅ PASS

- Filter operations are client-side with <3s response time requirement
- No additional API calls during filtering (operates on already-loaded recipe data)
- URL parameter changes don't trigger full page reloads in Next.js App Router
- Component lazy-loading possible for mobile drawer

### SEO & Discoverability Excellence ✅ PASS

- Filtered URLs are shareable and bookmarkable (FR-011)
- URL parameters enable search engines to discover filtered views
- Semantic HTML required for filter controls (checkboxes, radio buttons)
- Filter state in URL improves deep-linking capabilities

### Accessibility is Mandatory ⚠️ REQUIRES ATTENTION

- Keyboard navigation MUST work for all filter controls
- Screen reader announcements MUST occur when filters update results
- Focus management required when mobile drawer opens/closes
- ARIA labels required for filter controls and active filter tags
- Color contrast for filter UI must meet WCAG AA standards

### Security & Privacy by Design ✅ PASS

- No user data collection for filtering feature
- No sensitive information in URL parameters (only filter criteria)
- Client-side only - no server-side state to secure
- Input validation on URL parameters to prevent injection

### Content Management Scalability ✅ PASS

- Filters operate on existing microCMS data structure
- No new content types required
- Uses existing recipe metadata (time, genres, ingredient count)
- No CMS changes needed

### Modern Design System Consistency ✅ PASS

- Filter UI built with shadcn/ui components (Checkbox, RadioGroup, Button, Sheet for drawer)
- Tailwind CSS for all styling
- Responsive design using Tailwind breakpoints
- Consistent with existing design system

### Observability & Analytics ⚠️ REQUIRES ATTENTION

- Filter usage MUST be tracked in Google Analytics 4
- Track: filter type used, combinations applied, "no results" scenarios
- Performance monitoring for filter response times
- User engagement with filter UI (open/close drawer on mobile)

**Overall Status**: ✅ PASS with attention items

- Accessibility testing and ARIA implementation required
- Analytics tracking must be included in implementation
- All other principles align with feature requirements

## Project Structure

### Documentation (this feature)

```text
specs/001-recipe-filter/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── filter-api.ts   # TypeScript interfaces for filter operations
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── [mainCategoryId]/
│   │   └── page.tsx                    # Update to support filter URL params
│   ├── search/
│   │   └── page.tsx                    # Update to support filter URL params
│   └── p/[current]/
│       └── page.tsx                    # Update to support filter URL params
├── components/
│   ├── filters/                        # NEW: Filter components
│   │   ├── FilterSidebar.tsx          # Desktop sidebar container
│   │   ├── FilterDrawer.tsx           # Mobile/tablet drawer
│   │   ├── FilterSection.tsx          # Individual filter section wrapper
│   │   ├── TimeFilter.tsx             # Cooking time filter (radio group)
│   │   ├── GenreFilter.tsx            # Genre/category filter (checkboxes)
│   │   ├── IngredientCountFilter.tsx  # Ingredient count filter (radio group)
│   │   ├── ActiveFilters.tsx          # Active filter pills with remove buttons
│   │   └── FilterButton.tsx           # Mobile "Show Filters" button
│   ├── ui/
│   │   └── sheet.tsx                  # shadcn/ui Sheet for mobile drawer
│   └── main-category-recipe/
│       └── MainCategoryRecipes.tsx     # Update to integrate filters
├── hooks/
│   ├── useRecipeFilters.ts            # NEW: Filter state management hook
│   └── useFilterUrlParams.ts          # NEW: URL parameter sync hook
├── lib/
│   └── filters/
│       ├── filterRecipes.ts           # NEW: Client-side filter logic
│       ├── filterUrlParams.ts         # NEW: URL encoding/decoding
│       └── filterTypes.ts             # NEW: TypeScript types for filters
└── utils/
    └── analytics.ts                    # Update to add filter tracking

tests/
├── unit/
│   ├── filterRecipes.test.ts          # Unit tests for filter logic
│   └── filterUrlParams.test.ts        # Unit tests for URL handling
└── integration/
    └── recipe-filtering.test.tsx       # Integration tests for filter UI
```

**Structure Decision**: Single web application (Option 1 adapted). The filtering feature is entirely client-side and integrates into existing recipe listing pages. New filter components follow the established component structure, with hooks for state management and URL synchronization. Filter logic is isolated in `/lib/filters` for testability.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations requiring justification. All constitution principles are satisfied with the current design.
