<template>
  <section class="py-16">
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Images -->
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <NuxtImg
              src="/assets/images/ImageCeo.png"
              alt="Organic food"
              class="w-full h-64 object-cover rounded-lg"
              loading="lazy"
              format="webp"
              sizes="sm:100vw md:50vw"
            />
          </div>
          <div class="relative mt-8">
            <NuxtImg
              src="/assets/images/ImageCeo.png"
              alt="Fresh produce"
              class="w-full h-64 object-cover rounded-lg"
              loading="lazy"
              format="webp"
              sizes="sm:100vw md:50vw"
            />
          </div>
        </div>

        <!-- Content -->
        <div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            100% Trusted Organic Food Store
          </h2>
          <ul class="space-y-4 mb-6">
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-primary-600 shrink-0 mt-1"
              />
              <span class="text-lg text-gray-700">
                Healthy & natural food for lovers of healthy food.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-primary-600 shrink-0 mt-1"
              />
              <span class="text-lg text-gray-700">
                Every day fresh and quality products for you.
              </span>
            </li>
          </ul>
          <p class="text-gray-600 mb-6">
            We are committed to providing you with the freshest, highest quality
            organic products. Our team works directly with local farmers to
            ensure that every item meets our strict quality standards.
          </p>
          <UButton
            color="primary"
            size="lg"
            @click="$emit('shopNow')"
          >
            Shop Now
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 ml-2"
            />
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  shopNow: []
}>()
</script>
