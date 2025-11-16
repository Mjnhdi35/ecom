<template>
  <UButton
    :variant="variant"
    :size="size"
    :color="
      color === 'danger'
        ? 'error'
        : color === 'soft-primary' || color === 'hard-primary'
          ? 'primary'
          : color
    "
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    :class="customColorClass"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'outline' | 'ghost' | 'soft'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'primary'
    | 'soft-primary'
    | 'hard-primary'
    | 'warning'
    | 'danger'
    | 'neutral'
  icon?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md',
  color: 'primary',
})

// Simple color override classes
const customColorClass = computed(() => {
  if (props.color === 'soft-primary') {
    return variantClasses.softPrimary[props.variant] || ''
  }
  if (props.color === 'hard-primary') {
    return variantClasses.hardPrimary[props.variant] || ''
  }
  return ''
})

const variantClasses = {
  softPrimary: {
    solid: '!bg-soft-primary-500 !text-white hover:!bg-soft-primary-600',
    outline:
      '!bg-transparent !border-soft-primary-500 !text-soft-primary-500 hover:!bg-soft-primary-50',
    ghost: '!bg-transparent !text-soft-primary-500 hover:!bg-soft-primary-50',
    soft: '!bg-soft-primary-50 !text-soft-primary-500 hover:!bg-soft-primary-100',
  },
  hardPrimary: {
    solid: '!bg-hard-primary-500 !text-white hover:!bg-hard-primary-600',
    outline:
      '!bg-transparent !border-hard-primary-500 !text-hard-primary-500 hover:!bg-hard-primary-50',
    ghost: '!bg-transparent !text-hard-primary-500 hover:!bg-hard-primary-50',
    soft: '!bg-hard-primary-50 !text-hard-primary-500 hover:!bg-hard-primary-100',
  },
}
</script>
