<script setup lang="ts">
// Component name must be multi-word for Vue linting
defineOptions({
  name: 'AppLogo',
})

interface Props {
  /**
   * Link destination
   * @default '/'
   */
  to?: string
  /**
   * Show brand text
   * @default true
   */
  showText?: boolean
  /**
   * Logo size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Custom text color (hex code)
   * @default '#1A4314'
   */
  textColor?: string
  /**
   * Custom brand name
   * @default 'Agriculture'
   */
  brandName?: string
  /**
   * Custom aria label
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  showText: true,
  size: 'md',
  textColor: '#1A4314',
  brandName: 'Agriculture',
  ariaLabel: undefined,
})

// Logo image path
const logoImage = '/assets/images/plant-logo.png'

// Size classes for icon
const iconSizeClasses = computed(() => {
  const sizes = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-12',
  }
  return sizes[props.size]
})

// Size classes for text
const textSizeClasses = computed(() => {
  const sizes = {
    sm: 'text-base', // 16px
    md: 'text-lg', // 18px
    lg: 'text-xl', // 20px
    xl: 'text-2xl', // 24px
  }
  return sizes[props.size]
})

// Size classes for container
const sizeClasses = computed(() => {
  const sizes = {
    sm: '',
    md: '',
    lg: '',
    xl: '',
  }
  return sizes[props.size]
})

// Icon dimensions for img tag
const iconWidth = computed(() => {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  }
  return sizes[props.size]
})

const iconHeight = computed(() => {
  return iconWidth.value
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="logo inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
    :class="sizeClasses"
    :aria-label="ariaLabel || 'Agriculture - Go to homepage'"
  >
    <!-- Logo Icon -->
    <div
      class="logo-icon shrink-0"
      :class="iconSizeClasses"
    >
      <NuxtImg
        :src="logoImage"
        :alt="`${brandName} logo`"
        class="w-full h-full object-contain"
        :width="iconWidth"
        :height="iconHeight"
        preset="logo"
        loading="eager"
        format="png"
        quality="90"
      />
    </div>

    <!-- Brand Name -->
    <span
      v-if="showText"
      class="logo-text font-bold tracking-tight"
      :class="textSizeClasses"
      :style="{ color: textColor }"
    >
      {{ brandName }}
    </span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  font-family: var(--font-sans, 'Poppins', system-ui, sans-serif);
}

.logo-icon {
  /* Ensure icon maintains aspect ratio */
  aspect-ratio: 1;
}

.logo-text {
  /* Dark green color from design system */
  color: #1a4314;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .logo {
    gap: 0.75rem;
  }
}
</style>
