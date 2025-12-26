# Feature Specification: Basic Recipe Filtering

**Feature Branch**: `001-recipe-filter`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "基本フィルター機能 ⭐️⭐️⭐️* 調理時間での絞り込み

* ジャンル別フィルター
* 材料数での絞り込み"

## Clarifications

### Session 2025-12-26

* Q: Where should the filter UI be positioned and what should be its initial state? → A: Filters always visible in sidebar on desktop, collapsible drawer on mobile/tablet (initially collapsed on mobile)
* Q: How should genre/category filters behave when multiple genres are selected? → A: Within same filter type use OR logic, across different filter types use AND logic
* Q: Should filter selections persist when users leave and return to the site? → A: Session persistence only - filters persist within session but cleared when browser closes
* Q: What should happen when a user selects multiple time ranges? → A: Single-select only - selecting a new time range deselects the previous one
* Q: Should URL query parameters reflect the current filter state? → A: Yes, filter state encoded in URL query parameters

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Filter by Cooking Time (Priority: P1)

Users want to find recipes that fit their available time, whether they have 15 minutes for a quick meal or an hour for a more elaborate dish. They need to quickly narrow down recipes based on total cooking time.

**Why this priority**: Time is the most common constraint when choosing recipes. This is the foundational filter that provides immediate value and is frequently used in recipe discovery.

**Independent Test**: Can be fully tested by selecting different time ranges and verifying that only recipes within those time bounds appear in results. Delivers value by helping users find recipes they can actually make given their time constraints.

**Acceptance Scenarios**:

1. **Given** user is on recipe listing page, **When** user selects "15 minutes or less" time filter, **Then** only recipes with cooking time ≤ 15 minutes are displayed
2. **Given** user is on recipe listing page, **When** user selects "15-30 minutes" time filter, **Then** only recipes with cooking time between 15-30 minutes are displayed
3. **Given** user has applied a time filter, **When** user clears the filter, **Then** all recipes are displayed again
4. **Given** user has applied a time filter with no matching recipes, **When** filter is active, **Then** user sees "No recipes found" message with suggestion to adjust filters

---

### User Story 2 - Filter by Genre/Category (Priority: P2)

Users browse recipes by cuisine type or meal category to match their cravings, dietary preferences, or cooking style. They need to explore recipes within specific genres like Japanese, Italian, desserts, or breakfast foods.

**Why this priority**: Genre filtering helps users discover recipes aligned with their preferences and is essential for recipe exploration. It's slightly lower priority than time filtering as it's more about discovery than constraint.

**Independent Test**: Can be fully tested by selecting different genre filters and verifying that only recipes tagged with those genres appear. Delivers value by organizing recipes into meaningful categories for easier browsing.

**Acceptance Scenarios**:

1. **Given** user is on recipe listing page, **When** user selects a single genre filter (e.g., "Japanese"), **Then** only recipes tagged with that genre are displayed
2. **Given** user has selected one genre, **When** user adds another genre filter, **Then** recipes matching either genre are displayed (OR logic)
3. **Given** user has applied genre filters, **When** user deselects a genre, **Then** filter is removed and results update accordingly
4. **Given** user has applied a genre filter with no matching recipes, **When** filter is active, **Then** user sees "No recipes found" message

---

### User Story 3 - Filter by Ingredient Count (Priority: P3)

Users want to find simple recipes with fewer ingredients for quick preparation, or more complex recipes with many ingredients for special occasions. They need to filter based on the number of ingredients required.

**Why this priority**: Ingredient count is useful but less critical than time and genre. Users often care more about specific ingredients (future feature) than just the count. However, it's valuable for finding simple recipes.

**Independent Test**: Can be fully tested by selecting different ingredient count ranges and verifying that only recipes with that many ingredients appear. Delivers value by helping users find simple or complex recipes based on their cooking ambition.

**Acceptance Scenarios**:

1. **Given** user is on recipe listing page, **When** user selects "5 ingredients or less", **Then** only recipes with ≤ 5 ingredients are displayed
2. **Given** user is on recipe listing page, **When** user selects "6-10 ingredients", **Then** only recipes with 6-10 ingredients are displayed
3. **Given** user has applied ingredient count filter, **When** user clears the filter, **Then** all recipes are displayed again
4. **Given** user has applied ingredient count filter with no matches, **When** filter is active, **Then** user sees "No recipes found" message

---

### User Story 4 - Combined Filters (Priority: P2)

Users need to apply multiple filters simultaneously to find recipes that meet all their criteria, such as "Japanese recipes under 30 minutes with 5 or fewer ingredients."

**Why this priority**: Combined filtering is essential for practical use. While each filter works independently, users often have multiple constraints simultaneously.

**Independent Test**: Can be fully tested by applying multiple filters and verifying that only recipes matching all criteria appear. Delivers value by enabling precise recipe discovery.

**Acceptance Scenarios**:

1. **Given** user is on recipe listing page, **When** user applies time and genre filters together, **Then** only recipes matching both criteria are displayed
2. **Given** user has applied multiple filters, **When** user removes one filter, **Then** results update to show recipes matching remaining filters
3. **Given** user has applied multiple filters, **When** user clears all filters, **Then** all recipes are displayed
4. **Given** user applies filters with no matching recipes, **When** all filters are active, **Then** user sees "No recipes found" with suggestion to adjust filters and shows active filter tags

---

### Edge Cases

* What happens when a recipe has no cooking time data? It should appear in unfiltered results but not in any time-filtered results
* What happens when a recipe has no genre tags? It should appear in unfiltered results but not in any genre-filtered results
* What happens when all filters are applied and no recipes match? Display helpful message encouraging users to relax some filter criteria
* What happens when user applies contradictory filters that logically have no results? System allows it and shows "No recipes found" message
* What happens on mobile devices with limited screen space for filters? Filters should be accessible via collapsible drawer that is initially collapsed
* What happens when recipe data changes while user has filters applied? Results should update automatically or on next page load

## Requirements *(mandatory)*

### Functional Requirements

* **FR-001**: System MUST provide cooking time filter with predefined time ranges: "15 minutes or less", "15-30 minutes", "30-45 minutes", "45-60 minutes", "Over 60 minutes" as single-select options (selecting a new range deselects previous selection)
* **FR-002**: System MUST provide genre/category filter showing all available recipe genres from the existing category taxonomy
* **FR-003**: System MUST provide ingredient count filter with ranges: "5 or less", "6-10", "11-15", "16-20", "More than 20" as single-select options (selecting a new range deselects previous selection)
* **FR-004**: System MUST allow users to apply multiple filters simultaneously with hybrid logic: within same filter type use OR logic (e.g., Japanese OR Italian), across different filter types use AND logic (e.g., Japanese recipes AND under 30 minutes AND 5 or fewer ingredients)
* **FR-005**: System MUST display active filters clearly to users with ability to remove individual filters
* **FR-006**: System MUST update recipe results immediately when filters are applied or removed
* **FR-007**: System MUST show count of recipes matching current filter selection
* **FR-008**: System MUST display helpful message when no recipes match selected filters
* **FR-009**: System MUST provide "Clear all filters" option when any filters are active
* **FR-010**: System MUST preserve filter selections within the current browser session (including navigation between pages, recipe detail views, and back navigation), but filters MUST be cleared when browser session ends
* **FR-011**: System MUST encode current filter state in URL query parameters to enable sharing, bookmarking, and browser back/forward navigation
* **FR-012**: System MUST initialize filters from URL query parameters when page loads
* **FR-013**: System MUST handle recipes with missing data gracefully (exclude from filtered results but include in unfiltered views)
* **FR-014**: Filter UI MUST be responsive: always visible in fixed sidebar on desktop (≥1024px), collapsible drawer on tablet/mobile (<1024px) with drawer initially collapsed on mobile

### Key Entities

* **Filter Selection**: Represents user's current filter choices including selected time range, genres, and ingredient count range
* **Recipe Metadata**: Represents the filterable attributes of a recipe including cooking time in minutes, genre tags, and ingredient count
* **Filter Option**: Represents an available filter choice with display label and matching criteria

## Success Criteria *(mandatory)*

### Measurable Outcomes

* **SC-001**: Users can apply and see filtered results in under 3 seconds from filter selection
* **SC-002**: Filter interface is usable on screens as small as 320px width (mobile phones)
* **SC-003**: 90% of filter operations complete without showing "No recipes found" when reasonable filters are selected
* **SC-004**: Users can successfully combine at least 2 filters and get relevant results
* **SC-005**: Recipe listing pages load and display filter options in under 2 seconds
* **SC-006**: Filter state persists correctly when users navigate through paginated results
* **SC-007**: Users can share filtered recipe URLs and recipients see the same filtered results
* **SC-008**: Browser back/forward buttons work correctly with filter changes
