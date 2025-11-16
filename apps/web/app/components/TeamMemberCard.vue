<template>
  <UCard
    variant="outline"
    class="overflow-hidden hover:shadow-lg transition-all duration-300 group"
  >
    <div class="relative">
      <NuxtImg
        :src="image"
        :alt="name"
        class="w-full h-80 object-cover"
        loading="lazy"
        format="webp"
        sizes="sm:100vw md:50vw lg:25vw"
      />
      <div
        v-if="showSocial"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-primary-500 transition-colors"
        >
          <UIcon
            :name="social.icon"
            class="w-5 h-5 text-gray-700 hover:text-white"
          />
        </a>
      </div>
    </div>
    <div class="p-6 text-center">
      <h3 class="text-xl font-semibold text-gray-900 mb-1">
        {{ name }}
      </h3>
      <p class="text-gray-600">
        {{ role }}
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string
  icon: string
  url: string
}

interface Props {
  name: string
  role: string
  image: string
  showSocial?: boolean
  socialLinks?: SocialLink[]
}

withDefaults(defineProps<Props>(), {
  showSocial: true,
  socialLinks: () => [
    { name: 'Facebook', icon: 'i-simple-icons-facebook', url: '#' },
    { name: 'Twitter', icon: 'i-simple-icons-twitter', url: '#' },
    { name: 'Instagram', icon: 'i-simple-icons-instagram', url: '#' },
  ],
})
</script>
