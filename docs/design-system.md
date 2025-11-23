# Design System

> Design system được cấu hình trong `app.config.ts` và `app/assets/css/main.css` theo design specifications.

## 📚 Mục lục

1. [Colors](#colors)
2. [Typography](#typography)
3. [Responsive](#responsive)
4. [Usage](#usage)

---

## Colors

### Primary Colors

Design system sử dụng **Green** làm primary color với các shades:

- **Soft Primary**: `#84D187` - Màu xanh lá nhạt
- **Primary**: `#00B207` - Màu xanh lá chính
- **Hard Primary**: `#2C742F` - Màu xanh lá đậm

**Nguồn**: Được định nghĩa trong `main.css` với `--color-primary-*` variables.

### Semantic Colors

- **Warning**: `#FFB400` - Màu cam/vàng cho cảnh báo
- **Danger/Error**: `#EA4848` - Màu đỏ cho lỗi
- **White**: `#FFFFFF` - Màu trắng

### Gray Scale

Gray scale từ `Gray 9` (đậm nhất) đến `Gray .5` (nhạt nhất):

- `Gray 9`: `#171717`
- `Gray 8`: `#262626`
- `Gray 7`: `#404040`
- `Gray 6`: `#525252`
- `Gray 5`: `#737373`
- `Gray 4`: `#a3a3a3`
- `Gray 3`: `#d4d4d4`
- `Gray 2`: `#e5e5e5`
- `Gray 1`: `#f5f5f5`
- `Gray .5`: `#fafafa`

### Green Gray Scale

Green Gray scale với tông xanh lá:

- `Green Gray 9`: `#1f341f`
- `Green Gray 8`: `#2f4f2f`
- `Green Gray 7`: `#3d663d`
- `Green Gray 6`: `#4a7f4a`
- `Green Gray 5`: `#5a9a5a`
- Và các shades khác...

### Sử dụng trong Nuxt UI

```vue
<template>
  <!-- Primary color -->
  <UButton color="primary">Primary Button</UButton>

  <!-- Warning color -->
  <UAlert color="warning" title="Warning" />

  <!-- Error color -->
  <UAlert color="error" title="Error" />
</template>
```

### CSS Variables

```css
/* Primary colors */
--color-primary-500: #00b207; /* Primary */
--color-primary-400: #84d187; /* Soft Primary */
--color-primary-600: #2c742f; /* Hard Primary */

/* Warning */
--color-warning-400: #ffb400;

/* Error */
--color-error-500: #ea4848;
```

---

## Typography

### Font Family

**Poppins** - Google Font

Font được tự động load bởi Nuxt Fonts khi khai báo trong `@theme`:

```css
@theme {
  --font-sans: 'Poppins', system-ui, sans-serif;
}
```

### Font Weights

Poppins hỗ trợ các weights:

- **300** - Light
- **400** - Regular (default)
- **500** - Medium
- **600** - Semibold
- **700** - Bold

### Typography Scale

#### Display & Headings

| Style      | Size            | Weight    | Line Height | Class                             |
| ---------- | --------------- | --------- | ----------- | --------------------------------- |
| Display 01 | 64px (4rem)     | 400 / 600 | 1.2         | `.display-01` / `.display-01-600` |
| Heading 01 | 48px (3rem)     | 400 / 600 | 1.3         | `.heading-01` / `.heading-01-600` |
| Heading 02 | 36px (2.25rem)  | 400 / 600 | 1.3         | `.heading-02` / `.heading-02-600` |
| Heading 03 | 30px (1.875rem) | 400 / 600 | 1.4         | `.heading-03` / `.heading-03-600` |
| Heading 04 | 24px (1.5rem)   | 400 / 600 | 1.4         | `.heading-04` / `.heading-04-600` |
| Heading 05 | 20px (1.25rem)  | 400 / 600 | 1.5         | `.heading-05` / `.heading-05-600` |

#### Body Text

| Style       | Size            | Weight                | Line Height | Class          |
| ----------- | --------------- | --------------------- | ----------- | -------------- |
| Body XXL    | 24px (1.5rem)   | 400 / 500 / 600 / 800 | 1.6         | `.body-xxl`    |
| Body XL     | 20px (1.25rem)  | 400 / 500 / 600 / 800 | 1.6         | `.body-xl`     |
| Body Large  | 18px (1.125rem) | 400 / 500 / 600 / 800 | 1.6         | `.body-large`  |
| Body Medium | 16px (1rem)     | 400 / 500 / 600 / 800 | 1.6         | `.body-medium` |
| Body Small  | 14px (0.875rem) | 400 / 500 / 600 / 800 | 1.5         | `.body-small`  |
| Body Tiny   | 12px (0.75rem)  | 400 / 500 / 600 / 800 | 1.5         | `.body-tiny`   |

### Usage Examples

```vue
<template>
  <!-- Display -->
  <h1 class="display-01">Display Text</h1>
  <h1 class="display-01-600">Display Text Bold</h1>

  <!-- Headings -->
  <h2 class="heading-01">Heading 01</h2>
  <h3 class="heading-02-600">Heading 02 Bold</h3>

  <!-- Body -->
  <p class="body-large">Large body text</p>
  <p class="body-medium font-medium">Medium body text with medium weight</p>
  <p class="body-small font-semibold">Small body text with semibold weight</p>
</template>
```

### Responsive Typography

Typography tự động scale down trên mobile:

```css
@media (max-width: 768px) {
  .display-01 {
    font-size: 2.5rem;
  } /* 40px */
  .heading-01 {
    font-size: 2rem;
  } /* 32px */
  .heading-02 {
    font-size: 1.75rem;
  } /* 28px */
  .heading-03 {
    font-size: 1.5rem;
  } /* 24px */
}
```

---

## Responsive

### Breakpoints

Design system hỗ trợ các breakpoints:

- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px
- **3xl**: 1920px

### Container

Container responsive với padding:

- **Mobile**: `1.5rem` (24px) left/right
- **Tablet**: `2rem` (32px) left/right
- **Desktop**: `18.75rem` (300px) left/right
- **Max width**: `1920px`

```vue
<template>
  <div class="container-responsive">
    <!-- Content -->
  </div>
</template>
```

### Layout Specifications

Theo design specifications:

- **Width**: 1920px (max)
- **Padding**: 120px top/bottom, 300px left/right (desktop)
- **Gap**: 50px between sections

---

## Usage

### Configuration Files

1. **`app.config.ts`**: Runtime color configuration
2. **`app/assets/css/main.css`**: Theme variables, colors, typography

### Using Colors

```vue
<script setup>
// Colors are available via Nuxt UI components
</script>

<template>
  <!-- Semantic colors -->
  <UButton color="primary">Primary</UButton>
  <UButton color="warning">Warning</UButton>
  <UButton color="error">Error</UButton>

  <!-- Custom colors via CSS -->
  <div class="bg-primary-500 text-white">Primary Background</div>
  <div class="bg-soft-primary-400">Soft Primary Background</div>
  <div class="text-hard-primary-600">Hard Primary Text</div>
</template>
```

### Using Typography

```vue
<template>
  <!-- Display -->
  <h1 class="display-01 font-normal">Display 01</h1>
  <h1 class="display-01-600">Display 01 Bold</h1>

  <!-- Headings -->
  <h2 class="heading-01">Heading 01</h2>
  <h3 class="heading-02-600">Heading 02 Bold</h3>

  <!-- Body -->
  <p class="body-large">Large body text</p>
  <p class="body-medium font-medium">Medium body text</p>
  <p class="body-small font-semibold">Small body text</p>
</template>
```

### Custom CSS Classes

```css
/* Use design system colors */
.my-component {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  border: 1px solid var(--color-primary-600);
}

/* Use typography classes */
.my-title {
  @apply heading-03-600;
}

.my-text {
  @apply body-medium font-medium;
}
```

---

## File Locations

- **`apps/web/app/app.config.ts`**: Runtime configuration
- **`apps/web/app/assets/css/main.css`**: Theme definitions
- **`docs/design-system.md`**: This documentation

---

## References

- **Nuxt UI Theme**: https://ui.nuxt.com/docs/getting-started/theme
- **Nuxt UI CSS Variables**: https://ui.nuxt.com/docs/getting-started/theme/css-variables
- **Tailwind CSS Theme**: https://tailwindcss.com/docs/theme
- **Poppins Font**: https://fonts.google.com/specimen/Poppins

---

_Design system được cấu hình theo design specifications. Cập nhật lần cuối: 2024_
