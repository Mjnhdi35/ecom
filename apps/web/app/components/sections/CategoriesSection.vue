<template>
  <section :class="['py-16', bgClass]">
    <UContainer>
      <SectionHeader
        :title="title"
        :view-all-link="viewAllLink"
      />
      <div :class="gridClass">
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :name="category.name"
          :image="category.image"
          :count="category.count"
          :active="category.active"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Category {
  id: number
  name: string
  image: string
  count?: number
  active?: boolean
}

interface Props {
  title: string
  categories: Category[]
  viewAllLink?: string
  bgClass?: string
  gridClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: '',
  gridClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6',
})
</script>
