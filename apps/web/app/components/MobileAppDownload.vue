<template>
  <div class="bg-gray-900 rounded-2xl p-8 lg:p-12 text-white">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
      <div class="text-center lg:text-left">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">
          Download Mobile App and Get $5 Off
        </h2>
        <p class="text-lg text-gray-400 mb-6">
          Get the best deals and exclusive offers on our mobile app.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <UButton
            variant="solid"
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100"
            @click="handleDownload('appstore')"
          >
            <UIcon
              name="i-simple-icons-apple"
              class="w-6 h-6 mr-2"
            />
            App Store
          </UButton>
          <UButton
            variant="solid"
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100"
            @click="handleDownload('playstore')"
          >
            <UIcon
              name="i-simple-icons-googleplay"
              class="w-6 h-6 mr-2"
            />
            Google Play
          </UButton>
        </div>
      </div>
      <div class="shrink-0">
        <NuxtImg
          src="/assets/images/phone247.png"
          alt="Mobile App"
          class="w-48 h-96 object-contain"
          loading="lazy"
          format="webp"
          sizes="192px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleDownload = (store: 'appstore' | 'playstore') => {
  // Handle app download logic
  console.log('Download from:', store)
}
</script>
