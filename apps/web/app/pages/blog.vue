<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <NewsCard
            v-for="post in blogPosts"
            :key="post.id"
            :image="post.image"
            :title="post.title"
            :excerpt="post.excerpt"
            :author="post.author"
            :date="post.date"
            :comment-count="post.commentCount"
          />
        </div>

        <aside class="lg:col-span-1 space-y-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900">
                Search
              </h3>
            </template>
            <div class="flex gap-2">
              <UInput
                v-model="searchQuery"
                placeholder="Search..."
                class="flex-1"
              />
              <UButton
                color="primary"
                icon="i-heroicons-magnifying-glass"
              />
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900">
                Categories
              </h3>
            </template>
            <div class="space-y-2">
              <NuxtLink
                v-for="category in categories"
                :key="category.name"
                :to="`/blog?category=${category.slug}`"
                class="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <span class="text-gray-700">{{ category.name }}</span>
                <span class="text-sm text-gray-500">({{ category.count }})</span>
              </NuxtLink>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900">
                Recent Posts
              </h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="post in recentPosts"
                :key="post.id"
                class="flex gap-3"
              >
                <NuxtImg
                  :src="post.image"
                  :alt="post.title"
                  class="w-20 h-20 object-cover rounded"
                  loading="lazy"
                  format="webp"
                  sizes="80px"
                />
                <div class="flex-1">
                  <NuxtLink
                    :to="`/blog/${post.slug}`"
                    class="text-sm font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
                  >
                    {{ post.title }}
                  </NuxtLink>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ post.date }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900">
                Tags
              </h3>
            </template>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="tag in tags"
                :key="tag"
                variant="outline"
                size="sm"
                @click="navigateTo(`/blog?tag=${tag}`)"
              >
                {{ tag }}
              </UButton>
            </div>
          </UCard>
        </aside>
      </div>

      <div class="flex justify-center mt-12">
        <UPagination
          v-model="currentPage"
          :total="totalPages"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(5)

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Blog' }]

const blogPosts = [
  {
    id: 1,
    image: '/assets/images/Image.png',
    title: '10 Benefits of Eating Organic Food',
    excerpt:
      'Discover the amazing health benefits of incorporating organic food into your daily diet...',
    author: 'John Doe',
    date: '15 Jan 2025',
    commentCount: 12,
  },
  {
    id: 2,
    image: '/assets/images/Image-2.png',
    title: 'How to Store Fresh Vegetables',
    excerpt:
      'Learn the best practices for storing your fresh vegetables to maintain their quality...',
    author: 'Jane Smith',
    date: '12 Jan 2025',
    commentCount: 8,
  },
  {
    id: 3,
    image: '/assets/images/green.png',
    title: 'Seasonal Fruits Guide 2025',
    excerpt:
      'A comprehensive guide to seasonal fruits and when to buy them for the best quality...',
    author: 'Mike Johnson',
    date: '10 Jan 2025',
    commentCount: 15,
  },
]

const categories = [
  { name: 'Organic Food', slug: 'organic-food', count: 12 },
  { name: 'Health Tips', slug: 'health-tips', count: 8 },
  { name: 'Recipes', slug: 'recipes', count: 15 },
  { name: 'Farming', slug: 'farming', count: 6 },
]

const recentPosts = [
  {
    id: 1,
    title: '10 Benefits of Eating Organic Food',
    image: '/assets/images/Image.png',
    date: '15 Jan 2025',
    slug: '10-benefits-of-eating-organic-food',
  },
  {
    id: 2,
    title: 'How to Store Fresh Vegetables',
    image: '/assets/images/Image-2.png',
    date: '12 Jan 2025',
    slug: 'how-to-store-fresh-vegetables',
  },
]

const tags = [
  'Organic',
  'Healthy',
  'Vegetables',
  'Fruits',
  'Recipes',
  'Tips',
  'Farming',
]
</script>
