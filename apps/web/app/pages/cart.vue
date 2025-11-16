<template>
  <div class="ecommerce-page">
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-8 mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        My Shopping Cart
      </h1>

      <div
        v-if="cartItems.length > 0"
        class="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div class="lg:col-span-2 space-y-6">
          <UCard
            v-for="item in cartItems"
            :key="item.id"
            variant="outline"
            class="p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-6">
              <NuxtImg
                :src="item.image"
                :alt="item.name"
                class="w-24 h-24 object-cover rounded"
                loading="lazy"
                format="webp"
                sizes="96px"
              />
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ item.name }}
                </h3>
                <p class="text-gray-600 mb-4">
                  ${{ item.price.toFixed(2) }}
                </p>
                <QuantitySelector
                  :model-value="item.quantity"
                  @update:model-value="(qty) => updateQuantity(item.id, qty)"
                />
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-primary-600 mb-4">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-trash"
                  color="error"
                  @click="removeFromCart(item.id)"
                />
              </div>
            </div>
          </UCard>

          <div class="flex gap-4">
            <UButton
              variant="outline"
              @click="navigateTo('/shop')"
            >
              Return to shop
            </UButton>
            <UButton
              variant="outline"
              @click="updateCart"
            >
              Update Cart
            </UButton>
          </div>

          <UCard variant="outline">
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Coupon Code
              </h3>
            </template>
            <div class="flex gap-4">
              <UInput
                v-model="couponCode"
                placeholder="Enter code"
                class="flex-1"
              />
              <UButton
                color="primary"
                @click="applyCoupon"
              >
                Apply Coupon
              </UButton>
            </div>
          </UCard>
        </div>

        <UCard
          variant="outline"
          class="sticky top-24"
        >
          <template #header>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Cart Total
            </h3>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Subtotal:</span>
              <span class="font-semibold text-gray-900 dark:text-white">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Shipping:</span>
              <span class="font-semibold text-primary-600 dark:text-primary-400">Free</span>
            </div>
            <UDivider />
            <div class="flex justify-between items-center pt-2">
              <span class="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
              <span
                class="text-xl font-bold text-primary-600 dark:text-primary-400"
              >${{ cartTotal.toFixed(2) }}</span>
            </div>
            <UButton
              color="primary"
              size="lg"
              block
              trailing-icon="i-heroicons-arrow-right"
              @click="navigateTo('/checkout')"
            >
              Proceed to Checkout
            </UButton>
          </div>
        </UCard>
      </div>

      <UCard
        v-else
        variant="outline"
        class="text-center py-20"
      >
        <UIcon
          name="i-heroicons-shopping-cart"
          class="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-6"
        />
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <UButton
          color="primary"
          size="lg"
          trailing-icon="i-heroicons-arrow-right"
          to="/shop"
        >
          Start Shopping
        </UButton>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

definePageMeta({
  layout: 'default',
})

const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()
const couponCode = ref('')

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Shopping Cart' }]

const updateCart = () => {
  console.log('Update cart')
}

const applyCoupon = () => {
  console.log('Apply coupon:', couponCode.value)
}
</script>
