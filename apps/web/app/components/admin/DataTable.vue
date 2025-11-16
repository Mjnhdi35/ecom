<template>
  <UCard variant="outline">
    <template v-if="title || $slots.header" #header>
      <div class="flex items-center justify-between">
        <h2 v-if="title" class="text-lg font-semibold text-highlighted">
          {{ title }}
          <span v-if="showCount" class="text-muted font-normal">
            ({{ filteredRows.length }})
          </span>
        </h2>
        <slot name="header" />
      </div>
    </template>

    <template v-if="searchable || filterable" #default>
      <div v-if="searchable || filterable" class="p-4 border-b border-default">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UInput
            v-if="searchable"
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            icon="i-heroicons-magnifying-glass"
            :class="
              searchable && filterable ? 'md:col-span-2' : 'md:col-span-4'
            "
            size="sm"
            @update:model-value="handleSearch"
          />
          <USelect
            v-if="filterable && filterOptions"
            v-model="selectedFilter"
            :options="filterOptions"
            :placeholder="filterPlaceholder"
            size="sm"
            @update:model-value="(value) => handleFilter(value as string)"
          />
        </div>
      </div>
    </template>

    <UTable :rows="filteredRows" :columns="columns as any">
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </UTable>

    <template v-if="pagination || $slots.footer" #footer>
      <div class="flex items-center justify-between">
        <p v-if="pagination" class="text-sm text-muted">
          Showing {{ startIndex }}-{{ endIndex }} of {{ filteredRows.length }}
          {{ itemLabel }}
        </p>
        <slot name="footer" />
        <UPagination
          v-if="pagination"
          v-model="currentPage"
          :total="totalPages"
          :page-size="pageSize"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

type TableColumnType = TableColumn<unknown, unknown> | { key: string; label: string };

interface Props {
  title?: string;
  columns: TableColumnType[];
  rows: Array<Record<string, unknown>>;
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  filterPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  itemLabel?: string;
  showCount?: boolean;
  searchFields?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  searchable: false,
  searchPlaceholder: 'Search...',
  filterable: false,
  filterPlaceholder: 'Filter...',
  pagination: false,
  pageSize: 10,
  itemLabel: 'items',
  showCount: true,
  searchFields: () => [],
});

const emit = defineEmits<{
  search: [query: string];
  filter: [value: string];
}>();

const searchQuery = ref('');
const selectedFilter = ref('');
const currentPage = ref(1);

const filteredRows = computed(() => {
  let result = [...props.rows];

  // Search filtering
  if (props.searchable && searchQuery.value && props.searchFields.length > 0) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((row) =>
      props.searchFields!.some((field) =>
        String(row[field] || '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }

  // Status/Category filtering
  if (props.filterable && selectedFilter.value) {
    // Try to find the filter field by checking which field matches the selected value
    const filterFields = ['status', 'category'];
    const matchingField = filterFields.find((field) =>
      result.some((row) => row[field] === selectedFilter.value),
    );
    if (matchingField) {
      result = result.filter(
        (row) => row[matchingField] === selectedFilter.value,
      );
    }
  }

  // Pagination
  if (props.pagination) {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    result = result.slice(start, end);
  }

  return result;
});

const totalPages = computed(() => {
  if (!props.pagination) return 1;
  const total =
    props.searchable || props.filterable
      ? filteredRows.value.length
      : props.rows.length;
  return Math.ceil(total / props.pageSize);
});

const startIndex = computed(() => {
  if (!props.pagination) return 1;
  return (currentPage.value - 1) * props.pageSize + 1;
});

const endIndex = computed(() => {
  if (!props.pagination) return filteredRows.value.length;
  return Math.min(
    currentPage.value * props.pageSize,
    filteredRows.value.length,
  );
});

const handleSearch = (value: string) => {
  currentPage.value = 1; // Reset to first page on search
  emit('search', value);
};

const handleFilter = (value: string) => {
  currentPage.value = 1; // Reset to first page on filter
  emit('filter', value);
};
</script>
