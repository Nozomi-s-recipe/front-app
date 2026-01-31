# Color Migration Guide

This guide helps you migrate from the old color system to the new Material Design-based color system.

## Color System Overview

### Material Design Color Tokens

Our new color system follows Material Design 3 guidelines with the following structure:

```css
/* Primary - Main brand color */
--md-primary: #7ab2d3
--md-on-primary: #ffffff
--md-primary-container: #dff2eb
--md-on-primary-container: #4a628a

/* Secondary - Supporting color */
--md-secondary: #b9e5e8
--md-on-secondary: #4a628a
--md-secondary-container: #dff2eb
--md-on-secondary-container: #4a628a

/* Surface - Background surfaces */
--md-surface: #ffffff
--md-on-surface: #4a628a
--md-surface-variant: #dff2eb
--md-on-surface-variant: #7ab2d3

/* Error - Error states */
--md-error: #dc2626
--md-on-error: #ffffff

/* Outline - Borders and dividers */
--md-outline: #b9e5e8
--md-outline-variant: #e0f2f1
```

## Migration Mappings

### Old → New Color Mappings

| Old Color | New Color | Usage |
|-----------|-----------|-------|
| `cream` | `md-surface-variant` | Background surfaces |
| `coral` | `md-primary` | Primary actions, emphasis |
| `coral-light` | `md-secondary` | Secondary actions |
| `coral-tertiary` | `md-primary-container` | Subtle backgrounds |
| `text-primary` | `md-on-surface` | Primary text |
| `text-secondary` | `md-on-surface-variant` | Secondary text |
| `text-muted` | `md-secondary` | Muted/disabled text |
| `border-color` | `md-outline` | Borders and dividers |
| `base-white` | `md-on-primary` | White text on colored backgrounds |
| `secondary-A` | `md-primary` | Legacy accent color |
| `secondary-B` | `md-secondary` | Legacy accent color |

### Tailwind Class Migrations

```tsx
// Backgrounds
bg-cream → bg-md-surface-variant
bg-white → bg-md-surface
bg-coral → bg-md-primary
bg-coral-tertiary → bg-md-primary-container

// Text
text-text-primary → text-md-on-surface
text-text-secondary → text-md-on-surface-variant
text-text-muted → text-md-secondary
text-base-white → text-md-on-primary
text-coral → text-md-primary

// Borders
border-border-color → border-md-outline
border-coral → border-md-primary

// Strokes (for icons)
stroke-coral → stroke-md-primary
stroke-text-secondary → stroke-md-on-surface-variant
stroke-text-muted → stroke-md-secondary

// Fills (for icons)
fill-coral → fill-md-primary
```

### Common Pattern Migrations

#### Buttons

```tsx
// Old
<button className="bg-coral text-white hover:bg-coral/90">

// New
<button className="bg-md-primary text-md-on-primary hover:bg-md-primary/90">
```

#### Cards

```tsx
// Old
<div className="bg-white border border-border-color">

// New
<div className="bg-md-surface border border-md-outline">
```

#### Text Hierarchy

```tsx
// Old
<h1 className="text-text-primary">Title</h1>
<p className="text-text-secondary">Description</p>
<span className="text-text-muted">Meta</span>

// New
<h1 className="text-md-on-surface">Title</h1>
<p className="text-md-on-surface-variant">Description</p>
<span className="text-md-secondary">Meta</span>
```

#### Input Fields

```tsx
// Old
<input className="bg-cream border-border-color text-text-primary" />

// New
<input className="bg-md-surface-variant border-md-outline text-md-on-surface" />
```

#### Icons

```tsx
// Old
<Heart className="stroke-coral fill-coral" />

// New
<Heart className="stroke-md-primary fill-md-primary" />
```

## shadcn/ui Component Compatibility

The new system maintains backward compatibility with shadcn/ui components through HSL mappings:

- `primary` → mapped to `md-primary`
- `secondary` → mapped to `md-secondary`
- `muted` → mapped to `md-surface-variant`
- `accent` → mapped to `md-surface-variant`
- `destructive` → mapped to `md-error`

**No changes needed for existing shadcn/ui components!**

## Benefits of the New System

1. **Consistency**: Follows Material Design guidelines
2. **Accessibility**: Proper contrast ratios built-in
3. **Semantic**: Color names reflect purpose, not appearance
4. **Maintainability**: Single source of truth for colors
5. **Scalability**: Easy to add dark mode or themes
6. **Reduced Complexity**: Fewer color variables to manage

## Migration Steps

1. Search for old color classes in your component
2. Replace with new Material Design tokens using the mapping table
3. Test visual appearance and accessibility
4. Update any custom CSS using old variables

## Need Help?

- Check the mapping table above
- Look for similar patterns in already-migrated components
- Refer to Material Design 3 color system documentation
