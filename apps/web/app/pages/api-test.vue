<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
      API Proxy Test
    </h1>

    <div class="space-y-6">
      <!-- Health Check -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Health Check
          </h2>
        </template>
        <div class="space-y-4">
          <UButton @click="testHealth">
            Test Health Endpoint
          </UButton>
          <div v-if="healthResult">
            <pre
              class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded"
            >{{ JSON.stringify(healthResult, null, 2) }}</pre>
          </div>
        </div>
      </UCard>

      <!-- API Test -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            API Proxy Test
          </h2>
        </template>
        <div class="space-y-4">
          <div class="flex gap-2">
            <UInput
              v-model="apiPath"
              placeholder="API path (e.g., users)"
              class="flex-1"
            />
            <UButton @click="testApi">
              Test API
            </UButton>
          </div>
          <div v-if="apiResult">
            <pre
              class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded"
            >{{ JSON.stringify(apiResult, null, 2) }}</pre>
          </div>
          <div
            v-if="apiError"
            class="text-red-600"
          >
            Error: {{ apiError }}
          </div>
        </div>
      </UCard>

      <!-- Lazy API Test -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Lazy API Test
          </h2>
        </template>
        <div class="space-y-4">
          <div class="flex gap-2">
            <UInput
              v-model="lazyApiPath"
              placeholder="API path (e.g., users)"
              class="flex-1"
            />
            <UButton
              :loading="lazyPending"
              @click="() => executeLazy()"
            >
              Execute Lazy Fetch
            </UButton>
          </div>
          <div v-if="lazyData">
            <pre
              class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded"
            >{{ JSON.stringify(lazyData, null, 2) }}</pre>
          </div>
          <div
            v-if="lazyError"
            class="text-red-600"
          >
            Error: {{ lazyError.message }}
          </div>
        </div>
      </UCard>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="text-center"
      >
        <span class="text-gray-600">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HealthCheckResponse } from '~/types/api'

// Test page for API proxy
const healthResult = ref<HealthCheckResponse | { error?: string } | null>(null)
const apiResult = ref<unknown>(null)
const apiError = ref<string | null>(null)
const loading = ref(false)
const apiPath = ref('users')

// Lazy API test
const lazyApiPath = ref('users')
const {
  data: lazyData,
  error: lazyError,
  pending: lazyPending,
  execute: executeLazy,
} = useApiLazy(() => lazyApiPath.value)

// Test health endpoint
async function testHealth() {
  loading.value = true
  healthResult.value = null
  try {
    const response = await $fetch<HealthCheckResponse>('/health')
    healthResult.value = response
  }
  catch (error) {
    const apiError = error as { message?: string }
    healthResult.value = { error: apiError.message || 'Unknown error' }
  }
  finally {
    loading.value = false
  }
}

// Test API proxy
async function testApi() {
  loading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await useApi(apiPath.value)
    apiResult.value = response
  }
  catch (error) {
    const err = error as {
      message?: string
      statusCode?: number
    }
    apiError.value = err.message || 'API request failed'
    apiResult.value = {
      error: err.message || 'Unknown error',
      statusCode: err.statusCode,
    }
  }
  finally {
    loading.value = false
  }
}
</script>
