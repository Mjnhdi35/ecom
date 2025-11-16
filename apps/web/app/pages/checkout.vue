<template>
  <div class="ecommerce-page">
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-8 mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Checkout
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <UCard
          variant="outline"
          class="lg:col-span-2"
        >
          <template #header>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Billing Information
            </h2>
          </template>
          <UForm
            :state="form"
            class="space-y-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <UFormGroup
              label="Company Name (Optional)"
              name="companyName"
            >
              <UInput v-model="form.companyName" />
            </UFormGroup>
            <UFormGroup
              label="Country"
              name="country"
            >
              <USelect
                v-model="form.country"
                :options="countries"
              />
            </UFormGroup>
            <UFormGroup
              label="Street Address"
              name="streetAddress"
            >
              <UInput v-model="form.streetAddress" />
            </UFormGroup>
            <UFormGroup
              label="Town / City"
              name="city"
            >
              <UInput v-model="form.city" />
            </UFormGroup>
            <UFormGroup
              label="State / County"
              name="state"
            >
              <UInput v-model="form.state" />
            </UFormGroup>
            <UFormGroup
              label="Postcode / ZIP"
              name="zip"
            >
              <UInput v-model="form.zip" />
            </UFormGroup>
            <UFormGroup
              label="Phone"
              name="phone"
            >
              <UInput v-model="form.phone" />
            </UFormGroup>
            <UFormGroup
              label="Email Address"
              name="email"
            >
              <UInput
                v-model="form.email"
                type="email"
              />
            </UFormGroup>
            <UCheckbox
              v-model="createAccount"
              label="Create an account?"
            />
            <UCheckbox
              v-model="shipToDifferentAddress"
              label="Ship to a different address?"
            />
          </UForm>
        </UCard>

        <!-- Payment Method Card -->
        <UCard
          variant="outline"
          class="lg:col-span-2 mt-8"
        >
          <template #header>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Payment Method
            </h2>
          </template>
          <URadioGroup
            v-model="paymentMethod"
            :options="paymentOptions"
            class="space-y-4 mb-6"
          />
          <UButton
            color="primary"
            size="lg"
            block
            trailing-icon="i-heroicons-arrow-right"
            @click="placeOrder"
          >
            Place Order
          </UButton>
        </UCard>

        <UCard
          variant="outline"
          class="sticky top-24"
        >
          <template #header>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Your Order
            </h2>
          </template>
          <div class="space-y-4">
            <div
              class="flex justify-between font-semibold text-lg text-gray-900 dark:text-white"
            >
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            <UDivider />
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex justify-between text-gray-700 dark:text-gray-300"
            >
              <span>{{ item.name }} x {{ item.quantity }}</span>
              <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <UDivider />
            <div class="flex justify-between items-center pt-2">
              <span class="font-bold text-xl text-gray-900 dark:text-white">Total:</span>
              <span
                class="font-bold text-2xl text-primary-600 dark:text-primary-400"
              >${{ cartTotal.toFixed(2) }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'default',
})

const { cartItems, cartTotal } = useCart()

const breadcrumbs = [
  { label: 'Home', path: '/' },
  { label: 'Shopping Cart', path: '/cart' },
  { label: 'Checkout' },
]

const form = ref({
  firstName: '',
  lastName: '',
  companyName: '',
  country: 'USA',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: '',
})

const createAccount = ref(false)
const shipToDifferentAddress = ref(false)
const countries = ['USA', 'Canada', 'UK', 'Australia']
const paymentMethod = ref('creditCard')
const paymentOptions = [
  { label: 'Credit Card', value: 'creditCard' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank Transfer', value: 'bankTransfer' },
]

const placeOrder = () => {
  console.log('Placing order with:', form.value, paymentMethod.value)
}
</script>
