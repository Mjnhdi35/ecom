<template>
  <div class="flex gap-4">
    <!-- Thumbnails -->
    <div class="flex flex-col gap-2">
      <button
        class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded hover:border-primary-500 transition-colors"
        @click="scrollThumbnails('up')"
      >
        <UIcon
          name="i-heroicons-chevron-up"
          class="w-5 h-5 text-gray-600"
        />
      </button>
      <div class="flex flex-col gap-2 max-h-96 overflow-y-auto">
        <button
          v-for="(image, index) in images"
          :key="index"
          class="w-20 h-20 border-2 rounded overflow-hidden transition-all"
          :class="
            selectedIndex === index
              ? 'border-primary-500'
              : 'border-gray-200 hover:border-gray-300'
          "
          @click="selectImage(index)"
        >
          <NuxtImg
            :src="image"
            :alt="`Thumbnail ${index + 1}`"
            class="gallery-thumbnail w-full h-full"
            loading="lazy"
            format="webp"
            sizes="80px"
          />
        </button>
      </div>
      <button
        class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded hover:border-primary-500 transition-colors"
        @click="scrollThumbnails('down')"
      >
        <UIcon
          name="i-heroicons-chevron-down"
          class="w-5 h-5 text-gray-600"
        />
      </button>
    </div>

    <!-- Main Image -->
    <div class="flex-1">
      <div
        class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
      >
        <NuxtImg
          :src="images[selectedIndex]"
          :alt="productName"
          class="product-image w-full h-full"
          loading="eager"
          format="webp"
          sizes="sm:100vw md:50vw lg:40vw"
          placeholder
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
  productName?: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  productName: 'Product',
  alt: '',
})

const selectedIndex = ref(0)

const selectImage = (index: number) => {
  selectedIndex.value = index
}

const scrollThumbnails = (_direction: 'up' | 'down') => {
  // Scroll logic can be implemented if needed
}
</script>
