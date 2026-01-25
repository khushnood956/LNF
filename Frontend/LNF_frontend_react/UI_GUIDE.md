# 🎨 Lost & Found - UI/UX Guide

## Color Palette

### Primary Colors
- **Indigo 600** (`#4f46e5`) - Primary buttons, links, accents
- **Purple 600** (`#9333ea`) - Gradient accents in navbar
- **White** (`#ffffff`) - Cards, backgrounds
- **Gray 50** (`#f9fafb`) - Page background

### Status Colors
- **Green 100/800** - Found items badge
- **Orange 100/800** - Lost items badge
- **Red 600** - Delete actions
- **Blue 600** - Edit actions

## Typography

### Font Family
- **Inter** - Primary font (Google Fonts)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Text Sizes
- Page titles: `text-3xl` (30px)
- Card titles: `text-xl` (20px)
- Body text: `text-base` (16px)
- Labels: `text-sm` (14px)
- Badges: `text-xs` (12px)

## Component Patterns

### Cards
- White background with `rounded-xl` corners
- Shadow: `shadow-md` → `shadow-xl` on hover
- Border: `border border-gray-100`
- Padding: `p-6` on mobile, `p-8` on desktop

### Buttons

#### Primary Button
```jsx
bg-indigo-600 text-white hover:bg-indigo-700
rounded-lg font-semibold transition-colors duration-200
```

#### Secondary Button
```jsx
border border-gray-300 text-gray-700 hover:bg-gray-50
rounded-lg font-semibold transition-colors duration-200
```

#### Danger Button
```jsx
bg-red-600 text-white hover:bg-red-700
rounded-lg font-semibold transition-colors duration-200
```

### Forms

#### Input Fields
```jsx
px-4 py-3 border border-gray-300 rounded-lg
focus:ring-2 focus:ring-indigo-500 focus:border-transparent
```

#### Textarea
```jsx
Same as input with rows="4"
```

#### Checkbox
```jsx
w-5 h-5 text-indigo-600 border-gray-300 rounded
focus:ring-indigo-500
```

### Badges
```jsx
// Found
bg-green-100 text-green-800 px-3 py-1 rounded-full
text-xs font-semibold uppercase

// Lost  
bg-orange-100 text-orange-800 px-3 py-1 rounded-full
text-xs font-semibold uppercase
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md - lg)
- **Desktop**: > 1024px (lg+)

### Grid Layouts
```jsx
// Home page item grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

// Form container
max-w-2xl mx-auto

// Detail page
max-w-4xl mx-auto
```

## Animations

### Toast Notification
- **Animation**: Slide in from right
- **Duration**: 300ms
- **Auto-dismiss**: 4 seconds

### Modal
- **Animation**: Fade in + scale
- **Duration**: 200ms
- **Backdrop**: Black with 50% opacity

### Cards
- **Hover**: Shadow elevation
- **Transition**: 300ms

### Buttons
- **Hover**: Background color change
- **Transition**: 200ms

## Spacing System

- **Page padding**: `px-4 sm:px-6 lg:px-8`
- **Section spacing**: `py-8`
- **Card padding**: `p-6 md:p-8`
- **Button padding**: `px-4 py-2` (small), `px-6 py-3` (regular)
- **Form field margin**: `mb-6` (24px)

## Icons

Using inline SVG from Heroicons:
- **Back arrow**: `M15 19l-7-7 7-7`
- **Plus**: `M12 4v16m8-8H4`
- **Close**: `×`

## Loading States

### Spinner
- Circular border animation
- Indigo color
- Size: `h-12 w-12`

### Button Loading
- Text changes to "Loading..." / "Submitting..."
- Cursor: `cursor-not-allowed`
- Opacity: Reduced via `disabled:bg-gray-400`

## Empty States

- Large emoji icon (📦)
- Bold heading
- Helpful message
- Call-to-action button

## Mobile Optimizations

### Sticky Add Button (Mobile Only)
```jsx
md:hidden fixed bottom-6 right-6
bg-indigo-600 text-white p-4 rounded-full shadow-lg
```

### Form Layout
- Single column on mobile
- Increased touch targets (min 44px height)
- Clear field labels above inputs

### Navigation
- Simplified on mobile
- Burger menu not needed (only 2 actions)

## Accessibility

- Semantic HTML (`nav`, `main`, `button`, `form`)
- Clear labels with `for` attributes
- Focus states on all interactive elements
- Color contrast meets WCAG AA standards
- Keyboard navigation supported

## Best Practices

1. **Always show loading states** during API calls
2. **Provide user feedback** via toast notifications
3. **Validate on client-side** before submitting
4. **Disable forms** during submission
5. **Use confirmation modals** for destructive actions
6. **Show empty states** when no data
7. **Handle errors gracefully** with user-friendly messages
8. **Optimize for mobile first** then scale up

## Production Checklist

- ✅ Responsive on all screen sizes
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Form validation (client-side)
- ✅ Confirmation dialogs for delete
- ✅ Toast notifications for feedback
- ✅ Empty states when no data
- ✅ Smooth transitions and animations
- ✅ Accessible markup and focus states
- ✅ SEO meta tags in HTML
- ✅ Optimized fonts and assets
