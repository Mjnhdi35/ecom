export function useTableFilter<T extends Record<string, unknown>>(
  items: Ref<T[]> | T[],
  options: {
    searchFields?: (keyof T)[];
    filterField?: keyof T;
  } = {},
) {
  const searchQuery = ref('');
  const selectedFilter = ref<string>('');

  const itemsRef = computed(() => {
    return Array.isArray(items) ? items : items.value;
  });

  const filteredItems = computed(() => {
    let result = [...itemsRef.value];

    // Search filtering
    if (
      searchQuery.value &&
      options.searchFields &&
      options.searchFields.length > 0
    ) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((item) =>
        options.searchFields!.some((field) =>
          String(item[field] || '')
            .toLowerCase()
            .includes(query),
        ),
      );
    }

    // Field filtering
    if (selectedFilter.value && options.filterField) {
      result = result.filter(
        (item) => String(item[options.filterField!]) === selectedFilter.value,
      );
    }

    return result;
  });

  const resetFilters = () => {
    searchQuery.value = '';
    selectedFilter.value = '';
  };

  return {
    searchQuery,
    selectedFilter,
    filteredItems,
    resetFilters,
  };
}
