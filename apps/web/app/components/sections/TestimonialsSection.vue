<template>
  <section :class="['py-16', bgClass]">
    <UContainer>
      <SectionHeader :title="title" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :content="testimonial.content"
          :name="testimonial.name"
          :role="testimonial.role"
          :avatar="testimonial.avatar"
          :rating="testimonial.rating"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  id: number
  content: string
  name: string
  role: string
  avatar: string
  rating: number
}

interface Props {
  title: string
  testimonials: Testimonial[]
  bgClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: '',
})
</script>
