<template>
  <div class="flex items-center gap-4">
    <div
      v-for="(item, index) in timeLeft"
      :key="index"
      class="flex flex-col items-center"
    >
      <div
        class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl font-bold"
      >
        {{ item.value }}
      </div>
      <span class="text-sm mt-1 text-white/80">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  endDate: string
}

const props = defineProps<Props>()

const timeLeft = ref([
  { label: 'Days', value: '00' },
  { label: 'Hours', value: '00' },
  { label: 'Minutes', value: '00' },
  { label: 'Seconds', value: '00' },
])

const updateTimer = () => {
  const now = new Date().getTime()
  const end = new Date(props.endDate).getTime()
  const distance = end - now

  if (distance < 0) {
    timeLeft.value = [
      { label: 'Days', value: '00' },
      { label: 'Hours', value: '00' },
      { label: 'Minutes', value: '00' },
      { label: 'Seconds', value: '00' },
    ]
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  timeLeft.value = [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(seconds).padStart(2, '0') },
  ]
}

onMounted(() => {
  updateTimer()
  const interval = setInterval(updateTimer, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>
