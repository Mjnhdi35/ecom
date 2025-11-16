<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">
            Order Details #{{ order.id }}
          </h2>
          <UBadge
            :color="order.status === 'completed' ? 'success' : 'warning'"
            variant="solid"
          >
            {{ order.status }}
          </UBadge>
        </div>
      </template>
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Items
          </h3>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ item.name }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Quantity: {{ item.quantity }}
                </div>
              </div>
              <div class="font-semibold text-gray-900 dark:text-white">
                ${{ item.price }}
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Shipping Address
            </h3>
            <div
              class="text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              {{ order.shippingAddress.name }}<br>
              {{ order.shippingAddress.street }}<br>
              {{ order.shippingAddress.city }},
              {{ order.shippingAddress.state }} {{ order.shippingAddress.zip
              }}<br>
              {{ order.shippingAddress.country }}
            </div>
          </div>
          <div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Order Summary
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-700">Subtotal:</span>
                <span class="font-semibold">${{ order.subtotal }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Shipping:</span>
                <span class="font-semibold">Free</span>
              </div>
              <div
                class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200"
              >
                <span>Total:</span>
                <span class="text-primary-600">${{ order.total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'account',
})

const route = useRoute()
const orderId = route.params.id as string

const order = {
  id: orderId,
  status: 'completed',
  date: '15 Jan 2025',
  subtotal: 125.99,
  total: 125.99,
  items: [
    {
      id: 1,
      name: 'Green Capsicum',
      image: '/assets/images/tomato.png',
      quantity: 5,
      price: 14.0,
    },
    {
      id: 2,
      name: 'Red Capsicum',
      image: '/assets/images/tomato.png',
      quantity: 1,
      price: 14.0,
    },
  ],
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
}
</script>
