<template>
  <div>
    <UContainer
      class="py-10 flex items-center justify-center min-h-[calc(100vh-20rem)]"
    >
      <UCard class="w-full max-w-md p-6">
        <template #header>
          <h1 class="text-3xl font-bold text-center text-gray-900">
            Create Account
          </h1>
        </template>
        <UForm
          :state="form"
          class="space-y-6"
          @submit="handleRegister"
        >
          <UFormGroup
            label="Full Name"
            name="fullName"
          >
            <UInput
              v-model="form.fullName"
              placeholder="Enter your full name"
            />
          </UFormGroup>
          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
            />
          </UFormGroup>
          <UFormGroup
            label="Password"
            name="password"
          >
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
            />
          </UFormGroup>
          <UFormGroup
            label="Confirm Password"
            name="confirmPassword"
          >
            <UInput
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
          </UFormGroup>
          <UCheckbox
            v-model="agreeToTerms"
            label="I agree to the terms and privacy policy"
          />
          <UButton
            type="submit"
            size="lg"
            block
          >
            Register
          </UButton>
        </UForm>
        <UDivider
          label="OR"
          class="my-8"
        />
        <div class="text-center text-gray-600">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-primary-600 hover:underline"
          >Login here</NuxtLink>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const agreeToTerms = ref(false)

const handleRegister = () => {
  console.log(
    'Registration attempt with:',
    form.value,
    'Agree to terms:',
    agreeToTerms.value,
  )
}
</script>
