<template>
  <div class="ecommerce-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Order History
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        View and manage all your orders
      </p>
    </div>

    <UCard variant="outline">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          All Orders
        </h2>
      </template>
      <div class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="border border-gray-200 rounded-lg p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="font-semibold text-gray-900">
                Order #{{ order.id }}
              </div>
              <div class="text-sm text-gray-600">
                {{ order.date }}
              </div>
            </div>
            <UBadge
              :color="
                order.status === 'completed'
                  ? 'success'
                  : order.status === 'pending'
                    ? 'warning'
                    : 'error'
              "
              variant="solid"
            >
              {{ order.status }}
            </UBadge>
          </div>
          <div class="space-y-2 mb-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <NuxtImg
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
                loading="lazy"
                format="webp"
                sizes="64px"
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
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="text-lg font-bold text-gray-900 dark:text-white">
              Total: ${{ order.total }}
            </div>
            <UButton
              variant="outline"
              trailing-icon="i-heroicons-arrow-right"
              @click="navigateTo(`/account/orders/${order.id}`)"
            >
              View Details
            </UButton>
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

const orders = [
  {
    id: '12345',
    date: '15 Jan 2025',
    status: 'completed',
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
  },
  {
    id: '12344',
    date: '12 Jan 2025',
    status: 'pending',
    total: 89.5,
    items: [
      {
        id: 3,
        name: 'Green Lettuce',
        image: '/assets/images/green-lettuce.png',
        quantity: 2,
        price: 9.0,
      },
    ],
  },
]
</script>
