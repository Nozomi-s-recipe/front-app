# Tasks: Basic Recipe Filtering

**Input**: Design documents from `/specs/001-recipe-filter/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Web application with Next.js App Router
- Main source: `src/` at repository root
- Components: `src/components/`
- Hooks: `src/hooks/`
- Utilities: `src/lib/` and `src/utils/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create type definitions and utility functions used by all user stories

- [x] T001 [P] Copy type definitions from contracts to src/lib/filters/filterTypes.ts
- [x] T002 [P] Implement timeRangeToMinutes helper function in src/lib/filters/filterTypes.ts
- [x] T003 [P] Implement ingredientRangeToCount helper function in src/lib/filters/filterTypes.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core filtering infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Implement filterRecipes core function in src/lib/filters/filterRecipes.ts
- [x] T005 [P] Implement encodeFilters function in src/lib/filters/filterUrlParams.ts
- [x] T006 [P] Implement decodeFilters function in src/lib/filters/filterUrlParams.ts
- [x] T007 [P] Implement isValidTimeRange validation helper in src/lib/filters/filterUrlParams.ts
- [x] T008 [P] Implement isValidIngredientRange validation helper in src/lib/filters/filterUrlParams.ts
- [x] T009 Create useRecipeFilters hook in src/hooks/useRecipeFilters.ts
- [x] T010 [P] Add filter tracking events to src/utils/analytics.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Filter by Cooking Time (Priority: P1) 🎯 MVP

**Goal**: Users can filter recipes by cooking time ranges (15 min or less, 15-30, 30-45, 45-60, 60+) using single-select radio buttons. Filtered results update immediately and filter state is preserved in URL.

**Independent Test**: Select "15-30 minutes" time filter → Only recipes with cooking time between 15-30 minutes display → URL shows `?time=15-30` → Share URL with another user → They see same filtered results

### Implementation for User Story 1

- [x] T011 [P] [US1] Create TimeFilter component with radio group UI in src/components/filters/TimeFilter.tsx
- [x] T012 [P] [US1] Create FilterSection wrapper component in src/components/filters/FilterSection.tsx
- [x] T013 [P] [US1] Create FilterSidebar container component for desktop in src/components/filters/FilterSidebar.tsx
- [x] T014 [P] [US1] Install and configure shadcn/ui Sheet component for mobile drawer in src/components/ui/sheet.tsx
- [x] T015 [US1] Create FilterDrawer component for mobile/tablet in src/components/filters/FilterDrawer.tsx
- [x] T016 [US1] Create FilterButton component for mobile filter toggle in src/components/filters/FilterButton.tsx
- [x] T017 [US1] Update recipe listing page to integrate time filter in src/app/[mainCategoryId]/page.tsx
- [x] T018 [US1] Add ARIA labels and keyboard navigation support to TimeFilter component
- [x] T019 [US1] Add filter_applied analytics event for time filter in TimeFilter component
- [x] T020 [US1] Test time filter with recipes missing cookingTime field (should exclude from results)

**Checkpoint**: At this point, User Story 1 should be fully functional - time filtering works on desktop and mobile with URL state

---

## Phase 4: User Story 2 - Filter by Genre/Category (Priority: P2)

**Goal**: Users can filter recipes by genre/category (Japanese, Italian, desserts, etc.) using multi-select checkboxes with OR logic. Multiple genres can be selected and results show recipes matching ANY selected genre.

**Independent Test**: Select "Japanese" genre → Only Japanese recipes display → Add "Italian" genre → Recipes that are Japanese OR Italian display → URL shows `?genre=japanese,italian` → Deselect one genre → Results update correctly

### Implementation for User Story 2

- [x] T021 [P] [US2] Create GenreFilter component with checkbox UI in src/components/filters/GenreFilter.tsx
- [x] T022 [US2] Integrate GenreFilter into FilterSidebar component in src/components/filters/FilterSidebar.tsx
- [x] T023 [US2] Integrate GenreFilter into FilterDrawer component in src/components/filters/FilterDrawer.tsx
- [x] T024 [US2] Update recipe listing page to pass genre data to filters in src/app/[mainCategoryId]/page.tsx
- [x] T025 [US2] Add ARIA labels for genre checkboxes with checked state announcements
- [x] T026 [US2] Add filter_applied analytics event for genre filter selections
- [x] T027 [US2] Test genre filter with recipes missing genre tags (should exclude from results)
- [x] T028 [US2] Test OR logic: verify selecting multiple genres shows recipes matching ANY genre

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently and URL reflects both filter types

---

## Phase 5: User Story 3 - Filter by Ingredient Count (Priority: P3)

**Goal**: Users can filter recipes by ingredient count ranges (5 or less, 6-10, 11-15, 16-20, 20+) using single-select radio buttons to find simple or complex recipes.

**Independent Test**: Select "5 or less" ingredient filter → Only recipes with ≤5 ingredients display → URL shows `?ingredients=0-5` → Clear filter → All recipes display again

### Implementation for User Story 3

- [x] T029 [P] [US3] Create IngredientCountFilter component with radio group UI in src/components/filters/IngredientCountFilter.tsx
- [x] T030 [US3] Integrate IngredientCountFilter into FilterSidebar component in src/components/filters/FilterSidebar.tsx
- [x] T031 [US3] Integrate IngredientCountFilter into FilterDrawer component in src/components/filters/FilterDrawer.tsx
- [x] T032 [US3] Add ARIA labels and keyboard navigation for ingredient count filter
- [x] T033 [US3] Add filter_applied analytics event for ingredient count filter
- [x] T034 [US3] Test ingredient count filter with recipes missing ingredientCount field (should exclude from results)

**Checkpoint**: All three individual filter types should now be independently functional with proper URL state

---

## Phase 6: User Story 4 - Combined Filters (Priority: P2)

**Goal**: Users can apply multiple filters simultaneously with hybrid logic (OR within type, AND across types) to find recipes matching all criteria. Active filters are clearly displayed with individual remove options.

**Independent Test**: Select time "15-30 min" + genres "Japanese OR Italian" + ingredients "0-5" → Only recipes matching ALL criteria display → URL shows `?time=15-30&genre=japanese,italian&ingredients=0-5` → Remove one filter → Results update correctly → "Clear all" removes all filters

### Implementation for User Story 4

- [x] T035 [P] [US4] Create ActiveFilters component to display filter pills in src/components/filters/ActiveFilters.tsx
- [x] T036 [US4] Add individual filter remove buttons to ActiveFilters component
- [x] T037 [US4] Add "Clear all filters" button that appears when any filter is active
- [x] T038 [US4] Integrate ActiveFilters component into recipe listing page above results
- [x] T039 [US4] Add result count display showing "X recipes found" in src/app/[mainCategoryId]/page.tsx
- [x] T040 [US4] Add "No recipes found" message with filter adjustment suggestion
- [x] T041 [US4] Add filter_cleared analytics event for individual and "clear all" actions
- [x] T042 [US4] Add filter_no_results analytics event when no recipes match filters
- [x] T043 [US4] Test AND logic across filter types: verify time AND genre AND ingredients all must match
- [x] T044 [US4] Test URL parameter state with all filters active and verify shareability
- [x] T045 [US4] Test browser back/forward buttons work correctly with filter state changes
- [x] T046 [US4] Add ARIA live region for result count announcements to screen readers

**Checkpoint**: All user stories should now be independently functional with proper integration and URL state management

---

## Phase 7: Responsive & Accessibility Polish

**Purpose**: Ensure mobile experience and accessibility requirements are fully met

- [x] T047 [P] Test filter drawer open/close on mobile with proper focus management
- [x] T048 [P] Verify filter drawer is initially collapsed on mobile as specified
- [x] T049 [P] Test sticky sidebar behavior on desktop (≥1024px)
- [x] T050 [P] Test responsive breakpoint at 1024px (desktop sidebar vs mobile drawer)
- [x] T051 [P] Verify keyboard navigation works for all filter controls (Tab, Enter, Space, Escape)
- [x] T052 [P] Test screen reader announcements for filter changes and result updates
- [x] T053 [P] Verify color contrast meets WCAG AA standards (4.5:1) for all filter UI elements
- [x] T054 [P] Add focus trap to mobile drawer when open (prevents tabbing outside)
- [x] T055 [P] Test filter interface usability on 320px width screens (mobile phones)
- [x] T056 Test filter drawer close on Escape key press
- [x] T057 Add filter_drawer_opened analytics event for mobile drawer interactions

---

## Phase 8: Integration & Performance

**Purpose**: Integrate filters into all recipe listing pages and optimize performance

- [x] T058 [P] Integrate filters into main category page in src/app/[mainCategoryId]/page.tsx
- [x] T059 [P] Integrate filters into sub-category page in src/app/[mainCategoryId]/[subCategoryId]/page.tsx
- [x] T060 [P] Integrate filters into search results page in src/app/search/page.tsx
- [x] T061 [P] Integrate filters into paginated listing pages in src/app/p/[current]/page.tsx
- [x] T062 [P] Verify filter state persists across pagination navigation
- [x] T063 Test filter response time meets <3 second requirement for result display
- [ ] T064 Test page load time with filters meets <2 second requirement
- [x] T065 Add React.memo optimization to filter components if needed for performance
- [ ] T066 Verify Lighthouse performance score remains >90 with filters active

---

## Phase 9: Final Polish & Documentation

**Purpose**: Final improvements and documentation updates

- [x] T067 [P] Update project README with filter feature documentation
- [x] T068 [P] Add code comments to complex filter logic functions
- [x] T069 [P] Verify all console.log statements removed from production code
- [x] T070 [P] Run ESLint and fix any warnings in filter-related files
- [x] T071 [P] Verify TypeScript strict mode passes with no errors
- [x] T072 Validate implementation against quickstart.md checklist
- [x] T073 Verify all success criteria from spec.md are met (SC-001 through SC-008)
- [ ] T074 Test filter feature end-to-end on production-like environment
- [ ] T075 Create feature demo screenshots for documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - Can proceed sequentially in priority order: US1 (P1) → US2 (P2) → US4 (P2) → US3 (P3)
  - Or US1 and US2 can run in parallel after Foundational, then US3 and US4
- **Polish Phases (7-9)**: Depend on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, but uses FilterSidebar/FilterDrawer from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent, but uses FilterSidebar/FilterDrawer from US1
- **User Story 4 (P2)**: Requires US1, US2, US3 complete - Tests integration of all filter types together

### Within Each User Story

- Models/utilities before components
- Components before page integration
- Core implementation before analytics/accessibility
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T003) can run in parallel
- All Foundational tasks (T004-T010) can run in parallel within Phase 2
- Once Foundational phase completes:
  - US1 implementation can begin
  - After US1 creates FilterSidebar/FilterDrawer: US2 and US3 can run in parallel
- All Polish tasks within Phase 7, 8, 9 marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members (after dependencies met)

---

## Parallel Example: User Story 1

```bash
# Launch components for User Story 1 together (all create new files):
Task: "Create TimeFilter component with radio group UI in src/components/filters/TimeFilter.tsx"
Task: "Create FilterSection wrapper component in src/components/filters/FilterSection.tsx"
Task: "Create FilterSidebar container component for desktop in src/components/filters/FilterSidebar.tsx"
Task: "Install and configure shadcn/ui Sheet component for mobile drawer in src/components/ui/sheet.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T010) - CRITICAL
3. Complete Phase 3: User Story 1 (T011-T020)
4. **STOP and VALIDATE**: Test time filtering independently on desktop and mobile
5. Deploy/demo if ready - delivers immediate value

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - time filter!)
3. Add User Story 2 → Test independently → Deploy/Demo (genre filter added!)
4. Add User Story 3 → Test independently → Deploy/Demo (ingredient count added!)
5. Add User Story 4 → Test independently → Deploy/Demo (full combined filtering!)
6. Polish phases → Final deployment
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T010)
2. Once Foundational is done:
   - Developer A: User Story 1 (T011-T020) - Creates base filter infrastructure
3. After US1 creates FilterSidebar/FilterDrawer:
   - Developer B: User Story 2 (T021-
