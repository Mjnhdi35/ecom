<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="bg-gray-50 border-b border-gray-200">
      <UContainer class="py-2">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 text-gray-600">
              <UIcon
                name="i-heroicons-map-pin"
                class="w-4 h-4"
              />
              <span>123 Main St, City, State 12345</span>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <NuxtLink
              to="/wishlist"
              class="flex items-center gap-2 text-gray-600 hover:text-primary-600"
            >
              <UIcon
                name="i-heroicons-heart"
                class="w-4 h-4"
              />
              <span>Wishlist</span>
            </NuxtLink>
            <button
              class="flex items-center gap-2 text-gray-600 hover:text-primary-600 relative"
              @click="openCart"
            >
              <UIcon
                name="i-heroicons-shopping-cart"
                class="w-4 h-4"
              />
              <span>Cart (${{ cartTotal }})</span>
              <UBadge
                v-if="cartCount > 0"
                color="primary"
                variant="solid"
                class="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                {{ cartCount }}
              </UBadge>
            </button>
            <USelectMenu
              v-model="selectedCurrency"
              :options="currencies"
              class="w-20"
              size="xs"
            />
            <USelectMenu
              v-model="selectedLanguage"
              :options="languages"
              class="w-24"
              size="xs"
            />
            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-primary-600"
            >
              Login / Register
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Main Header -->
    <UContainer class="py-4">
      <div class="flex items-center justify-between gap-8">
        <!-- Logo -->
        <AppLogo />

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl">
          <div class="flex gap-2">
            <UInput
              v-model="searchQuery"
              placeholder="Search for products..."
              size="lg"
              class="flex-1"
              @keyup.enter="handleSearch"
            />
            <UButton
              color="primary"
              size="lg"
              @click="handleSearch"
            >
              Search
            </UButton>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-bars-3"
          class="lg:hidden"
          @click="toggleMobileMenu"
        />
      </div>
    </UContainer>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden border-t border-gray-200 bg-white"
    >
      <UContainer class="py-4">
        <nav class="flex flex-col gap-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-primary-600 font-medium"
            @click="toggleMobileMenu"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </UContainer>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const { cartTotal, cartCount, isCartOpen } = useCart()
const selectedCurrency = ref('USD')
const selectedLanguage = ref('English')

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
]

const languages = [
  { label: 'English', value: 'English' },
  { label: 'Vietnamese', value: 'Vietnamese' },
  { label: 'Spanish', value: 'Spanish' },
]

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Pages', path: '/pages' },
  { label: 'Blog', path: '/blog' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/shop?search=${encodeURIComponent(searchQuery.value)}`)
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const openCart = () => {
  isCartOpen.value = true
}
</script>
