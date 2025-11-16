<template>
  <section class="py-12 bg-gray-50">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <FeatureCard
          v-for="feature in features"
          :key="feature.icon"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          icon-bg-class="bg-primary-100"
          icon-color-class="text-primary-600"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface Props {
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: 'i-heroicons-truck',
    title: 'Free Shipping',
    description: 'Free shipping on all your order',
  },
  {
    icon: 'i-heroicons-headphones',
    title: 'Customer Support 24/7',
    description: 'Dedicated 24/7 customer support',
  },
  {
    icon: 'i-heroicons-shield-check',
    title: '100% Secure Payment',
    description: 'We ensure your money is safe',
  },
  {
    icon: 'i-heroicons-archive-box-arrow-down',
    title: 'Money-Back Guarantee',
    description: '30 days money-back guarantee',
  },
]

withDefaults(defineProps<Props>(), {
  features: () => defaultFeatures,
})
</script>
