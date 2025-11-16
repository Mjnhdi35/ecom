<template>
  <div class="ecommerce-page">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Account Settings
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Manage your account information and preferences
      </p>
    </div>

    <UCard variant="outline">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Personal Information
        </h2>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup
          label="First Name"
          name="firstName"
        >
          <UInput v-model="form.firstName" />
        </UFormGroup>
        <UFormGroup
          label="Last Name"
          name="lastName"
        >
          <UInput v-model="form.lastName" />
        </UFormGroup>
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput
            v-model="form.email"
            type="email"
          />
        </UFormGroup>
        <UFormGroup
          label="Phone"
          name="phone"
        >
          <UInput v-model="form.phone" />
        </UFormGroup>
      </div>
    </UCard>

    <UCard
      variant="outline"
      class="mt-6"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Change Password
        </h2>
      </template>
      <div class="space-y-4">
        <UFormGroup
          label="Current Password"
          name="currentPassword"
        >
          <UInput
            v-model="passwordForm.currentPassword"
            type="password"
          />
        </UFormGroup>
        <UFormGroup
          label="New Password"
          name="newPassword"
        >
          <UInput
            v-model="passwordForm.newPassword"
            type="password"
          />
        </UFormGroup>
        <UFormGroup
          label="Confirm New Password"
          name="confirmPassword"
        >
          <UInput
            v-model="passwordForm.confirmPassword"
            type="password"
          />
        </UFormGroup>
      </div>
    </UCard>

    <div class="flex gap-4 mt-6">
      <UButton
        color="primary"
        size="lg"
        trailing-icon="i-heroicons-check"
        @click="handleSave"
      >
        Save Changes
      </UButton>
      <UButton
        variant="outline"
        size="lg"
        @click="handleCancel"
      >
        Cancel
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'account',
})

const form = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const handleSave = () => {
  console.log('Save settings:', form.value, passwordForm.value)
}

const handleCancel = () => {
  // Reset form
}
</script>
