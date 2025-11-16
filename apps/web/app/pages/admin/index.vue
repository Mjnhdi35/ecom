<template>
  <div class="space-y-6">
    <UPageHeader
      title="Dashboard"
      description="Welcome back! Here's what's happening today."
    />

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AdminStatCard
        label="Total Revenue"
        :value="`$${stats.revenue.value.toLocaleString()}`"
        icon="i-heroicons-currency-dollar"
        color="primary"
        :change="stats.revenue.change"
      />
      <AdminStatCard
        label="Orders"
        :value="stats.orders.value"
        icon="i-heroicons-shopping-bag"
        color="warning"
        :change="stats.orders.change"
      />
      <AdminStatCard
        label="Customers"
        :value="stats.customers.value"
        icon="i-heroicons-users"
        color="info"
        :change="stats.customers.change"
      />
      <AdminStatCard
        label="Products"
        :value="stats.products.value"
        icon="i-heroicons-cube"
        color="success"
        subtitle="Active products"
      />
    </div>

    <!-- Charts and Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Orders -->
      <UCard variant="outline">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h2>
        </template>
        <div class="space-y-4">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <UIcon
                  name="i-heroicons-shopping-bag"
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  Order #{{ order.id }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ order.customer }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900 dark:text-white">
                ${{ order.total }}
              </p>
              <UBadge
                :color="getStatusColor(order.status)"
                size="sm"
              >
                {{ order.status }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Top Products -->
      <UCard variant="outline">
        <template #header>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Top Products
          </h2>
        </template>
        <div class="space-y-4">
          <div
            v-for="product in topProducts"
            :key="product.id"
            class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              class="w-16 h-16 object-cover rounded-lg"
              loading="lazy"
              format="webp"
              sizes="64px"
            />
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">
                {{ product.name }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ product.sales }} sales
              </p>
            </div>
            <p class="font-semibold text-gray-900 dark:text-white">
              ${{ product.revenue }}
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminData } from '~/composables/useAdminData'

definePageMeta({
  layout: 'admin',
})

const { stats, recentOrders, topProducts, getStatusColor } = useAdminData()
</script>
