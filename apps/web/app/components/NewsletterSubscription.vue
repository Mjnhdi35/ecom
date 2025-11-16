<template>
  <div class="bg-primary-500 rounded-2xl p-8 lg:p-12 text-white text-center">
    <h2 class="text-3xl lg:text-4xl font-bold mb-4">
      Subscribe our Newsletter
    </h2>
    <p class="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
      Get all the latest information on Events, Sales and Offers. Sign up for
      newsletter today.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
      <UInput
        v-model="email"
        placeholder="Your email address"
        size="lg"
        class="flex-1"
        type="email"
      />
      <UButton
        variant="solid"
        size="lg"
        class="bg-white text-primary-600 hover:bg-gray-100"
        @click="handleSubscribe"
      >
        Subscribe
      </UButton>
    </div>
    <div class="flex items-center justify-center gap-4">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
      >
        <UIcon
          :name="social.icon"
          class="w-5 h-5"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')

const socialLinks = [
  { name: 'Facebook', icon: 'i-simple-icons-facebook', url: '#' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: '#' },
  { name: 'Pinterest', icon: 'i-simple-icons-pinterest', url: '#' },
  { name: 'Instagram', icon: 'i-simple-icons-instagram', url: '#' },
]

const handleSubscribe = () => {
  if (email.value.trim()) {
    // Handle subscription logic
    console.log('Subscribing:', email.value)
    email.value = ''
  }
}
</script>
