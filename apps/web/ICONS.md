# Icons Used in Project

This document lists all icons used in the application and their sources.

## Icon Collections

### Lucide Icons (`i-lucide-*`)

Used from `@iconify-json/lucide` package (already installed)

**Icons:**

- `i-lucide-map-pin` - Store location indicator
- `i-lucide-search` - Search functionality
- `i-lucide-heart` - Wishlist
- `i-lucide-shopping-bag` - Shopping cart
- `i-lucide-chevron-down` - Dropdown indicator
- `i-lucide-chevron-right` - Mobile menu navigation
- `i-lucide-phone` - Phone number contact
- `i-lucide-lock` - Secure payment badge
- `i-lucide-server-off` - Server error (500)
- `i-lucide-wrench` - Service unavailable (503)
- `i-lucide-alert-circle` - Generic error
- `i-lucide-home` - Home navigation
- `i-lucide-refresh-cw` - Retry/refresh action
- `i-lucide-arrow-left` - Go back action

### Simple Icons (`i-simple-icons-*`)

Used from Iconify CDN (loaded on-demand)

**Payment Icons:**

- `i-simple-icons-applepay` - Apple Pay
- `i-simple-icons-visa` - Visa
- `i-simple-icons-discover` - Discover
- `i-simple-icons-mastercard` - Mastercard

**Social Media Icons:**

- `i-simple-icons-facebook` - Facebook
- `i-simple-icons-twitter` - Twitter/X
- `i-simple-icons-pinterest` - Pinterest
- `i-simple-icons-instagram` - Instagram

### Line MD Icons (`line-md:*`)

Used from Iconify CDN (loaded on-demand)

**Icons:**

- `line-md:alert-loop` - 404 error indicator

## Icon Loading Strategy

### Current Implementation

- **Lucide Icons**: Pre-installed via `@iconify-json/lucide` package
  - ✅ Already bundled, no CDN requests needed
  - ✅ Fast loading, optimized for production

- **Simple Icons & Line MD**: Loaded from Iconify CDN on-demand
  - ⚠️ Requires network request on first use
  - ✅ Lazy loaded, only loads when needed
  - ✅ No bundle size impact

### Optimization Recommendations

1. **For Production**: Icons are already optimized
   - Lucide icons are bundled (no CDN needed)
   - Other icons load on-demand (minimal impact)

2. **Optional Preloading** (if needed):
   - Can add `@iconify-json/simple-icons` package for payment icons
   - Can add `@iconify-json/line-md` package for line-md icons
   - This would bundle all icons but increase bundle size

3. **Current Setup is Optimal**:
   - Most-used icons (Lucide) are bundled
   - Less-used icons (Simple Icons, Line MD) load on-demand
   - Best balance between bundle size and loading performance

## Total Icon Count

- **Lucide Icons**: 14 icons (bundled)
- **Simple Icons**: 6 icons (CDN)
- **Line MD Icons**: 1 icon (CDN)
- **Total**: 21 unique icons

## Usage Locations

- **Header.vue**: 8 Lucide icons
- **Footer.vue**: 5 Simple Icons + 1 Lucide icon
- **Error.vue**: 5 Lucide icons + 1 Line MD icon
- **Logo.vue**: Uses image, not icon
