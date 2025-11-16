<template>
  <div class="flex items-center gap-3">
    <UButton
      variant="outline"
      size="sm"
      :disabled="quantity <= min"
      @click="decrease"
    >
      <UIcon
        name="i-heroicons-minus"
        class="w-4 h-4"
      />
    </UButton>
    <UInput
      :model-value="quantity"
      type="number"
      :min="min"
      :max="max"
      class="w-20 text-center"
      @update:model-value="updateQuantity"
    />
    <UButton
      variant="outline"
      size="sm"
      :disabled="quantity >= max"
      @click="increase"
    >
      <UIcon
        name="i-heroicons-plus"
        class="w-4 h-4"
      />
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 100,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const quantity = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const decrease = () => {
  if (quantity.value > props.min) {
    quantity.value = quantity.value - 1
  }
}

const increase = () => {
  if (quantity.value < props.max) {
    quantity.value = quantity.value + 1
  }
}

const updateQuantity = (value: string | number) => {
  const numValue = typeof value === 'string' ? parseInt(value, 10) : value
  if (
    !Number.isNaN(numValue)
    && numValue >= props.min
    && numValue <= props.max
  ) {
    quantity.value = numValue
  }
}
</script>
