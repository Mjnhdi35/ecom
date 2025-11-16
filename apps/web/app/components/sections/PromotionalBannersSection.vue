<template>
  <section class="py-16">
    <UContainer>
      <div :class="gridClass">
        <PromotionalBanner
          v-for="banner in banners"
          :key="banner.title"
          :title="banner.title"
          :description="banner.description"
          :price="banner.price"
          :badge="banner.badge"
          :badge-color="banner.badgeColor"
          :bg-class="banner.bgClass"
          :background-image="banner.backgroundImage"
          :show-countdown="banner.showCountdown"
          :countdown-date="banner.countdownDate"
          @shop-now="handleShopNow"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Banner {
  title: string
  description?: string
  price?: number
  badge?: string
  badgeColor?: 'primary' | 'error' | 'warning' | 'success' | 'white' | 'red'
  bgClass: string
  backgroundImage?: string
  showCountdown?: boolean
  countdownDate?: string
}

interface Props {
  banners: Banner[]
  gridClass?: string
}

withDefaults(defineProps<Props>(), {
  gridClass: 'grid grid-cols-1 md:grid-cols-3 gap-6',
})

const handleShopNow = () => navigateTo('/shop')
</script>
