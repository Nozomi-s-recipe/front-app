<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 (initial constitution)
Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (7 principles)
  - Technical Standards
  - Development Workflow
  - Governance
Templates Status:
  ✅ .specify/templates/plan-template.md - Reviewed, constitution check section aligns
  ✅ .specify/templates/spec-template.md - Reviewed, requirements align with principles
  ✅ .specify/templates/tasks-template.md - Reviewed, task organization aligns
Follow-up TODOs: None
-->

# Nozomi's Recipes Constitution

## Core Principles

### I. Performance-First Architecture

The application MUST prioritize performance at every layer. This is NON-NEGOTIABLE.

**Rules:**

- All pages MUST achieve Lighthouse performance scores >90
- Core Web Vitals MUST meet Google's "Good" thresholds: LCP <2.5s, FID <100ms, CLS <0.1
- Images MUST be optimized (WebP/AVIF) with responsive sizes
- JavaScript bundles MUST be code-split and lazy-loaded where appropriate
- API responses MUST be cached appropriately (ISR, CDN, client-side)

**Rationale:** Recipe discovery is a competitive space. Users abandon slow sites. Performance directly impacts SEO rankings and user retention.

### II. SEO & Discoverability Excellence

Content MUST be discoverable and well-structured for search engines.

**Rules:**

- All recipe pages MUST include structured data (Schema.org Recipe markup)
- Meta tags (title, description, Open Graph, Twitter Card) MUST be complete and optimized
- Semantic HTML MUST be used throughout (proper heading hierarchy, landmarks)
- Sitemap MUST be automatically generated and updated
- robots.txt MUST be properly configured
- Images MUST include descriptive alt text

**Rationale:** Organic search is the primary discovery channel for recipe content. Without proper SEO, the best recipes remain invisible.

### III. Accessibility is Mandatory

The application MUST be usable by everyone, regardless of ability.

**Rules:**

- WCAG 2.1 Level AA compliance MUST be maintained
- Keyboard navigation MUST work for all interactive elements
- Color contrast ratios MUST meet AA standards (4.5:1 for normal text)
- Screen reader compatibility MUST be tested and verified
- Focus indicators MUST be visible
- Semantic HTML and ARIA labels MUST be used appropriately

**Rationale:** Accessibility is a legal requirement and moral imperative. Cooking should be accessible to all users regardless of disabilities.

### IV. Security & Privacy by Design

User data and application security MUST be protected at all levels.

**Rules:**

- Authentication MUST use industry-standard practices (Supabase Auth)
- Environment variables MUST NEVER be committed to source control
- API keys MUST be server-side only (no client exposure)
- User data MUST be encrypted in transit (HTTPS) and at rest
- CORS policies MUST be restrictive and explicit
- Input validation MUST occur on both client and server
- Rate limiting MUST be implemented for API endpoints

**Rationale:** Recipe data may seem innocuous, but user accounts, favorites, and behavioral data require protection. Security breaches destroy trust.

### V. Content Management Scalability

Content operations MUST scale efficiently as the recipe library grows.

**Rules:**

- Content MUST be managed through microCMS (headless CMS)
- Content types MUST be versioned and documented
- Media assets MUST be CDN-delivered (Cloudinary/Vercel Image Optimization)
- Content migrations MUST be scripted and reproducible
- API responses MUST be cached with appropriate TTLs
- Search/filtering MUST be efficient (Hasura GraphQL with proper indexing)

**Rationale:** Manual content management doesn't scale. A CMS enables content creators to work independently while maintaining quality and performance.

### VI. Modern Design System Consistency

UI MUST be consistent, maintainable, and built on proven patterns.

**Rules:**

- shadcn/ui components MUST be the foundation for all UI elements
- Tailwind CSS MUST be used for styling (no CSS-in-JS or separate CSS files)
- Component composition MUST follow atomic design principles
- Design tokens (colors, spacing, typography) MUST be centralized
- Dark mode MUST be supported via next-themes
- Components MUST be documented in Storybook
- Responsive design MUST support mobile-first breakpoints

**Rationale:** Consistency reduces cognitive load. A design system accelerates development and ensures quality scales with team size.

### VII. Observability & Analytics

Application behavior MUST be measurable and actionable.

**Rules:**

- Google Analytics 4 MUST track key user journeys
- Error boundaries MUST catch and log React errors
- API errors MUST be logged with context (user ID, request details)
- Performance metrics MUST be monitored (Core Web Vitals)
- User feedback mechanisms MUST be implemented and tracked
- A/B testing infrastructure MUST be ready (even if not actively testing)

**Rationale:** You cannot improve what you don't measure. Analytics inform feature prioritization and performance optimization.

## Technical Standards

### Framework & Infrastructure

- **Framework:** Next.js 15+ with App Router (React Server Components)
- **Styling:** Tailwind CSS 3.4+ with shadcn/ui components
- **Backend:** Hasura GraphQL Engine on top of PostgreSQL
- **CMS:** microCMS for content management
- **Auth:** Supabase Authentication
- **Hosting:** Vercel (optimized for Next.js)
- **Analytics:** Google Analytics 4

### Code Quality

- TypeScript MUST be used with strict mode enabled
- ESLint MUST pass with zero warnings before deployment
- Components MUST be typed with proper TypeScript interfaces
- No `any` types unless explicitly justified in code comments
- Functions MUST have single responsibilities (max 50 lines preferred)

### Testing (when implemented)

- Critical user flows SHOULD have E2E tests (Playwright)
- Shared utilities SHOULD have unit tests
- Visual regression tests SHOULD be implemented for key pages
- Tests MUST run in CI/CD pipeline

### Version Control

- Conventional Commits MUST be used (feat, fix, docs, style, refactor, test, chore)
- Feature branches MUST follow pattern: `feature/###-short-description`
- Pull requests MUST include description and link to spec/issue
- Main branch MUST be deployable at all times

## Development Workflow

### Feature Development Process

1. **Specification:** Write spec.md in `.specify/specs/[###-feature]/`
2. **Planning:** Generate plan.md using `/speckit.plan` command
3. **Architecture:** Complete research.md, data-model.md, contracts/ as needed
4. **Task Breakdown:** Generate tasks.md using `/speckit.tasks` command
5. **Implementation:** Execute tasks in dependency order
6. **Review:** PR review checklist includes constitution compliance
7. **Deployment:** Merge to main triggers Vercel deployment

### Constitution Compliance Checkpoints

- **Before Phase 0 (Research):** Verify feature aligns with core principles
- **After Phase 1 (Design):** Verify design supports performance and accessibility
- **Before Implementation:** Verify tasks include SEO, analytics, security requirements
- **Before Deployment:** Verify Lighthouse scores, WCAG compliance, security review

### Breaking Changes

Any change that violates a principle MUST:

1. Document the violation in plan.md Complexity Tracking section
2. Explain why the violation is necessary
3. Explain why simpler alternatives were rejected
4. Get explicit approval before implementation

## Governance

### Authority & Precedence

This constitution supersedes all other documentation, practices, and preferences. When conflicts arise:

1. Constitution principles take precedence
2. Technical standards in this document override preferences
3. Complexity must be justified against simpler alternatives

### Amendment Process

1. Propose amendment in `.specify/memory/constitution.md`
2. Document rationale and impact
3. Update version number following semantic versioning:
   - **MAJOR:** Backward-incompatible principle removals or redefinitions
   - **MINOR:** New principles or materially expanded guidance
   - **PATCH:** Clarifications, wording refinements, typo fixes
4. Propagate changes to all dependent templates and documents
5. Update `LAST_AMENDED_DATE` to current date

### Compliance Review

- All pull requests MUST verify compliance with constitution
- Quarterly reviews SHOULD assess if principles need updating
- When principles conflict with practical needs, document and resolve (don't ignore)

### Runtime Development Guidance

For mode-specific guidance and command execution details, refer to:

- `.specify/templates/commands/*.md` for command workflows
- `.specify/templates/plan-template.md` for planning structure
- `.specify/templates/spec-template.md` for specification format
- `.specify/templates/tasks-template.md` for task organization

**Version**: 1.0.0 | **Ratified**: 2025-12-16 | **Last Amended**: 2025-12-16
