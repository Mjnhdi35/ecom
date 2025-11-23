<script setup lang="ts">
// Component name must be multi-word for Vue linting
defineOptions({
  name: 'AppFooter',
})

interface FooterLink {
  label: string
  to: string
}

// Newsletter
const email = ref('')

// Social Media Links
const socialLinks = [
  {
    name: 'Facebook',
    icon: 'i-simple-icons-facebook',
    url: 'https://facebook.com',
  },
  {
    name: 'Twitter',
    icon: 'i-simple-icons-twitter',
    url: 'https://twitter.com',
  },
  {
    name: 'Pinterest',
    icon: 'i-simple-icons-pinterest',
    url: 'https://pinterest.com',
  },
  {
    name: 'Instagram',
    icon: 'i-simple-icons-instagram',
    url: 'https://instagram.com',
  },
]

// My Account Links
const myAccountLinks = ref<FooterLink[]>([
  { label: 'My Account', to: '/account' },
  { label: 'Order History', to: '/account/orders' },
  { label: 'Shoping Cart', to: '/cart' },
  { label: 'Wishlist', to: '/wishlist' },
])

// Helps Links
const helpsLinks = ref<FooterLink[]>([
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faqs' },
  { label: 'Terms & Condition', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
])

// Proxy Links
const proxyLinks = ref<FooterLink[]>([
  { label: 'About', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Product', to: '/products' },
  { label: 'Track Order', to: '/track-order' },
])

// Categories
const categories = ref<FooterLink[]>([
  { label: 'Fruit & Vegetables', to: '/categories/fruits-vegetables' },
  { label: 'Meat & Fish', to: '/categories/meat-fish' },
  { label: 'Bread & Bakery', to: '/categories/bread-bakery' },
  { label: 'Beauty & Health', to: '/categories/beauty-health' },
])

// Current Year
const currentYear = new Date().getFullYear()

// Subscribe handler
function handleSubscribe() {
  if (email.value.trim()) {
    // Implement newsletter subscription logic here
    email.value = ''
  }
}
</script>

<template>
  <UFooter>
    <!-- Top: Newsletter Subscription Section -->
    <template #top>
      <div class="bg-white dark:bg-gray-900">
        <UContainer class="py-8 lg:py-12">
          <div
            class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8"
          >
            <!-- Left: Title and Description -->
            <div class="flex-1 max-w-md">
              <h2 class="heading-03-600 text-gray-900 dark:text-gray-100 mb-3">
                Subscribe our Newsletter
              </h2>
              <p class="body-medium text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <!-- Right: Email Input, Subscribe Button, and Social Icons -->
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
            >
              <!-- Email Input and Subscribe Button -->
              <form
                class="flex gap-0 flex-1 sm:flex-initial"
                @submit.prevent="handleSubscribe"
              >
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="Your email address"
                  size="lg"
                  color="primary"
                  variant="outline"
                  class="flex-1 min-w-[200px] rounded-r-none"
                />
                <UButton
                  type="submit"
                  color="primary"
                  size="lg"
                  variant="solid"
                  label="Subscribe"
                  class="rounded-l-none"
                />
              </form>

              <!-- Social Media Icons -->
              <div
                class="flex items-center gap-2 justify-center sm:justify-start"
              >
                <UButton
                  v-for="social in socialLinks"
                  :key="social.name"
                  :icon="social.icon"
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  square
                  :to="social.url"
                  target="_blank"
                  :aria-label="social.name"
                  class="bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full"
                />
              </div>
            </div>
          </div>
        </UContainer>
      </div>
    </template>

    <!-- Bottom: Footer Content -->
    <template #bottom>
      <div class="bg-primary-800 dark:bg-primary-900">
        <UContainer class="py-4 lg:py-6">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6"
          >
            <!-- Left Column: Brand & Contact -->
            <div class="sm:col-span-2 lg:col-span-1">
              <Logo
                :show-text="true"
                size="lg"
                text-color="#ffffff"
                brand-name="Agriculture"
                class="mb-4"
              />
              <p class="body-medium text-gray-300 dark:text-gray-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div class="flex flex-col gap-2">
                <a
                  href="tel:+84909090909"
                  class="body-medium text-primary-400 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200 transition-colors"
                >
                  +84 909 090 909
                </a>
                <a
                  href="mailto:agriculture@agriculture.com"
                  class="body-medium text-primary-400 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200 transition-colors"
                >
                  agriculture@agriculture.com
                </a>
              </div>
            </div>

            <!-- Middle Columns: Navigation Links -->
            <div>
              <h3 class="heading-05-600 text-white mb-4">
                My Account
              </h3>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="link in myAccountLinks"
                  :key="link.label"
                >
                  <NuxtLink
                    :to="link.to"
                    class="body-medium text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-200 transition-colors"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="heading-05-600 text-white mb-4">
                Helps
              </h3>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="link in helpsLinks"
                  :key="link.label"
                >
                  <NuxtLink
                    :to="link.to"
                    class="body-medium text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-200 transition-colors"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="heading-05-600 text-white mb-4">
                Proxy
              </h3>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="link in proxyLinks"
                  :key="link.label"
                >
                  <NuxtLink
                    :to="link.to"
                    class="body-medium text-gray-300 dark:text-gray-400 hover:text-primary-300 dark:hover:text-primary-200 transition-colors"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Right Column: Categories -->
            <div>
              <h3 class="heading-05-600 text-white mb-4">
                Categories
              </h3>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="category in categories"
                  :key="category.label"
                >
                  <NuxtLink
                    :to="category.to"
                    class="body-medium text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {{ category.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar: Copyright and Payment Methods -->
          <div
            class="border-t border-primary-700 dark:border-primary-800 pt-3 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <!-- Left: Copyright -->
            <p
              class="body-medium text-gray-300 dark:text-gray-400 text-center sm:text-left"
            >
              Agriculture eCommerce © {{ currentYear }}. All Rights Reserved
            </p>

            <!-- Right: Payment Methods and Secure Payment Badge -->
            <div class="flex items-center gap-4">
              <!-- Payment Method Icons -->
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-simple-icons-applepay"
                  class="size-8 text-white opacity-80"
                />
                <UIcon
                  name="i-simple-icons-visa"
                  class="size-8 text-white opacity-80"
                />
                <UIcon
                  name="i-simple-icons-discover"
                  class="size-8 text-white opacity-80"
                />
                <UIcon
                  name="i-simple-icons-mastercard"
                  class="size-8 text-white opacity-80"
                />
              </div>

              <!-- Secure Payment Badge -->
              <div
                class="flex items-center gap-2 bg-primary-700 dark:bg-primary-800 px-3 py-2 rounded"
              >
                <UIcon
                  name="i-lucide-lock"
                  class="size-4 text-white"
                />
                <span class="body-small text-white">Secure Payment</span>
              </div>
            </div>
          </div>
        </UContainer>
      </div>
    </template>
  </UFooter>
</template>

<style scoped>
/* Footer specific styles if needed */
</style>
