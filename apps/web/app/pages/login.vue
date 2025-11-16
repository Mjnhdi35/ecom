<template>
  <div>
    <UContainer
      class="py-10 flex items-center justify-center min-h-[calc(100vh-20rem)]"
    >
      <UCard class="w-full max-w-md p-6">
        <template #header>
          <h1 class="text-3xl font-bold text-center text-gray-900">
            Login
          </h1>
        </template>
        <UForm
          :state="credentials"
          class="space-y-6"
          @submit="handleLogin"
        >
          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput
              v-model="credentials.email"
              type="email"
              placeholder="Enter your email"
            />
          </UFormGroup>
          <UFormGroup
            label="Password"
            name="password"
          >
            <UInput
              v-model="credentials.password"
              type="password"
              placeholder="Enter your password"
            />
          </UFormGroup>
          <div class="flex justify-between items-center text-sm">
            <UCheckbox
              v-model="rememberMe"
              label="Remember me"
            />
            <NuxtLink
              to="/forgot-password"
              class="text-primary-600 hover:underline"
            >
              Forgot Password?
            </NuxtLink>
          </div>
          <UButton
            type="submit"
            size="lg"
            block
          >
            Login
          </UButton>
        </UForm>
        <UDivider
          label="OR"
          class="my-8"
        />
        <div class="text-center text-gray-600">
          Don't have an account?
          <NuxtLink
            to="/register"
            class="text-primary-600 hover:underline"
          >
            Register here
          </NuxtLink>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const credentials = ref({
  email: '',
  password: '',
})

const rememberMe = ref(false)

const handleLogin = () => {
  console.log(
    'Login attempt with:',
    credentials.value,
    'Remember me:',
    rememberMe.value,
  )
}
</script>
