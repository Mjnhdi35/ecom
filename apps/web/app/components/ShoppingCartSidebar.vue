<template>
  <USlideover
    v-model="isOpen"
    side="right"
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">
            Shopping Cart ({{ items.length }})
          </h3>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="close"
          />
        </div>
      </template>

      <div
        v-if="items.length > 0"
        class="space-y-4"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="flex gap-4 pb-4 border-b border-gray-200"
        >
          <NuxtImg
            :src="item.image"
            :alt="item.name"
            class="w-20 h-20 object-cover rounded"
            loading="lazy"
            format="webp"
            sizes="80px"
          />
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ item.name }}
            </h4>
            <div class="text-sm text-gray-600 mb-2">
              <QuantitySelector
                v-model="item.quantity"
                :min="1"
                :max="100"
                @update:model-value="updateQuantity(item.id, $event)"
              />
              <span class="ml-2">
                x <span class="font-bold">${{ item.price }}</span>
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-gray-900">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </span>
              <UButton
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark"
                color="error"
                @click="removeItem(item.id)"
              >
                Remove
              </UButton>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-heroicons-shopping-cart"
          class="w-16 h-16 text-gray-300 mx-auto mb-4"
        />
        <p class="text-gray-600 mb-4">
          Your cart is empty
        </p>
        <UButton
          color="primary"
          variant="outline"
          @click="close"
        >
          Continue Shopping
        </UButton>
      </div>

      <template #footer>
        <div class="space-y-4">
          <div class="flex items-center justify-between text-lg font-semibold">
            <span>{{ items.length }} Product</span>
            <span>${{ total }}</span>
          </div>
          <UButton
            color="primary"
            block
            size="lg"
            @click="handleCheckout"
          >
            Checkout
          </UButton>
          <UButton
            variant="outline"
            color="primary"
            block
            size="lg"
            @click="handleGoToCart"
          >
            Go To Cart
          </UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
interface CartItem {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

interface Props {
  modelValue: boolean
  items?: CartItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'checkout': []
  'goToCart': []
  'removeItem': [id: number]
  'updateQuantity': [id: number, quantity: number]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const total = computed(() => {
  return props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const close = () => {
  isOpen.value = false
}

const handleCheckout = () => {
  emit('checkout')
  close()
}

const handleGoToCart = () => {
  emit('goToCart')
  close()
}

const removeItem = (id: number) => {
  emit('removeItem', id)
}

const updateQuantity = (id: number, quantity: number) => {
  emit('updateQuantity', id, quantity)
}
</script>
