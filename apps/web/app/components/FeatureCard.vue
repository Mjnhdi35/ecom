<template>
  <UCard
    variant="outline"
    class="p-6 hover:shadow-lg transition-all duration-300"
  >
    <div class="flex items-center gap-4">
      <div
        class="flex items-center justify-center w-16 h-16 rounded-full"
        :class="iconBgClass"
      >
        <UIcon
          :name="icon"
          class="w-8 h-8"
          :class="iconColorClass"
        />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ description }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  iconBgClass?: string
  iconColorClass?: string
}

withDefaults(defineProps<Props>(), {
  iconBgClass: 'bg-primary-100',
  iconColorClass: 'text-primary-600',
})
</script>
