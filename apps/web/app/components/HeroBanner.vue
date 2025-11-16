<template>
  <UContainer class="py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Banner -->
      <div
        class="lg:col-span-2 bg-primary-500 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
      >
        <div class="relative z-10 max-w-lg">
          <UBadge
            variant="solid"
            class="mb-4 bg-white text-primary-600"
          >
            Sale up to <span class="font-bold">30% OFF</span>
          </UBadge>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Fresh & Healthy Organic Food
          </h1>
          <p class="text-lg mb-6 text-white/90">
            Free shipping on all your order
          </p>
          <UButton
            variant="solid"
            size="lg"
            class="bg-white text-primary-600 hover:bg-gray-100"
            @click="$emit('shopNow')"
          >
            Shop Now
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 ml-2"
            />
          </UButton>
        </div>
        <div class="absolute right-0 bottom-0 w-1/2 h-full opacity-20">
          <NuxtImg
            src="/assets/images/Bannar Big.png"
            alt="Fresh vegetables"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
            sizes="sm:100vw md:50vw"
          />
        </div>
      </div>

      <!-- Side Banners -->
      <div class="flex flex-col gap-6">
        <!-- Banner 1 -->
        <div
          class="flex-1 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <UBadge
            variant="solid"
            class="mb-3 bg-white text-blue-600"
          >
            SUMMER SALE
          </UBadge>
          <h2 class="text-2xl font-bold mb-2">
            Best Deal
          </h2>
          <p class="text-sm mb-4 text-white/90">
            Fresh vegetables
          </p>
          <UButton
            variant="solid"
            size="sm"
            class="bg-white text-blue-600 hover:bg-gray-100"
            @click="$emit('shopNow')"
          >
            Shop Now
          </UButton>
          <div class="absolute right-0 bottom-0 w-24 h-24 opacity-30">
            <NuxtImg
              src="/assets/images/Bannar1.png"
              alt="Vegetables"
              class="w-full h-full object-cover"
              loading="lazy"
              format="webp"
              sizes="96px"
            />
          </div>
        </div>

        <!-- Banner 2 -->
        <div
          class="flex-1 bg-linear-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <UBadge
            variant="solid"
            class="mb-3 bg-white text-orange-600"
          >
            BEST DEAL
          </UBadge>
          <h2 class="text-2xl font-bold mb-2">
            Fresh Fruits
          </h2>
          <p class="text-sm mb-4 text-white/90">
            Natural & Organic
          </p>
          <UButton
            variant="solid"
            size="sm"
            class="bg-white text-orange-600 hover:bg-gray-100"
            @click="$emit('shopNow')"
          >
            Shop Now
          </UButton>
          <div class="absolute right-0 bottom-0 w-24 h-24 opacity-30">
            <NuxtImg
              src="/assets/images/Bannar2.png"
              alt="Fruits"
              class="w-full h-full object-cover"
              loading="lazy"
              format="webp"
              sizes="96px"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
defineEmits<{
  shopNow: []
}>()
</script>
