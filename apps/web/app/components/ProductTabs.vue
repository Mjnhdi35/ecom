<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h2>
      <div class="flex gap-2">
        <UButton
          v-for="tab in tabs"
          :key="tab.value"
          :variant="activeTab === tab.value ? 'solid' : 'outline'"
          :color="activeTab === tab.value ? 'primary' : 'neutral'"
          @click="handleTabChange(tab.value)"
        >
          {{ tab.label }}
        </UButton>
      </div>
    </div>
    <div v-if="activeTab === 'description'">
      <slot name="description" />
    </div>
    <div v-else-if="activeTab === 'additional-info'">
      <slot name="additional-info" />
    </div>
    <div v-else-if="activeTab === 'reviews'">
      <slot name="reviews" />
    </div>
    <div v-else>
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  value: string
}

interface Props {
  title: string
  tabs: Tab[]
  defaultTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: '',
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.value || '')

const emit = defineEmits<{
  tabChange: [value: string]
}>()

const handleTabChange = (value: string) => {
  activeTab.value = value
  emit('tabChange', value)
}
</script>
