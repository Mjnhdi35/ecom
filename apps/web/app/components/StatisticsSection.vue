<template>
  <section class="py-16 bg-primary-600 text-white">
    <UContainer>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center"
        >
          <div class="text-5xl lg:text-6xl font-bold mb-2">
            {{ stat.value }}
          </div>
          <div class="text-lg text-white/90">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

interface Props {
  stats?: Stat[]
}

withDefaults(defineProps<Props>(), {
  stats: () => [
    { value: '37+', label: 'Years of Hard Work' },
    { value: '500k+', label: 'Happy Customer' },
    { value: '28', label: 'Qualified Team Member' },
    { value: '750k+', label: 'Monthly Orders' },
  ],
})
</script>
