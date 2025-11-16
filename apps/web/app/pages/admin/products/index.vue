<template>
  <div class="space-y-6">
    <UPageHeader
      title="Products"
      description="Manage your product catalog"
      :links="[
        {
          label: 'Add Product',
          icon: 'i-heroicons-plus',
          color: 'primary',
          size: 'lg',
        },
      ]"
        />

    <!-- Products Table -->
    <AdminDataTable
      title="All Products"
      :columns="columns as any"
      :rows="adminProducts as any"
      :searchable="true"
      search-placeholder="Search products..."
      :filterable="true"
      :filter-options="combinedFilters"
      filter-placeholder="Filter..."
      :pagination="true"
      :page-size="10"
      item-label="products"
      :search-fields="['name', 'category']"
      @search="handleSearch"
      @filter="handleFilter"
    >
      <template #header>
          <div class="flex items-center gap-2">
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-funnel"
          />
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-arrow-down-tray"
            />
        </div>
      </template>

        <template #image-data="{ row }">
          <NuxtImg
            :src="(row as unknown as AdminProduct).image"
            :alt="(row as unknown as AdminProduct).name"
            class="w-12 h-12 object-cover rounded"
            loading="lazy"
            format="webp"
            sizes="48px"
          />
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="getStatusColor((row as unknown as AdminProduct).status)"
            size="sm"
          >
            {{ (row as unknown as AdminProduct).status }}
          </UBadge>
        </template>

      <template #actions-data="{ row }">
          <div class="flex items-center gap-2">
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-pencil"
            :to="`/admin/products/${(row as unknown as AdminProduct).id}/edit`"
          />
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-trash"
              color="error"
            />
          </div>
        </template>
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import type { AdminProduct } from '~/composables/useAdminData'

definePageMeta({
  layout: 'admin',
})

const { adminProducts, getStatusColor } = useAdminData()

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Fruits', value: 'fruits' },
  { label: 'Vegetables', value: 'vegetables' },
  { label: 'Organic', value: 'organic' },
]

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Out of Stock', value: 'out-of-stock' },
]

const combinedFilters = computed(() => [
  ...categories,
  ...statusOptions.filter(opt => opt.value !== ''),
])

const columns = [
  { key: 'image', label: 'Image' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
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
