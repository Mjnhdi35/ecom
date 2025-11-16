<template>
  <div>
    <AppHeader />
    <slot />
    <NewsletterSubscription />
    <AppFooter />

    <!-- Newsletter Popup -->
    <NewsletterPopup
      v-model="showNewsletterPopup"
      @subscribe="handleNewsletterSubscribe"
    />

    <!-- Cart Drawer -->
    <ShoppingCartSidebar
      v-model="isCartOpen"
      :items="cartItems"
      @checkout="handleCheckout"
      @go-to-cart="handleGoToCart"
      @remove-item="handleRemoveItem"
      @update-quantity="handleUpdateQuantity"
    />
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { cartItems, isCartOpen, removeFromCart, updateQuantity } = useCart()
const showNewsletterPopup = ref(false)

onMounted(() => {
  // Check if newsletter popup should be shown
  const dismissed = localStorage.getItem('newsletter-popup-dismissed')
  if (!dismissed) {
    setTimeout(() => {
      showNewsletterPopup.value = true
    }, 3000) // Show after 3 seconds
  }
})

const handleNewsletterSubscribe = (email: string) => {
  console.log('Newsletter subscription:', email)
  // Handle newsletter subscription logic
}

const handleCheckout = () => {
  navigateTo('/checkout')
}

const handleGoToCart = () => {
  navigateTo('/cart')
}

const handleRemoveItem = (id: number) => {
  removeFromCart(id)
}

const handleUpdateQuantity = (id: number, quantity: number) => {
  updateQuantity(id, quantity)
}
</script>
