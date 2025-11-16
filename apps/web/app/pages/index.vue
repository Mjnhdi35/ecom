<template>
  <div class="space-y-12">
    <HeroBanner @shop-now="handleShopNow" />

    <FeaturesSection />

    <UPageSection>
      <UContainer>
        <CategoriesSection
          title="Popular Agriculture Categories"
          :categories="categories"
        />
      </UContainer>
    </UPageSection>

    <UPageSection class="bg-gray-50 dark:bg-gray-900/50">
      <UContainer>
        <ProductsSection
          title="Popular Agriculture Products"
          :products="popularProducts"
          view-all-link="/shop"
          @quick-view="handleQuickView"
        />
      </UContainer>
    </UPageSection>

    <UPageSection>
      <UContainer>
        <PromotionalBannersSection :banners="promotionalBanners" />
      </UContainer>
    </UPageSection>

    <UPageSection>
      <UContainer>
        <ProductsSection
          title="Hot Deals - Agriculture Specials"
          :products="hotDeals"
          view-all-link="/shop?filter=hot-deals"
          @quick-view="handleQuickView"
        />
      </UContainer>
    </UPageSection>

    <!-- Large Promotional Banner -->
    <UPageSection>
      <UContainer>
        <UCard
          class="bg-linear-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden shadow-xl border-0"
        >
          <div class="p-12 lg:p-16">
            <div class="relative z-10 max-w-2xl">
              <h2 class="text-4xl lg:text-5xl font-bold mb-4 text-white">
                SUMMER SALE 37% OFF
              </h2>
              <p class="text-lg mb-6 text-white/90">
                Get the best deals on fresh organic agriculture products.
                Limited time offer!
              </p>
              <UButton
                variant="solid"
                size="lg"
                class="bg-white text-gray-900 hover:bg-gray-100"
                @click="handleShopNow"
              >
                Shop Now
              </UButton>
            </div>
            <div
              class="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none"
            >
              <NuxtImg
                src="/assets/images/Bannar Big.png"
                alt="Fresh agriculture products"
                class="w-full h-full object-cover"
                loading="lazy"
                format="webp"
                sizes="sm:100vw md:50vw"
              />
            </div>
          </div>
        </UCard>
      </UContainer>
    </UPageSection>

    <UPageSection class="bg-gray-50 dark:bg-gray-900/50">
      <UContainer>
        <ProductsSection
          title="Featured Agriculture Products"
          :products="featuredProducts"
          view-all-link="/shop?filter=featured"
          @quick-view="handleQuickView"
        />
      </UContainer>
    </UPageSection>

    <UPageSection>
      <UContainer>
        <NewsSection
          title="Latest Agriculture News & Tips"
          :news-items="latestNews"
        />
      </UContainer>
    </UPageSection>

    <UPageSection class="bg-gray-50 dark:bg-gray-900/50">
      <UContainer>
        <TestimonialsSection
          title="Customer Testimonials"
          :testimonials="testimonials"
        />
      </UContainer>
    </UPageSection>

    <UPageSection>
      <UContainer>
        <InstagramSection />
      </UContainer>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import { useMockData } from '~/composables/useMockData'

definePageMeta({
  layout: 'default',
})

const {
  categories,
  promotionalBanners,
  latestNews,
  testimonials,
  getPopularProducts,
  getHotDeals,
  getFeaturedProducts,
} = useMockData()

const popularProducts = getPopularProducts()
const hotDeals = getHotDeals()
const featuredProducts = getFeaturedProducts()

const handleShopNow = () => {
  navigateTo('/shop')
}
const handleQuickView = (product: {
  id: number
  name: string
  image: string
  price: number
}) => {
  console.log('Quick view:', product)
}
</script>
