<template>
  <UButton
    :variant="variant"
    :size="size"
    :color="mappedColor"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    class="rounded-full"
    :class="customClass"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'primary'
    | 'soft-primary'
    | 'hard-primary'
    | 'warning'
    | 'danger'
    | 'neutral'
    | 'white'
  icon?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md',
  color: 'primary',
})

const mappedColor = computed(() => {
  if (
    props.color === 'white'
    || props.color === 'soft-primary'
    || props.color === 'hard-primary'
  ) {
    return 'primary'
  }
  return props.color === 'danger' ? 'error' : props.color
})

const customClass = computed(() => {
  if (props.color === 'white') {
    return props.variant === 'solid'
      ? '!bg-white !text-gray-900 hover:!bg-gray-50'
      : '!bg-transparent !border-white !text-white hover:!bg-white/10'
  }
  if (props.color === 'soft-primary') {
    return '!bg-soft-primary-500 !text-white hover:!bg-soft-primary-600'
  }
  if (props.color === 'hard-primary') {
    return '!bg-hard-primary-500 !text-white hover:!bg-hard-primary-600'
  }
  if (props.color === 'neutral' && props.variant === 'ghost') {
    return '!bg-transparent !text-gray-400 hover:!bg-gray-100'
  }
  return ''
})
</script>
