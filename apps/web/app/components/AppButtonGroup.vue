<template>
  <div
    class="flex gap-2"
    :class="{ 'flex-col': orientation === 'vertical' }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
})
</script>
