<template>
  <div class="space-y-6">
    <UPageHeader
      title="Orders"
      description="Manage and track all orders"
    />

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <AdminStatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :icon="stat.icon"
        :color="stat.color"
          />
    </div>

    <!-- Orders Table -->
    <AdminDataTable
      title="All Orders"
      :columns="columns as any"
      :rows="adminOrders as any"
      :searchable="true"
      search-placeholder="Search orders..."
      :filterable="true"
      :filter-options="statusOptions"
      filter-placeholder="Filter by status"
      :pagination="true"
      :page-size="10"
      item-label="orders"
      :search-fields="['id', 'customer']"
      @search="handleSearch"
      @filter="handleFilter"
    >
        <template #status-data="{ row }">
          <UBadge
            :color="getStatusColor((row as unknown as AdminOrder).status)"
            size="sm"
          >
            {{ (row as unknown as AdminOrder).status }}
          </UBadge>
        </template>

      <template #actions-data="{ row }">
          <UButton
            variant="ghost"
            size="sm"
            trailing-icon="i-heroicons-arrow-right"
          :to="`/admin/orders/${(row as unknown as AdminOrder).id}`"
          >
            View
          </UButton>
        </template>
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import type { AdminOrder } from '~/composables/useAdminData'

definePageMeta({
  layout: 'admin',
})

const { adminOrders, orderStats, getStatusColor } = useAdminData()

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]

const stats = [
  {
    label: 'Total Orders',
    value: orderStats.total,
    icon: 'i-heroicons-shopping-bag',
    color: 'primary' as const,
  },
  {
    label: 'Pending',
    value: orderStats.pending,
    icon: 'i-heroicons-clock',
    color: 'warning' as const,
  },
  {
    label: 'Processing',
    value: orderStats.processing,
    icon: 'i-heroicons-arrow-path',
    color: 'info' as const,
  },
  {
    label: 'Completed',
    value: orderStats.completed,
    icon: 'i-heroicons-check-circle',
    color: 'success' as const,
  },
]

const handleSearch = (query: string) => {
  // Additional search logic if needed
  console.log('Search:', query)
}

const handleFilter = (value: string) => {
  // Additional filter logic if needed
  console.log('Filter:', value)
}
</script>
