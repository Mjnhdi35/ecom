<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const router = useRouter()

// Custom error messages based on status code
const errorConfig = computed(() => {
  const statusCode = props.error.statusCode || 500
  const statusMessage = props.error.statusMessage || 'Something went wrong'

  const configs: Record<
    number,
    {
      title: string
      description: string
      icon: string
      color: 'primary' | 'error' | 'warning' | 'info'
    }
  > = {
    404: {
      title: 'Page Not Found',
      description:
        'The page you are looking for does not exist or has been moved.',
      icon: 'line-md:alert-loop',
      color: 'warning',
    },
    403: {
      title: 'Access Forbidden',
      description: 'You do not have permission to access this resource.',
      icon: 'i-lucide-lock',
      color: 'error',
    },
    500: {
      title: 'Server Error',
      description:
        'An unexpected error occurred on the server. Please try again later.',
      icon: 'i-lucide-server-off',
      color: 'error',
    },
    503: {
      title: 'Service Unavailable',
      description:
        'The service is temporarily unavailable. Please try again later.',
      icon: 'i-lucide-wrench',
      color: 'warning',
    },
  }

  return (
    configs[statusCode] || {
      title: statusMessage,
      description:
        props.error.message
        || 'An error occurred while processing your request.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    }
  )
})

// Handle error clear
function handleClear() {
  router.push('/')
}

// Handle retry (for client-side errors)
function handleRetry() {
  router.go(0)
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <UError
        :error="error"
        :redirect="'/'"
        :clear="{
          color: 'primary',
          size: 'lg',
          variant: 'solid',
          label: 'Back to Home',
          icon: 'i-lucide-home',
        }"
        :ui="{
          root: 'flex-1 flex flex-col items-center justify-center text-center px-4 py-16',
          statusCode: 'text-6xl sm:text-8xl font-bold text-muted',
          statusMessage:
            'mt-4 text-2xl sm:text-3xl font-semibold text-highlighted',
          message: 'mt-4 text-base sm:text-lg text-muted max-w-md',
          links:
            'mt-8 flex flex-col sm:flex-row items-center justify-center gap-4',
        }"
      >
        <!-- Custom status code display -->
        <template #statusCode>
          <div class="flex flex-col items-center justify-center gap-6">
            <!-- Error Image -->
            <NuxtImg
              src="/assets/images/404-error.png"
              alt="Error"
              class="w-64 sm:w-80 lg:w-96 h-auto object-contain"
              preset="error"
              loading="eager"
              format="png"
              quality="85"
            />
            <!-- Status Code -->
            <!-- <span class="text-6xl sm:text-8xl font-bold text-muted">
              {{ error.statusCode || '500' }}
            </span> -->
          </div>
        </template>

        <!-- Custom status message -->
        <template #statusMessage>
          <h1 class="text-2xl sm:text-3xl font-semibold text-highlighted">
            {{ errorConfig.title }}
          </h1>
        </template>

        <!-- Custom message -->
        <template #message>
          <p class="text-base sm:text-lg text-muted max-w-md mx-auto">
            {{ errorConfig.description }}
          </p>
          <p
            v-if="error.message && error.message !== errorConfig.description"
            class="mt-2 text-sm text-muted/75"
          >
            {{ error.message }}
          </p>
        </template>

        <!-- Custom links/actions -->
        <template #links>
          <UButton
            color="primary"
            size="lg"
            variant="solid"
            icon="i-lucide-home"
            @click="handleClear"
          >
            Back to Home
          </UButton>

          <UButton
            v-if="error.statusCode === 500 || error.statusCode === 503"
            color="neutral"
            size="lg"
            variant="outline"
            icon="i-lucide-refresh-cw"
            @click="handleRetry"
          >
            Try Again
          </UButton>

          <UButton
            color="neutral"
            size="lg"
            variant="ghost"
            icon="i-lucide-arrow-left"
            @click="router.back()"
          >
            Go Back
          </UButton>
        </template>
      </UError>
    </div>
  </UApp>
</template>
