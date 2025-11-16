<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />

    <section class="py-16 bg-gray-50">
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p class="text-lg text-gray-700 leading-relaxed">
            We are committed to providing you with the freshest, highest quality
            organic products. Our team works directly with local farmers to
            ensure that every item meets our strict quality standards.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-16">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p
              v-for="(para, index) in story"
              :key="index"
              class="text-gray-700 mb-4 leading-relaxed"
            >
              {{ para }}
            </p>
          </div>
          <div>
            <NuxtImg
              src="/assets/images/ImageCeo.png"
              alt="Our Story"
              class="w-full rounded-lg"
              loading="lazy"
              format="webp"
              sizes="sm:100vw md:50vw"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <StatisticsSection />

    <section class="py-16 bg-gray-50">
      <UContainer>
        <SectionHeader title="Our Professional Members" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMemberCard
            v-for="member in teamMembers"
            :key="member.id"
            :name="member.name"
            :role="member.role"
            :image="member.image"
          />
        </div>
      </UContainer>
    </section>

    <WhyChooseUs />

    <TestimonialsSection
      title="What Our Customer Says"
      :testimonials="testimonials"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'About Us' }]

const story = [
  'Fresh Shop was founded with a simple mission: to make organic, healthy food accessible to everyone. We started as a small family business in 1985, and over the years, we\'ve grown into a trusted name in organic food retail.',
  'Our commitment to quality and sustainability has never wavered. We work directly with local farmers and suppliers who share our values, ensuring that every product we sell meets the highest standards.',
  'Today, we serve thousands of customers who trust us to provide them with the freshest, most nutritious organic products available.',
]

const teamMembers = [
  {
    id: 1,
    name: 'Jenny Wilson',
    role: 'CEO & Founder',
    image: '/assets/images/ImageCeo.png',
  },
  {
    id: 2,
    name: 'Jane Cooper',
    role: 'Worker',
    image: '/assets/images/ImageCeo.png',
  },
  {
    id: 3,
    name: 'Cody Fisher',
    role: 'Security Guard',
    image: '/assets/images/ImageCeo.png',
  },
  {
    id: 4,
    name: 'Robert Fox',
    role: 'Senior Farmer Manager',
    image: '/assets/images/ImageCeo.png',
  },
]

const testimonials = [
  {
    id: 1,
    content:
      'Fresh Shop has the best quality organic products. I\'ve been shopping here for months and I\'m always satisfied.',
    name: 'Robert Fox',
    role: 'Customer',
    avatar: '/assets/images/ImageCeo.png',
    rating: 5,
  },
  {
    id: 2,
    content:
      'The delivery is fast and the products are always fresh. Highly recommend Fresh Shop for all your organic food needs.',
    name: 'Dianne Russell',
    role: 'Customer',
    avatar: '/assets/images/ImageCeo.png',
    rating: 5,
  },
  {
    id: 3,
    content:
      'Amazing customer service and great prices. The organic vegetables are always crisp and fresh. Love shopping here!',
    name: 'Eleanor Pena',
    role: 'Customer',
    avatar: '/assets/images/ImageCeo.png',
    rating: 5,
  },
]
</script>
