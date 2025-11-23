<script setup lang="ts">
defineOptions({
  name: 'AppHeader',
})

interface NavigationItem {
  label: string
  to: string
  hasDropdown?: boolean
}

// Language options
const languages = ref([
  { label: 'Vie', value: 'vi' },
  { label: 'Eng', value: 'en' },
  { label: 'Esp', value: 'es' },
])

// Currency options
const currencies = ref([
  { label: 'VND', value: 'vnd' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
])

// Selected values
const selectedLanguage = ref('vi')
const selectedCurrency = ref('vnd')

// Search
const searchQuery = ref('')

// Cart
const cartItemCount = ref(2)
const cartTotal = ref(57.0)
const cartOpen = ref(false)

// Navigation items
const navigationItems = ref<NavigationItem[]>([
  { label: 'Home', to: '/', hasDropdown: true },
  { label: 'Shop', to: '/shop', hasDropdown: true },
  { label: 'Pages', to: '/pages', hasDropdown: true },
  { label: 'Blog', to: '/blog', hasDropdown: true },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
])

// Search handler
function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 sticky top-0 z-50">
    <!-- Top Bar (Hidden on mobile) -->
    <div
      class="hidden sm:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <UContainer class="py-2 sm:py-4">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0"
        >
          <!-- Left: Store Location -->
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-map-pin"
              class="size-4 text-gray-600 shrink-0"
            />
            <span class="body-small text-gray-600 dark:text-gray-400 truncate">
              Store Location: 115 Đường số 2, Phường 13, Quận 6
            </span>
          </div>

          <!-- Right: Language, Currency, Sign In -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Language Select -->
            <USelect
              v-model="selectedLanguage"
              :items="languages"
              size="sm"
              color="neutral"
              variant="ghost"
              value-key="value"
              label-key="label"
              class="w-16 sm:w-20"
            />

            <!-- Currency Select -->
            <USelect
              v-model="selectedCurrency"
              :items="currencies"
              size="sm"
              color="neutral"
              variant="ghost"
              value-key="value"
              label-key="label"
              class="w-16 sm:w-20"
            />

            <!-- Sign In / Sign Up -->
            <NuxtLink
              to="/auth/sign-in"
              class="body-small text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors whitespace-nowrap"
            >
              Sign In / Sign Up
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Main Header -->
    <UHeader>
      <!-- Left: Logo -->
      <template #left>
        <Logo size="lg" />
      </template>

      <!-- Center: Search Bar (Desktop only) -->
      <template #default>
        <div class="flex-1 max-w-2xl mx-auto hidden lg:flex">
          <form
            class="flex gap-2 w-full"
            @submit.prevent="handleSearch"
          >
            <UInput
              v-model="searchQuery"
              type="search"
              placeholder="Search"
              size="lg"
              color="primary"
              variant="outline"
              icon="i-lucide-search"
              class="flex-1"
              :ui="{ base: 'rounded-r-none' }"
            />
            <UButton
              type="submit"
              color="primary"
              size="lg"
              variant="solid"
              label="Search"
              class="rounded-l-none"
            />
          </form>
        </div>
      </template>

      <!-- Right: Wishlist, Cart -->
      <template #right>
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <!-- Wishlist -->
          <UButton
            color="neutral"
            variant="ghost"
            size="md"
            square
            icon="i-lucide-heart"
            aria-label="Wishlist"
            class="lg:size-lg"
          />

          <!-- Shopping Cart -->
          <div class="flex items-center gap-1 sm:gap-2">
            <div class="relative">
              <UButton
                color="neutral"
                variant="ghost"
                size="md"
                square
                icon="i-lucide-shopping-bag"
                aria-label="Shopping Cart"
                class="lg:size-lg"
                @click="cartOpen = true"
              />
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 flex items-center justify-center size-4 sm:size-5 rounded-full bg-primary-500 text-white text-xs font-semibold"
              >
                {{ cartItemCount }}
              </span>
            </div>
            <div class="hidden sm:flex flex-col">
              <span class="body-small text-gray-600 dark:text-gray-400">Cart:</span>
              <span
                class="body-medium font-semibold text-gray-900 dark:text-gray-100"
              >
                ${{ cartTotal.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- Mobile Menu Body -->
      <template #body>
        <div class="lg:hidden">
          <UContainer class="py-4">
            <!-- Mobile Search Bar -->
            <form
              class="mb-6"
              @submit.prevent="handleSearch"
            >
              <div class="flex gap-2">
                <UInput
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search"
                  size="lg"
                  color="primary"
                  variant="outline"
                  icon="i-lucide-search"
                  class="flex-1"
                  :ui="{ base: 'rounded-r-none' }"
                />
                <UButton
                  type="submit"
                  color="primary"
                  size="lg"
                  variant="solid"
                  label="Search"
                  class="rounded-l-none"
                />
              </div>
            </form>

            <!-- Mobile Navigation Menu -->
            <nav class="mb-6">
              <ul class="flex flex-col gap-1">
                <li
                  v-for="item in navigationItems"
                  :key="item.label"
                >
                  <NuxtLink
                    :to="item.to"
                    class="nav-link-mobile flex items-center justify-between body-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
                  >
                    <span>{{ item.label }}</span>
                    <UIcon
                      v-if="item.hasDropdown"
                      name="i-lucide-chevron-right"
                      class="size-4 text-gray-400 dark:text-gray-500"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <!-- Mobile Color Mode Button -->
            <div
              class="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <UColorModeButton
                color="neutral"
                variant="ghost"
                size="md"
                class="text-gray-900 dark:text-gray-100"
              />
            </div>
          </UContainer>
        </div>
      </template>
    </UHeader>

    <!-- Bottom: Navigation Bar (Desktop only) -->
    <nav class="hidden lg:block bg-gray-900 dark:bg-gray-800">
      <UContainer class="py-3 lg:py-4">
        <div class="flex items-center justify-between gap-6">
          <!-- Left: Navigation Menu -->
          <div class="flex items-center gap-6">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.to"
              class="nav-link flex items-center gap-1 body-medium text-white dark:text-gray-100 hover:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              <span>{{ item.label }}</span>
              <UIcon
                v-if="item.hasDropdown"
                name="i-lucide-chevron-down"
                class="size-4"
              />
            </NuxtLink>
          </div>

          <!-- Right: Color Mode Button -->
          <div class="flex items-center">
            <UColorModeButton
              color="neutral"
              variant="ghost"
              size="md"
              class="text-white hover:text-primary-400 dark:text-gray-100 dark:hover:text-primary-300"
            />
          </div>
        </div>
      </UContainer>
    </nav>
  </div>
</template>

<style scoped>
.nav-link {
  position: relative;
}
</style>
