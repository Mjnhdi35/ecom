<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import type { LoginRequest } from '~/types/auth'
import { useLoginMutation } from '~/stores/auth.colada'

defineOptions({
  name: 'SignInPage',
})

// Page meta
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
  ssr: false,
})

// Router
const router = useRouter()
const route = useRoute()

// Password visibility
const showPassword = ref(false)

// Remember me
const rememberMe = ref(false)

// Pinia Colada mutation
const loginMutation = useLoginMutation()

// Form validation
function validate(state: Partial<LoginRequest>): FormError[] {
  const errors: FormError[] = []

  if (!state.email) {
    errors.push({ name: 'email', message: 'Email is required' })
  }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({
      name: 'email',
      message: 'Please enter a valid email address',
    })
  }

  if (!state.password) {
    errors.push({ name: 'password', message: 'Password is required' })
  }
  else if (state.password.length < 6) {
    errors.push({
      name: 'password',
      message: 'Password must be at least 6 characters',
    })
  }

  return errors
}

// Use form composable
const { state, loading, handleSubmit } = useForm<LoginRequest>({
  initialState: {
    email: '',
    password: '',
  },
  validate,
  onSubmit: async (data) => {
    await loginMutation.mutateAsync(data)
    // Redirect to intended page or home
    const redirect = (route.query.redirect as string) || '/'
    await router.push(redirect)
  },
  successMessage: {
    title: 'Success',
    description: 'You have been signed in successfully.',
  },
  errorMessage: (error) => {
    const apiError = error as {
      data?: { message?: string, error?: string }
      message?: string
      statusMessage?: string
    }
    return (
      apiError.data?.message
      || apiError.data?.error
      || apiError.message
      || apiError.statusMessage
      || 'Invalid email or password'
    )
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Logo and Title -->
    <div class="text-center mb-8">
      <Logo
        size="lg"
        class="mx-auto mb-6"
      />
      <h1
        class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight"
      >
        Welcome Back
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400">
        Sign in to your account to continue
      </p>
    </div>

    <!-- Sign In Form -->
    <UCard class="shadow-lg border border-gray-200 dark:border-gray-800">
      <UForm
        :state="state"
        :validate="validate"
        class="space-y-5"
        @submit="handleSubmit"
      >
        <!-- Email Field -->
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Enter your email"
            size="lg"
            icon="i-lucide-mail"
            autocomplete="email"
            :disabled="loading"
            class="w-full"
          />
        </UFormField>

        <!-- Password Field -->
        <UFormField
          label="Password"
          name="password"
          required
        >
          <UInput
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            size="lg"
            icon="i-lucide-lock"
            autocomplete="current-password"
            :disabled="loading"
            class="w-full"
            :ui="{ trailing: 'pr-2' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                @click.prevent="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <UCheckbox
            v-model="rememberMe"
            label="Remember me"
            name="rememberMe"
          />
          <NuxtLink
            to="/auth/forgot-password"
            class="body-small text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <!-- Submit Button -->
        <UButton
          type="submit"
          color="primary"
          size="lg"
          variant="solid"
          block
          :loading="loading"
          class="mt-6"
        >
          Sign In
        </UButton>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
            >
              Or continue with
            </span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="flex justify-center">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-simple-icons-google"
            :disabled="loading"
            class="rounded-full w-14 h-14 p-0 min-w-0 aspect-square flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:m-0"
            :aria-label="'Sign in with Google'"
          />
        </div>
      </UForm>
    </UCard>

    <!-- Sign Up Link -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?
        <NuxtLink
          to="/auth/sign-up"
          class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors ml-1"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
