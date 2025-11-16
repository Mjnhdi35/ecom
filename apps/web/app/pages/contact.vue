<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-16 mb-16">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Get In Touch
        </h1>
        <p class="text-lg text-gray-700">
          Have a question or need help? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-map-pin"
                class="w-8 h-8 text-primary-600"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Address
          </h3>
          <p class="text-gray-600">
            123 Main Street<br>
            City, State 12345<br>
            United States
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-phone"
                class="w-8 h-8 text-primary-600"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Phone
          </h3>
          <p class="text-gray-600">
            +1 234 567 890<br>
            +1 234 567 891
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-envelope"
                class="w-8 h-8 text-primary-600"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Email
          </h3>
          <p class="text-gray-600">
            info@freshshop.com<br>
            support@freshshop.com
          </p>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>
          <form
            class="space-y-6"
            @submit.prevent="handleSubmit"
          >
            <UFormGroup
              label="Your Name"
              name="name"
            >
              <UInput
                v-model="form.name"
                required
              />
            </UFormGroup>
            <UFormGroup
              label="Email"
              name="email"
            >
              <UInput
                v-model="form.email"
                type="email"
                required
              />
            </UFormGroup>
            <UFormGroup
              label="Subject"
              name="subject"
            >
              <UInput
                v-model="form.subject"
                required
              />
            </UFormGroup>
            <UFormGroup
              label="Message"
              name="message"
            >
              <UTextarea
                v-model="form.message"
                :rows="6"
                required
              />
            </UFormGroup>
            <UButton
              color="primary"
              size="lg"
              type="submit"
            >
              Send Message
            </UButton>
          </form>
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Find Us
          </h2>
          <div
            class="bg-gray-200 rounded-lg h-96 flex items-center justify-center"
          >
            <p class="text-gray-600">
              Map will be displayed here
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Contact Us' }]

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const handleSubmit = () => {
  console.log('Submit form:', form.value)
}
</script>
