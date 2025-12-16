# Dashboard Component Patterns

Quick reference for maintaining consistent styling

---

## LAYOUT PATTERNS

### Container with padding and spacing

```tsx
<div className="container mx-auto p-6 space-y-6">
  {children}
</div>
```

### Grid layouts

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">  // Stats cards
<div className="grid gap-6 lg:grid-cols-7">                  // Main content
```

---

## CARD PATTERNS

### Standard card with header

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Stat card with icon

```tsx
<Card className="overflow-hidden">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Metric Name</CardTitle>
    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="h-4 w-4 text-primary" />
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">Value</div>
    <p className="text-xs text-muted-foreground mt-1">
      <span className="text-green-600 font-medium">+12%</span> from last week
    </p>
  </CardContent>
</Card>
```

---

## NAVIGATION PATTERNS

### Active link styling

```tsx
className={cn(
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
  isActive
    ? "bg-primary text-primary-foreground"
    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
)}
```

---

## COLOR USAGE

### Backgrounds

```tsx
bg-background         // Main background
bg-muted/40           // Sidebar background
bg-card               // Card background
bg-accent             // Hover states
bg-primary            // Active states, buttons
```

### Text

```tsx
text-foreground       // Primary text
text-muted-foreground // Secondary text
text-primary          // Accent text
text-primary-foreground // Text on primary bg
```

### Borders

```tsx
border-b              // Bottom border
border                // All borders
```

### Project color indicators

```tsx
bg-blue-500
bg-purple-500
bg-green-500
bg-orange-500
```

---

## SPACING PATTERNS

### Component spacing

```tsx
space-y-4             // Vertical spacing in lists
space-y-6             // Vertical spacing in layouts
gap-2                 // Small gaps (buttons, icons)
gap-4                 // Medium gaps (cards)
gap-6                 // Large gaps (sections)

// Padding
p-3                   // Small padding (list items)
p-4                   // Medium padding (nav items)
p-6                   // Large padding (containers)
px-6                  // Horizontal padding (header)
```

---

## INTERACTIVE STATES

### Hover effects

```tsx
hover:bg-accent/50
hover:bg-accent
hover:text-accent-foreground
transition-colors

// Button variants
variant="ghost"       // Transparent background
variant="outline"     // Bordered
variant="secondary"   // Secondary style
```

---

## RESPONSIVE BREAKPOINTS

### Mobile first approach

```tsx
className="hidden lg:flex"           // Show on large screens
className="lg:hidden"                // Hide on large screens
className="md:grid-cols-2"           // 2 columns on medium
className="lg:grid-cols-4"           // 4 columns on large
className="lg:col-span-4"            // Span 4 columns on large
```

---

## ICON SIZING

```tsx
h-4 w-4               // Small icons (nav, badges)
h-5 w-5               // Medium icons (header buttons)
h-8 w-8               // Large icons (stat card backgrounds)
```

---

## TYPOGRAPHY

```tsx
text-sm               // Small text (nav, descriptions)
text-xs               // Extra small (timestamps, badges)
text-lg               // Large text (headings)
text-2xl              // Extra large (stat values)
text-3xl              // Hero text

font-medium           // Medium weight (nav items)
font-semibold         // Semibold (brand name)
font-bold             // Bold (stat values)
```

---

## SPECIAL EFFECTS

```tsx
// Sticky header
sticky top-0 z-40

// Backdrop blur
backdrop-blur supports-backdrop-filter:bg-background/60

// Rounded corners
rounded-lg            // Standard rounding
rounded-full          // Fully rounded (avatars, badges)

// Shadows (from shadcn components)
// Cards automatically have subtle shadows
```
