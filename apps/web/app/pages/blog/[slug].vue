<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2">
          <NuxtImg
            :src="post.image"
            :alt="post.title"
            class="w-full h-96 object-cover rounded-lg mb-6"
            loading="eager"
            format="webp"
            sizes="sm:100vw md:66vw"
          />
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span class="flex items-center gap-1">
              <UIcon
                name="i-heroicons-user"
                class="w-4 h-4"
              />
              {{ post.author }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-heroicons-calendar"
                class="w-4 h-4"
              />
              {{ post.date }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon
                name="i-heroicons-chat-bubble-left"
                class="w-4 h-4"
              />
              {{ post.commentCount }} Comments
            </span>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-6">
            {{ post.title }}
          </h1>
          <div class="prose max-w-none">
            <p
              v-for="(para, index) in post.content"
              :key="index"
              class="text-gray-700 mb-4 leading-relaxed"
            >
              {{ para }}
            </p>
          </div>

          <div
            class="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200"
          >
            <span class="font-semibold text-gray-900">Tags:</span>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="tag in post.tags"
                :key="tag"
                variant="outline"
                size="sm"
                @click="navigateTo(`/blog?tag=${tag}`)"
              >
                {{ tag }}
              </UButton>
            </div>
          </div>

          <div
            class="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200"
          >
            <span class="font-semibold text-gray-900">Share:</span>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                size="sm"
                icon="i-simple-icons-facebook"
                class="text-primary-600"
              />
              <UButton
                variant="ghost"
                size="sm"
                icon="i-simple-icons-twitter"
              />
              <UButton
                variant="ghost"
                size="sm"
                icon="i-simple-icons-pinterest"
              />
              <UButton
                variant="ghost"
                size="sm"
                icon="i-simple-icons-instagram"
              />
            </div>
          </div>

          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              {{ post.comments.length }} Comments
            </h2>
            <div class="space-y-6">
              <div
                v-for="comment in post.comments"
                :key="comment.id"
                class="flex gap-4"
              >
                <UAvatar
                  :src="comment.avatar"
                  :alt="comment.name"
                  size="lg"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h4 class="font-semibold text-gray-900">
                      {{ comment.name }}
                    </h4>
                    <span class="text-sm text-gray-500">{{
                      comment.date
                    }}</span>
                  </div>
                  <p class="text-gray-700">
                    {{ comment.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

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
                Recent Posts
              </h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="recentPost in recentPosts"
                :key="recentPost.id"
                class="flex gap-3"
              >
                <NuxtImg
                  :src="recentPost.image"
                  :alt="recentPost.title"
                  class="w-20 h-20 object-cover rounded"
                  loading="lazy"
                  format="webp"
                  sizes="80px"
                />
                <div class="flex-1">
                  <NuxtLink
                    :to="`/blog/${recentPost.slug}`"
                    class="text-sm font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
                  >
                    {{ recentPost.title }}
                  </NuxtLink>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ recentPost.date }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </aside>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const searchQuery = ref('')

const post = {
  id: 1,
  title: '10 Benefits of Eating Organic Food',
  image: '/assets/images/Image.png',
  author: 'John Doe',
  date: '15 Jan 2025',
  commentCount: 12,
  tags: ['Organic', 'Healthy', 'Food'],
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  ],
  comments: [
    {
      id: 1,
      name: 'John Smith',
      avatar: '/assets/images/ImageCeo.png',
      date: '2 days ago',
      content: 'Great article! Very informative.',
    },
    {
      id: 2,
      name: 'Jane Doe',
      avatar: '/assets/images/ImageCeo.png',
      date: '5 days ago',
      content: 'Thanks for sharing these tips!',
    },
  ],
}

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: post.title },
]

const recentPosts = [
  {
    id: 1,
    title: 'How to Store Fresh Vegetables',
    image: '/assets/images/Image-2.png',
    date: '12 Jan 2025',
    slug: 'how-to-store-fresh-vegetables',
  },
  {
    id: 2,
    title: 'Seasonal Fruits Guide 2025',
    image: '/assets/images/green.png',
    date: '10 Jan 2025',
    slug: 'seasonal-fruits-guide-2025',
  },
]
</script>
