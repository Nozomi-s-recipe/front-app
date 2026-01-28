
# Tasks: Homepage Design Redesign

**Input**: Design documents from `/specs/002-homepage-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No automated tests requested for this visual redesign feature. Manual testing against design reference and accessibility validation required.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router structure: `src/app/`, `src/components/`, `src/hooks/`, `src/lib/`
- All paths relative to repository root `/Users/gen/Work/side-project/02.n-recipes/front-app`

---

## Phase 1: Setup & Foundation

**Purpose**: Configure fonts, colors, and base utilities that all user stories depend on

- [x] T001 Configure Google Fonts (Crimson Pro, Outfit) in src/app/layout.tsx with next/font/google optimization
- [x] T002 [P] Add CSS custom properties for color theme in src/app/globals.css (cream, coral, text colors, shadows)
- [x] T003 [P] Extend Tailwind config to map CSS variables to utility classes in tailwind.config.ts
- [x] T004 [P] Add prefers-reduced-motion media query rules in src/app/globals.css
- [x] T005 [P] Create localStorage utility functions in src/lib/utils/localStorage.ts (saveFavorites, loadFavorites)
- [x] T006 [P] Create useFavorites custom hook in src/hooks/useFavorites.ts
- [x] T007 [P] Create useScrolled custom hook in src/hooks/useScrolled.ts

**Checkpoint**: Foundation ready - all user stories can now be implemented

---

## Phase 2: User Story 1 - Modern Visual Experience (Priority: P1) 🎯 MVP

**Goal**: Apply new color scheme, typography, and animations to create modern, elegant homepage aesthetic

**Independent Test**: Load homepage and verify colors match design (cream #f8f7f4 background, white cards, coral #e17055 accents), fonts display correctly (Crimson Pro titles, Outfit body), and animations are smooth

### Implementation for User Story 1

- [x] T008 [US1] Update body background color and font-family in src/app/globals.css using new CSS variables
- [x] T009 [US1] Apply staggered fade-in animation keyframes in src/app/globals.css for recipe cards
- [x] T010 [US1] Update homepage layout container in src/app/page.tsx to use new color scheme

**Checkpoint**: Homepage displays with new colors, fonts, and basic visual structure

---

## Phase 3: User Story 2 - Sticky Header with Logo and Tagline (Priority: P1)

**Goal**: Implement sticky header with logo, tagline, and scroll-responsive behavior

**Independent Test**: Scroll page and verify header stays fixed, logo is clickable, tagline visible on desktop (hidden on mobile), header becomes compact after 50px scroll

### Implementation for User Story 2

- [x] T011 [US2] Update Header component in src/components/header/MenuHeader.tsx to be sticky with new styling
- [x] T012 [US2] Add logo with gradient N icon and "Nozomi's Recipes" text in src/components/header/MenuHeader.tsx
- [x] T013 [US2] Add tagline "赤身肉・加工肉・バターを使わないレシピ" with responsive visibility in src/components/header/MenuHeader.tsx
- [x] T014 [US2] Integrate useScrolled hook for scroll detection in src/components/header/MenuHeader.tsx
- [x] T015 [US2] Implement logo click behavior (smooth scroll on homepage, navigate on other pages) in src/components/header/MenuHeader.tsx
- [x] T016 [US2] Add scroll transition effects (padding reduction, shadow) in src/components/header/MenuHeader.tsx

**Checkpoint**: Sticky header functional with all styling and interactions working

---

## Phase 4: User Story 6 - Recipe Card Enhancements (Priority: P1)

**Goal**: Redesign recipe cards with refined styling, hover effects, favorite buttons, and metadata display

**Independent Test**: View recipe cards and verify 75% aspect ratio images, rounded corners, category badges, favorite button with localStorage persistence, hover effects (lift + image scale), and metadata footer

### Implementation for User Story 6

- [x] T017 [US6] Update RecipePreview component styling in src/components/recipe-preview/RecipePreview.tsx with new card design (rounded corners, shadows)
- [x] T018 [US6] Add 75% aspect ratio image container with gradient placeholder in src/components/recipe-preview/RecipePreview.tsx
- [x] T019 [US6] Add category badge overlay (top-left) with backdrop blur in src/components/recipe-preview/RecipePreview.tsx
- [x] T020 [US6] Implement favorite button (top-right) with heart icon in src/components/recipe-preview/RecipePreview.tsx
- [x] T021 [US6] Integrate useFavorites hook for favorite persistence in src/components/recipe-preview/RecipePreview.tsx
- [x] T022 [US6] Update recipe title styling (Crimson Pro, 1.35rem) in src/components/recipe-preview/RecipePreview.tsx
- [x] T023 [US6] Add metadata footer with icons (likes, time, servings) in src/components/recipe-preview/RecipePreview.tsx
- [x] T024 [US6] Implement hover effects (translateY, shadow, image scale) in src/components/recipe-preview/RecipePreview.tsx
- [x] T025 [US6] Update RecipePreviewList grid layout in src/components/recipe-preview/RecipePreviewList.tsx with repeat(auto-fill, minmax(340px, 1fr))

**Checkpoint**: Recipe cards display with all new styling, hover effects work smoothly, favorites persist across sessions

---

## Phase 5: User Story 3 - Enhanced Search Experience (Priority: P2)

**Goal**: Restyle search box with modern aesthetic, rounded corners, coral focus states

**Independent Test**: Interact with search box and verify rounded corners (16px), search icon visible, placeholder text displays, focus state shows coral border with glow effect

### Implementation for User Story 3

- [x] T026 [US3] Update SearchField component styling in src/components/search/SearchField.tsx with rounded corners and shadow
- [x] T027 [US3] Add search icon to SearchField in src/components/search/SearchField.tsx
- [x] T028 [US3] Implement focus state with coral border and glow effect in src/components/search/SearchField.tsx
- [x] T029 [US3] Update placeholder text to "探しているレシピを入力..." in src/components/search/SearchField.tsx

**Checkpoint**: Search box displays with new styling and focus states work correctly

---

## Phase 6: User Story 4 - Tab Navigation (Priority: P2)

**Goal**: Add tab navigation UI with visual-only state changes (no content filtering)

**Independent Test**: Click tabs and verify visual active state (coral underline, bold text), hover effects work, mobile horizontal scroll works, content remains unchanged

### Implementation for User Story 4

- [x] T030 [US4] Create TabNavigation component in src/components/navigation/TabNavigation.tsx (new file)
- [x] T031 [US4] Add four tabs (すべてのレシピ, 今日のおすすめ, カテゴリー, お気に入り) with useState for active state in src/components/navigation/TabNavigation.tsx
- [x] T032 [US4] Style active tab with coral bottom border (2px) and bold font weight in src/components/navigation/TabNavigation.tsx
- [x] T033 [US4] Implement hover effects (text color darkens) in src/components/navigation/TabNavigation.tsx
- [x] T034 [US4] Add horizontal scroll support for mobile in src/components/navigation/TabNavigation.tsx
- [x] T035 [US4] Integrate TabNavigation into homepage in src/app/page.tsx below search box

**Checkpoint**: Tab navigation displays and visual states work, but content filtering not yet implemented (deferred)

---

## Phase 7: User Story 5 - Section Headers with "View All" Links (Priority: P3)

**Goal**: Add section headers with styled "すべて見る" links and animated arrow icons

**Independent Test**: View section headers and verify Crimson Pro font at 2rem, "すべて見る" links aligned right, arrow icon animates on hover

### Implementation for User Story 5

- [x] T036 [US5] Create SectionHeader component in src/components/sections/SectionHeader.tsx (new file)
- [x] T037 [US5] Style section title with Crimson Pro font at 2rem in src/components/sections/SectionHeader.tsx
- [x] T038 [US5] Add "すべて見る" link with right arrow icon in src/components/sections/SectionHeader.tsx
- [x] T039 [US5] Implement hover animation (arrow shifts right) in src/components/sections/SectionHeader.tsx
- [x] T040 [US5] Integrate SectionHeader for "新着レシピ" section in src/app/page.tsx
- [x] T041 [US5] Integrate SectionHeader for "人気レシピ" section in src/app/page.tsx

**Checkpoint**: Section headers display with animated "View All" links

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements affecting multiple components

- [ ] T042 [P] Add line-clamp for long recipe titles (2-3 lines max) in recipe card CSS
- [ ] T043 [P] Test and adjust responsive breakpoints (mobile, tablet, desktop) across all components
- [ ] T044 [P] Verify color contrast ratios meet WCAG AA standards using accessibility tools
- [ ] T045 [P] Test keyboard navigation (Tab through all interactive elements, verify focus states)
- [ ] T046 [P] Test with prefers-reduced-motion enabled (animations should simplify to 0.15s, no transforms)
- [ ] T047 [P] Test in incognito mode (favorites should work session-only without errors)
- [ ] T048 [P] Run Lighthouse audit and optimize for >90 performance score
- [ ] T049 [P] Test on iOS Safari (verify sticky header, touch scrolling, fonts)
- [ ] T050 [P] Verify against design reference design/recipe-homepage.html for pixel-perfect match

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - MUST complete first (blocks everything)
- **User Story 1 (Phase 2)**: Depends on Setup completion
- **User Story 2 (Phase 3)**: Depends on Setup completion (can run parallel with US1)
- **User Story 6 (Phase 4)**: Depends on Setup completion (can run parallel with US1, US2)
- **User Story 3 (Phase 5)**: Depends on Setup completion (can run parallel with other P1 stories)
- **User Story 4 (Phase 6)**: Depends on Setup completion (can run parallel with other stories)
- **User Story 5 (Phase 7)**: Depends on Setup completion (can run parallel with other stories)
- **Polish (Phase 8)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - only depends on Setup
- **User Story 2 (P1)**: Independent - only depends on Setup
- **User Story 6 (P1)**: Independent - only depends on Setup
- **User Story 3 (P2)**: Independent - only depends on Setup
- **User Story 4 (P2)**: Independent - only depends on Setup  
- **User Story 5 (P3)**: Independent - only depends on Setup

**All user stories are independently implementable and testable after Setup phase**

### Within Each User Story

- Tasks within a story typically sequential (some marked [P] can parallelize)
- Complete story before moving to next priority
- Test story independently after completion

### Parallel Opportunities

**Phase 1 (Setup)**:

- T002, T003, T004, T005, T006, T007 can all run in parallel after T001 completes

**After Setup completes, these entire phases can run in parallel**:

- Phase 2 (US1), Phase 3 (US2), Phase 4 (US6) - all P1 priority
- Phase 5 (US3) and Phase 6 (US4) - both P2 priority
- Phase 7 (US5) - P3 priority

**Phase 8 (Polish)**:

- All tasks T042-T050 marked [P] can run in parallel

---

## Parallel Example: After Setup Completes

```bash
# All P1 user stories can start simultaneously:
Developer A: Phase 2 (US1) - T008, T009, T010
Developer B: Phase 3 (US2) - T011-T016  
Developer C: Phase 4 (US6) - T017-T025

# Or if solo developer, prioritize US1 → US2 → US6 → US3 → US4 → US5
```

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup (T001-T007) - Foundation
2. Complete Phase 2: User Story 1 (T008-T010) - Basic visual refresh
3. Complete Phase 3: User Story 2 (T011-T016) - Sticky header
4. Complete Phase 4: User Story 6 (T017-T025) - Recipe cards
5. **STOP and VALIDATE**: Test P1 stories independently
6. Run selected Phase 8 polish tasks (accessibility, performance)
7. Deploy/demo MVP

**MVP Delivers**: Modern visual design with colors, fonts, animations, sticky header, enhanced recipe cards, and favorite persistence

### Incremental Delivery

1. Setup (Phase 1) → Foundation ready
2. Add US1 → Test → Deploy (basic visual refresh live)
3. Add US2 → Test → Deploy (sticky header live)
4. Add US6 → Test → Deploy (enhanced cards live) ← **MVP complete**
5. Add US3 → Test → Deploy (enhanced search live)
6. Add US4 → Test → Deploy (tab navigation live)
7. Add US5 → Test → Deploy (section headers live)
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With 2-3 developers after Setup completes:

1. Team completes Phase 1 (Setup) together
2. Once Setup done, split P1 stories:
   - Developer A: US1 (Modern Visual)
   - Developer B: US2 (Sticky Header)
   - Developer C: US6 (Recipe Cards)
3. P1 stories complete and merge
4. Split P2 stories if team available
5. Polish together

---

## Manual Testing Checklist

After completing each user story, verify:

### Visual Testing

- [ ] Colors match design reference exactly (#f8f7f4, #e17055, etc.)
- [ ] Fonts render correctly (Crimson Pro for titles, Outfit for body)
- [ ] Shadows and border radius match specifications
- [ ] Spacing and padding consistent with design

### Interaction Testing

- [ ] Hover effects smooth at 60fps
- [ ] Click interactions respond within 100ms
- [ ] Animations complete in specified durations
- [ ] Favorite state persists after refresh

### Responsive Testing  

- [ ] Mobile (<768px): 1 column, tagline hidden, tabs scroll horizontally
- [ ] Tablet (768-1024px): 2-3 columns
- [ ] Desktop (>1024px):
