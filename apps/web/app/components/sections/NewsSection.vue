<template>
  <section :class="['py-16', bgClass]">
    <UContainer>
      <SectionHeader :title="title" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NewsCard
          v-for="news in newsItems"
          :key="news.id"
          :image="news.image"
          :title="news.title"
          :excerpt="news.excerpt"
          :author="news.author"
          :date="news.date"
          :comment-count="news.commentCount"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface NewsItem {
  id: number
  image: string
  title: string
  excerpt: string
  author: string
  date: string
  commentCount?: number
}

interface Props {
  title: string
  newsItems: NewsItem[]
  bgClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: '',
})
</script>
