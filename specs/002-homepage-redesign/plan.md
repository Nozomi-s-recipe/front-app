# Implementation Plan: Homepage Design Redesign

**Branch**: `002-homepage-redesign` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-homepage-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Redesign the homepage with modern visual aesthetics including new color scheme (cream background, coral accents), premium typography (Crimson Pro + Outfit via Google Fonts), refined component styling (recipe cards, header, search, tabs), smooth animations with accessibility support, and localStorage-based favorite persistence. This is a visual-first enhancement that maintains existing functionality while significantly improving user experience through CSS/styling updates and client-side interactions.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.10 (React 19.0.0)  
**Primary Dependencies**: Tailwind CSS 3.4+, shadcn/ui, Google Fonts (Crimson Pro, Outfit), React hooks (useState, useEffect for localStorage)  
**Storage**: Browser localStorage for favorite recipe IDs (client-side only)  
**Testing**: Manual visual testing against design reference, accessibility testing with screen readers, performance testing with Lighthouse  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge) - Desktop and Mobile responsive  
**Project Type**: Web application (Next.js App Router with React Server Components)  
**Performance Goals**:

- Lighthouse performance score >90
- 60fps animations on modern browsers
- <100ms interactive element response time
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1  
**Constraints**:
- No backend changes required (frontend-only redesign)
- Must maintain existing functionality (search, navigation, recipe display)
- Must support accessibility (WCAG 2.1 AA, prefers-reduced-motion)
- Google Fonts must load efficiently without blocking render  
**Scale/Scope**: Single homepage redesign affecting ~12 recipe cards initially, 6 primary UI components (header, search, tabs, cards, sections, animations)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

✅ **I. Performance-First Architecture**

- Google Fonts will be loaded via Next.js font optimization (preload, display=swap)
- Animations use CSS transforms (GPU-accelerated) not layout properties
- Responsive images already handled by existing Next.js Image optimization
- No additional JavaScript bundles required (uses existing React hooks)
- Risk: Custom fonts may add ~50-100KB download, mitigated by Next.js font optimization

✅ **II. SEO & Discoverability Excellence**

- No SEO impact (cosmetic changes only, preserves semantic HTML)
- Maintains existing structured data and meta tags
- No changes to content structure or URL patterns

✅ **III. Accessibility is Mandatory**

- Implements prefers-reduced-motion media query for motion-sensitive users
- Maintains keyboard navigation (focus states with coral accent)
- Color contrast ratios meet AA standards (tested: cream bg + dark text = 12:1, coral accent on white = 4.5:1)
- Semantic HTML preserved (header, nav, main, article elements)
- ARIA labels maintained on interactive elements (search, tabs, favorite buttons)

✅ **IV. Security & Privacy by Design**

- localStorage usage is client-side only (no sensitive data, just recipe IDs)
- No new API endpoints or authentication changes
- No CORS or rate limiting changes required

✅ **V. Content Management Scalability**

- No microCMS changes required (uses existing recipe data structure)
- CDN delivery unchanged (Vercel Image Optimization continues to work)
- Content structure unchanged

✅ **VI. Modern Design System Consistency**

- Uses Tailwind CSS (existing project standard)
- Can leverage shadcn/ui components where applicable (Button, Card patterns)
- Maintains responsive design mobile-first approach
- New design tokens (colors, fonts) will be added to Tailwind config
- Component structure follows existing patterns

✅ **VII. Observability & Analytics**

- No analytics changes required (existing GA4 tracking continues)
- Error boundaries already in place for React errors
- Performance monitoring via Lighthouse/Core Web Vitals

### Gate Status: ✅ PASSED

All core principles are maintained or enhanced. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/002-homepage-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already created)
├── research.md          # Phase 0 output (to be generated)
├── data-model.md        # Phase 1 output (to be generated)
├── quickstart.md        # Phase 1 output (to be generated)
└── checklists/
    └── requirements.md  # Quality checklist (already created)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css           # Color theme CSS custom properties, font imports
│   ├── layout.tsx            # Google Fonts configuration (next/font)
│   └── page.tsx              # Homepage component structure
├── components/
│   ├── header/
│   │   ├── Header.tsx        # Sticky header with logo, tagline, scroll behavior
│   │   └── MenuHeader.tsx    # Existing header component (may need updates)
│   ├── recipe-preview/
│   │   ├── RecipePreview.tsx          # Recipe card styling updates
│   │   ├── RecipePreviewList.tsx      # Grid layout updates
│   │   └── RecipePreviewCarousel.tsx  # Carousel styling if needed
│   ├── search/
│   │   └── SearchField.tsx   # Search box styling updates
│   └── ui/
│       └── (shadcn components as needed)
├── hooks/
│   ├── useFavorites.ts       # localStorage favorite management hook (new)
│   └── useScrolled.ts        # Header scroll detection hook (new)
└── lib/
    └── utils/
        └── localStorage.ts   # localStorage helper utilities (new)

public/
└── (no changes to static assets for this feature)

Design reference:
design/
└── recipe-homepage.html      # Visual specification reference
```

**Structure Decision**: Web application with frontend-only changes. Follows existing Next.js App Router structure. New components will be added/updated in `src/components/` following the existing organization pattern. Hooks for client-side behavior (favorites, scroll detection) will be added to `src/hooks/`. Global styling changes in `src/app/globals.css` and font configuration in `src/app/layout.tsx`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - this section intentionally left empty.
