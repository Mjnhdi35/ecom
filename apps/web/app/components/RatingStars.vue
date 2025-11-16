<template>
  <div :class="['flex items-center gap-1', containerClass]">
    <UIcon
      v-for="star in 5"
      :key="star"
      :name="star <= rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
      :class="[
        sizeClass,
        star <= rating ? 'text-warning-500' : 'text-gray-300',
      ]"
    />
    <span
      v-if="showCount"
      :class="['ml-1', countClass]"
    > ({{ count }}) </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number
  count?: number
  showCount?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  showCount: false,
  size: 'md',
})

const sizeClass = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  return sizes[props.size]
})

const countClass = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }
  return `${sizes[props.size]} text-gray-600`
})

const containerClass = computed(() => {
  return ''
})
</script>
