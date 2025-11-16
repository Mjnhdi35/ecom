<template>
  <div class="ecommerce-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Welcome back! Here's your account overview.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard
          variant="outline"
          class="p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Orders
              </p>
              <p
                class="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1"
              >
                12
              </p>
            </div>
            <div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-shopping-bag"
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
          </div>
        </UCard>

        <UCard
          variant="outline"
          class="p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Orders
              </p>
              <p
                class="text-3xl font-bold text-warning-600 dark:text-warning-400 mt-1"
              >
                3
              </p>
            </div>
            <div class="p-3 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-clock"
                class="w-6 h-6 text-warning-600 dark:text-warning-400"
              />
            </div>
          </div>
        </UCard>

        <UCard
          variant="outline"
          class="p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed Orders
              </p>
              <p
                class="text-3xl font-bold text-success-600 dark:text-success-400 mt-1"
              >
                9
              </p>
            </div>
            <div class="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-success-600 dark:text-success-400"
              />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Recent Orders -->
      <UCard variant="outline">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h3>
        </template>
        <div class="space-y-4">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">
                Order #{{ order.id }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ order.date }}
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-gray-900 dark:text-white mb-2">
                ${{ order.total }}
              </div>
              <UBadge
                :color="order.status === 'completed' ? 'success' : 'warning'"
                size="sm"
              >
                {{ order.status }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'account',
})

const recentOrders = [
  {
    id: '12345',
    date: '15 Jan 2025',
    total: 125.99,
    status: 'completed',
  },
  {
    id: '12344',
    date: '12 Jan 2025',
    total: 89.5,
    status: 'pending',
  },
  {
    id: '12343',
    date: '10 Jan 2025',
    total: 156.75,
    status: 'completed',
  },
]
</script>
