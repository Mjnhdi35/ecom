<template>
  <UCard
    variant="outline"
    class="p-6 hover:shadow-md transition-shadow duration-300"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-muted">
          {{ label }}
        </p>
        <p :class="['text-2xl font-bold mt-1', valueColorClass]">
          {{ formattedValue }}
        </p>
        <p
          v-if="change !== undefined"
          class="text-xs mt-1 flex items-center gap-1"
          :class="changeColorClass"
        >
          <UIcon
            :name="change > 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'"
            class="w-4 h-4"
          />
          {{ change > 0 ? '+' : '' }}{{ change }}% from last month
        </p>
        <p
          v-else-if="subtitle"
          class="text-xs text-muted mt-1"
        >
          {{ subtitle }}
        </p>
      </div>
      <div :class="iconContainerClass">
        <UIcon
          :name="icon"
          :class="iconClass"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
type Color
  = | 'primary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
    | 'secondary'
    | 'neutral'

interface Props {
  label: string
  value: string | number
  icon: string
  color?: Color
  change?: number
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const valueColorClass = computed(() => {
  const colorMap: Record<Color, string> = {
    primary: 'text-primary-600 dark:text-primary-400',
    error: 'text-error-600 dark:text-error-400',
    warning: 'text-warning-600 dark:text-warning-400',
    success: 'text-success-600 dark:text-success-400',
    info: 'text-info-600 dark:text-info-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    neutral: 'text-gray-900 dark:text-white',
  }
  return colorMap[props.color]
})

const iconContainerClass = computed(() => {
  const colorMap: Record<Color, string> = {
    primary: 'p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg',
    error: 'p-3 bg-error-100 dark:bg-error-900/20 rounded-lg',
    warning: 'p-3 bg-warning-100 dark:bg-warning-900/20 rounded-lg',
    success: 'p-3 bg-success-100 dark:bg-success-900/20 rounded-lg',
    info: 'p-3 bg-info-100 dark:bg-info-900/20 rounded-lg',
    secondary: 'p-3 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg',
    neutral: 'p-3 bg-gray-100 dark:bg-gray-800 rounded-lg',
  }
  return colorMap[props.color]
})

const iconClass = computed(() => {
  const colorMap: Record<Color, string> = {
    primary: 'w-6 h-6 text-primary-600 dark:text-primary-400',
    error: 'w-6 h-6 text-error-600 dark:text-error-400',
    warning: 'w-6 h-6 text-warning-600 dark:text-warning-400',
    success: 'w-6 h-6 text-success-600 dark:text-success-400',
    info: 'w-6 h-6 text-info-600 dark:text-info-400',
    secondary: 'w-6 h-6 text-secondary-600 dark:text-secondary-400',
    neutral: 'w-6 h-6 text-gray-600 dark:text-gray-400',
  }
  return colorMap[props.color]
})

const changeColorClass = computed(() => {
  if (props.change === undefined) return ''
  return props.change > 0
    ? 'text-success-600 dark:text-success-400'
    : 'text-error-600 dark:text-error-400'
})
</script>
