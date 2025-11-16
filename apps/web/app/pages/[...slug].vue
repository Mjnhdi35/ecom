<template>
  <div>
    <div class="min-h-[60vh] flex items-center justify-center py-16">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">
          <div class="text-9xl font-bold text-primary-600 mb-4">
            404
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div class="flex gap-4 justify-center">
            <UButton
              color="primary"
              size="lg"
              @click="navigateTo('/')"
            >
              Go to Homepage
            </UButton>
            <UButton
              variant="outline"
              size="lg"
              @click="$router.back()"
            >
              Go Back
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
