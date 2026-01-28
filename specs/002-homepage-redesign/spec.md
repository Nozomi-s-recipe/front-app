# Feature Specification: Homepage Design Redesign

**Feature Branch**: `002-homepage-redesign`  
**Created**: 2026-01-28  
**Status**: Draft  
**Input**: User description: "トップページのデザインを design/recipe-homepage.html に合わせて更新する"

## Clarifications

### Session 2026-01-28

- Q: Tab Navigation Content Switching Behavior - The spec mentions tab navigation but doesn't specify what happens when users click different tabs beyond visual styling changes. → A: Visual-only styling - Tabs show visual state changes but don't switch content in initial implementation (functionality added later)
- Q: Favorite Button Persistence - When users click the favorite button on recipe cards, should the favorite state persist across sessions or reset when they refresh the page? → A: LocalStorage persistence - Favorites saved in browser localStorage and persist across sessions
- Q: Animation Performance on Low-End Devices - The edge cases mention using prefers-reduced-motion media query for low-end devices. Should animations be completely disabled or simplified for users with motion preferences? → A: Simplified animations - Reduce animation duration and complexity but keep basic transitions
- Q: Recipe Card Grid Behavior on Tablets - The spec mentions "2-3 columns tablet" but doesn't specify the exact breakpoint logic. Should tablets always show 2 columns, always show 3 columns, or dynamically adjust based on available space? → A: Dynamic with minmax - Use CSS grid minmax(340px, 1fr) to automatically fit 2-3 columns based on available viewport width
- Q: Header Logo Navigation Behavior - When users click the logo in the header, should it scroll smoothly to the top of the current page or perform a hard navigation/reload to the homepage? → A: Smooth scroll to top - On homepage, smoothly scroll to top; on other pages, navigate to homepage

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Modern Visual Experience (Priority: P1)

Users visiting the homepage should experience a modern, elegant design with improved visual hierarchy, premium fonts, smooth animations, and a refined color palette that aligns with the "healthy recipes without red meat, processed meat, and butter" brand identity.

**Why this priority**: The homepage is the first impression for all users. A modern, professional design builds trust and encourages users to explore recipes. This is the foundational visual update that all other improvements build upon.

**Independent Test**: Can be fully tested by loading the homepage and verifying visual elements match the design reference (fonts, colors, spacing, card styles, shadows). Delivers immediate value through improved aesthetics and professionalism.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** the page loads, **Then** the page displays with the new color scheme (cream background #f8f7f4, white cards, coral accent #e17055)
2. **Given** a user views recipe cards, **When** hovering over a card, **Then** the card smoothly elevates with shadow transition and image scales subtly
3. **Given** a user scrolls the page, **When** scrolling past 50px, **Then** the header becomes slightly smaller and gains a subtle shadow
4. **Given** a user views the page, **When** content loads, **Then** recipe cards fade in sequentially with staggered animation delays

---

### User Story 2 - Sticky Header with Logo and Tagline (Priority: P1)

Users should see a sticky header at the top with the "Nozomi's Recipes" logo (N icon + text) and a tagline describing the site's focus, providing consistent navigation context as they scroll.

**Why this priority**: Essential for branding and navigation. The sticky header ensures users always know where they are and can easily return to top-level navigation. The tagline immediately communicates the site's unique value proposition.

**Independent Test**: Can be tested by scrolling the page and verifying the header remains visible, logo is clickable, and tagline displays correctly on desktop (hidden on mobile).

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** the page loads, **Then** the header displays with logo icon (N in gradient box), site name "Nozomi's Recipes", and tagline "赤身肉・加工肉・バターを使わないレシピ"
2. **Given** a user scrolls down the page, **When** scrolling past any point, **Then** the header remains fixed at the top of the viewport
3. **Given** a user on mobile device, **When** viewing the header, **Then** the tagline is hidden to conserve space
4. **Given** a user on the homepage clicks the logo, **When** clicked, **Then** the page smoothly scrolls to the top
5. **Given** a user on a different page clicks the logo, **When** clicked, **Then** the browser navigates to the homepage

---

### User Story 3 - Enhanced Search Experience (Priority: P2)

Users should have access to a prominent, elegant search box with icon that allows them to quickly find recipes, positioned prominently in the hero section.

**Why this priority**: Search is a primary user action but doesn't need to change functionality - only visual design. Important for usability but secondary to overall visual refresh.

**Independent Test**: Can be tested by interacting with the search box, verifying visual styling, focus states, and placeholder text without requiring search functionality changes.

**Acceptance Scenarios**:

1. **Given** a user views the hero section, **When** the page loads, **Then** a centered search box with rounded corners, shadow, and search icon is displayed
2. **Given** a user focuses on the search box, **When** clicking or tabbing into it, **Then** the border color changes to coral (#e17055) with a subtle glow effect
3. **Given** a user sees the search box, **When** no text is entered, **Then** placeholder text "探しているレシピを入力..." is displayed in muted color

---

### User Story 4 - Tab Navigation (Priority: P2)

Users should see a tab navigation system below the search allowing them to switch between different recipe views (all recipes, today's recommendations, categories, favorites).

**Why this priority**: Provides structured navigation to different content sections. While important for organization, the initial implementation can have basic functionality with visual styling being the priority.

**Independent Test**: Can be tested by clicking tabs and verifying visual states (active tab has underline, hover effects work). Tabs display visual styling changes only without content switching in this phase.

**Acceptance Scenarios**:

1. **Given** a user views the homepage, **When** the page loads, **Then** tab navigation displays with options: "すべてのレシピ", "今日のおすすめ", "カテゴリー", "お気に入り"
2. **Given** a user views tabs, **When** one tab is selected, **Then** that tab displays with bold text and coral underline indicator
3. **Given** a user clicks on a tab, **When** the tab is clicked, **Then** the visual active state updates but content remains the same (functionality deferred to future enhancement)
4. **Given** a user hovers over an inactive tab, **When** the mouse enters the tab area, **Then** the tab text color darkens smoothly
5. **Given** a user on mobile, **When** viewing tabs, **Then** tabs scroll horizontally with touch support

---

### User Story 5 - Section Headers with "View All" Links (Priority: P3)

Users should see section headers for "新着レシピ" (New Recipes) and "人気レシピ" (Popular Recipes) with accompanying "すべて見る" (View All) links that include animated arrow icons.

**Why this priority**: Improves content organization and provides clear navigation to full lists. Lower priority as existing sections can be visually updated without this enhancement initially.

**Independent Test**: Can be tested by viewing section headers and interacting with "View All" links to verify visual styling and hover animations.

**Acceptance Scenarios**:

1. **Given** a user scrolls to recipe sections, **When** viewing section headers, **Then** headers display in Crimson Pro serif font at 2rem size with "すべて見る" links aligned right
2. **Given** a user hovers over a "View All" link, **When** the mouse enters the link area, **Then** the arrow icon shifts slightly right with smooth transition
3. **Given** a user clicks "すべて見る", **When** clicked, **Then** the link navigates to the full recipe list for that section

---

### User Story 6 - Recipe Card Enhancements (Priority: P1)

Users should see recipe cards with refined styling including better image presentation, category badges, favorite buttons with heart icons, and comprehensive metadata (likes, cooking time, servings).

**Why this priority**: Recipe cards are the primary content element and appear throughout the page. Their visual improvement directly impacts user engagement and content discoverability.

**Independent Test**: Can be tested by viewing recipe cards and interacting with favorite buttons, verifying all visual elements match the design (badges, shadows, hover states, metadata icons).

**Acceptance Scenarios**:

1. **Given** a user views a recipe card, **When** the card is displayed, **Then** it shows image with 75% aspect ratio, rounded corners (20px), and subtle shadow
2. **Given** a user views a recipe card, **When** looking at the card overlay, **Then** a category badge (和食/中華/地中海食) appears in top-left corner with white background and backdrop blur
3. **Given** a user hovers over a recipe card, **When** the mouse enters the card area, **Then** the entire card lifts up (-8px translateY) with enhanced shadow and the image scales to 108%
4. **Given** a user sees recipe metadata, **When** viewing the card footer, **Then** metadata displays with icons for likes count, cooking time, and servings in a single row with consistent spacing
5. **Given** a user clicks the favorite button, **When** clicked, **Then** the heart icon fills with coral color, the button scales slightly, and the favorite state is saved to localStorage
6. **Given** a user returns to the page, **When** the page loads, **Then** previously favorited recipes display with filled heart icons based on localStorage data
7. **Given** a user views recipe title, **When** reading the card, **Then** title displays in Crimson Pro serif font at 1.35rem with tighter line height

---

### Edge Cases

- What happens when recipe cards have very long titles? (Should truncate with ellipsis after 2-3 lines using line-clamp or max-height)
- How does the layout respond on tablets (768px-1024px width)? (Grid automatically adjusts between 2-3 columns using minmax(340px, 1fr) - no fixed breakpoint needed)
- What happens when images fail to load? (Should show gradient placeholder background)
- How does the sticky header behave on very small mobile screens? (Should reduce padding and hide tagline)
- What happens when a recipe has no category badge? (Badge section should collapse/hide)
- How do animations perform on low-end devices? (Should use prefers-reduced-motion media query to simplify: reduce duration to 0.15s, disable staggered delays, remove scale/transform effects while keeping basic opacity transitions)
- What happens when localStorage is full or disabled? (Favorite button continues to work for current session, shows warning if storage fails)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update the color scheme to use cream background (#f8f7f4), white cards (#ffffff), coral accent (#e17055), and defined text colors (primary: #2d3436, secondary: #636e72, muted: #95a3ab)
- **FR-002**: System MUST implement sticky header with logo (N icon in gradient box + "Nozomi's Recipes" text) that remains fixed during scrolling
- **FR-002a**: System MUST implement logo click behavior: smooth scroll to top when on homepage, navigate to homepage when on other pages
- **FR-003**: System MUST display tagline "赤身肉・加工肉・バターを使わないレシピ" in header on desktop, hidden on mobile
- **FR-004**: System MUST implement header scroll behavior that adds "scrolled" class when user scrolls past 50px, reducing padding and adding shadow
- **FR-005**: System MUST display search box in hero section with rounded corners (16px), search icon, placeholder text, and focus states with coral border and glow
- **FR-006**: System MUST implement tab navigation with four tabs: すべてのレシピ (active by default), 今日のおすすめ, カテゴリー, お気に入り - visual styling only, no content switching in initial implementation
- **FR-007**: System MUST display active tab with coral bottom border (2px) and bold font weight, allowing visual state changes on click without content filtering
- **FR-008**: System MUST show section headers "新着レシピ" and "人気レシピ" with "すべて見る" links containing right arrow icons
- **FR-009**: System MUST display recipe cards with 75% padding-top aspect ratio containers, rounded corners (20px), and smooth shadow transitions
- **FR-010**: System MUST show category badges (和食/中華/地中海食/etc.) on recipe card images with white background, backdrop blur, and rounded corners
- **FR-011**: System MUST implement favorite button as circular white button with heart icon in top-right of recipe images, with active/inactive states persisted in browser localStorage
- **FR-011a**: System MUST save favorite state to localStorage when users click the favorite button, storing recipe IDs in a persistent array
- **FR-011b**: System MUST load favorite states from localStorage on page load and apply filled heart icon state to matching recipe cards
- **FR-012**: System MUST display recipe metadata with icons for likes count, cooking time, and servings in card footer
- **FR-013**: System MUST implement hover effect on recipe cards: translateY(-8px), enhanced shadow, and image scale(1.08)
- **FR-014**: System MUST implement staggered fade-in animations for recipe cards with delays (0.1s, 0.2s, 0.3s, etc.)
- **FR-015**: System MUST use Crimson Pro font (weights: 300, 400, 600) for headings and recipe titles via Google Fonts
- **FR-016**: System MUST use Outfit font (weights: 300, 400, 500, 600) for body text and UI elements via Google Fonts
- **FR-017**: System MUST implement responsive grid using CSS Grid with repeat(auto-fill, minmax(340px, 1fr)) to dynamically adjust columns: typically 1 column on mobile (<768px), 2-3 columns on tablet (768-1024px), and 3-4 columns on desktop (>1024px) based on available space
- **FR-018**: System MUST apply CSS custom properties for colors, shadows, and theme values defined in :root
- **FR-019**: System MUST implement smooth transitions using cubic-bezier(0.4, 0, 0.2, 1) timing function
- **FR-020**: System MUST apply -webkit-font-smoothing: antialiased for improved text rendering
- **FR-021**: System MUST implement @media (prefers-reduced-motion: reduce) to simplify animations: reduce transition duration to 0.15s, disable staggered card animations, remove scale and translateY transforms while preserving basic opacity transitions

### Key Entities

- **Color Theme**: Represents the new color palette with primary background (#f8f7f4), secondary background (#ffffff), text colors (primary, secondary, muted), accent colors (primary #e17055, secondary #fab1a0), border color (#e8e6e1), and shadow definitions
- **Typography System**: Represents font choices with Crimson Pro for serif headings/titles and Outfit for sans-serif body/UI text, including weight variations and letter spacing adjustments
- **Recipe Card**: Visual component with image container (75% aspect ratio), category badge overlay, favorite button overlay, content section (title, description), and metadata footer (likes, time, servings with icons)
- **Header Component**: Sticky navigation with logo section (icon + text), optional tagline, scroll-responsive styling, and backdrop blur effect
- **Animation System**: Defines transition timings, hover effects, scroll triggers, and staggered card animations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage loads and displays with the new color scheme and typography within 2 seconds on standard connections
- **SC-002**: Recipe cards display hover animations smoothly at 60fps on modern browsers (Chrome, Firefox, Safari, Edge)
- **SC-003**: All interactive elements (cards, buttons, tabs, links) respond to hover and click states within 100ms
- **SC-004**: Header remains sticky and visible during scroll with smooth transition effects
- **SC-005**: Layout adapts responsively across screen sizes: mobile (<768px shows 1 column), tablet (768-1024px shows 2-3 columns), desktop (>1024px shows 3-4 columns)
- **SC-006**: Recipe card staggered animations complete for 6 cards within 600ms (0.1s increments)
- **SC-007**: Search box focus states activate within 50ms with smooth border color transition
- **SC-008**: Tab navigation switches active state immediately on click with visual feedback
- **SC-009**: All images display with fallback gradient background when loading or on error
- **SC-010**: Typography renders clearly with proper font weights and spacing across all supported browsers
