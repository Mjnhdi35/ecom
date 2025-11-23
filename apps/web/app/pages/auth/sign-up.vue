<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import type { RegisterRequest } from '~/types/auth'
import { useRegisterMutation } from '~/stores/auth.colada'

defineOptions({
  name: 'SignUpPage',
})

// Page meta
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
  ssr: false,
})

// Router
const router = useRouter()

// Password visibility
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Terms acceptance
const acceptTerms = ref(false)

// Pinia Colada mutation
const registerMutation = useRegisterMutation()

// Form state with confirmPassword
// Order matches RegisterRequest: displayName, email, password
const formState = reactive<RegisterRequest & { confirmPassword?: string }>({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Form validation
function validate(
  state: Partial<RegisterRequest & { confirmPassword?: string }>,
): FormError[] {
  const errors: FormError[] = []

  if (!state.displayName) {
    errors.push({ name: 'displayName', message: 'Display name is required' })
  }
  else if (state.displayName.length < 2) {
    errors.push({
      name: 'displayName',
      message: 'Display name must be at least 2 characters',
    })
  }

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

  if (!state.confirmPassword) {
    errors.push({
      name: 'confirmPassword',
      message: 'Please confirm your password',
    })
  }
  else if (state.password !== state.confirmPassword) {
    errors.push({
      name: 'confirmPassword',
      message: 'Passwords do not match',
    })
  }

  return errors
}

// Use form composable
const { loading, handleSubmit } = useForm<
  RegisterRequest & { confirmPassword?: string }
>({
  initialState: formState,
  validate,
  onSubmit: async (data) => {
    if (!acceptTerms.value) {
      throw new Error('Please accept the terms and conditions to continue.')
    }

    // Remove confirmPassword before submitting
    const { confirmPassword, ...registerData } = data
    await registerMutation.mutateAsync(registerData)
    await router.push('/')
  },
  successMessage: {
    title: 'Success',
    description: 'Your account has been created successfully.',
  },
  errorMessage: (error) => {
    if (error instanceof Error && error.message.includes('terms')) {
      return error.message
    }
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
      || 'Failed to create account'
    )
  },
  onError: (error) => {
    if (error instanceof Error && error.message.includes('terms')) {
      useToast().add({
        title: 'Terms Required',
        description: error.message,
        color: 'warning',
      })
    }
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
        Create Account
      </h1>
      <p class="text-base text-gray-600 dark:text-gray-400">
        Sign up to get started with Agriculture
      </p>
    </div>

    <!-- Sign Up Form -->
    <UCard class="shadow-lg border border-gray-200 dark:border-gray-800">
      <UForm
        :state="formState"
        :validate="validate"
        class="space-y-5"
        @submit="handleSubmit"
      >
        <!-- Display Name Field -->
        <UFormField
          label="Display Name"
          name="displayName"
          required
        >
          <UInput
            v-model="formState.displayName"
            type="text"
            placeholder="Enter your display name"
            size="lg"
            icon="i-lucide-user"
            autocomplete="name"
            :disabled="loading"
            class="w-full"
          />
        </UFormField>

        <!-- Email Field -->
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="formState.email"
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
            v-model="formState.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            size="lg"
            icon="i-lucide-lock"
            autocomplete="new-password"
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

        <!-- Confirm Password Field -->
        <UFormField
          label="Confirm Password"
          name="confirmPassword"
          required
        >
          <UInput
            v-model="formState.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm your password"
            size="lg"
            icon="i-lucide-lock"
            autocomplete="new-password"
            :disabled="loading"
            class="w-full"
            :ui="{ trailing: 'pr-2' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="
                  showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  showConfirmPassword ? 'Hide password' : 'Show password'
                "
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                @click.prevent="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <!-- Terms and Conditions -->
        <div class="flex items-start">
          <UCheckbox
            v-model="acceptTerms"
            name="acceptTerms"
            class="mt-1"
            :disabled="loading"
          />
          <label
            for="acceptTerms"
            class="body-small text-gray-600 dark:text-gray-400 ml-2"
          >
            I agree to the
            <NuxtLink
              to="/terms"
              class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Terms and Conditions
            </NuxtLink>
            and
            <NuxtLink
              to="/privacy"
              class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </NuxtLink>
          </label>
        </div>

        <!-- Submit Button -->
        <UButton
          type="submit"
          color="primary"
          size="lg"
          variant="solid"
          block
          :loading="loading"
          :disabled="!acceptTerms"
          class="mt-6"
        >
          Create Account
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

    <!-- Sign In Link -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <NuxtLink
          to="/auth/sign-in"
          class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors ml-1"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
