<template>
  <footer class="bg-gray-900 text-white">
    <!-- Top Footer -->
    <UContainer class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <AppLogo class="mb-4" />
          <p class="text-gray-400 mb-4">
            Fresh Shop is your one-stop destination for fresh, organic, and
            healthy products.
          </p>
          <div class="flex items-center gap-2 text-gray-400 mb-2">
            <UIcon
              name="i-heroicons-phone"
              class="w-5 h-5"
            />
            <span>+1 234 567 890</span>
          </div>
          <div class="flex items-center gap-2 text-gray-400">
            <UIcon
              name="i-heroicons-envelope"
              class="w-5 h-5"
            />
            <span>info@freshshop.com</span>
          </div>
        </div>

        <!-- My Account -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            My Account
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in accountLinks"
              :key="link.path"
            >
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Help -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            Help
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in helpLinks"
              :key="link.path"
            >
              <NuxtLink
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-lg font-semibold mb-4">
            Categories
          </h3>
          <ul class="space-y-2">
            <li
              v-for="category in categories"
              :key="category.path"
            >
              <NuxtLink
                :to="category.path"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ category.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800">
      <UContainer class="py-6">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Fresh Shop. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <NuxtImg
              v-for="payment in paymentMethods"
              :key="payment"
              :src="`/assets/images/${payment}.png`"
              :alt="payment"
              class="h-8 opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
              format="webp"
              sizes="32px"
            />
          </div>
        </div>
      </UContainer>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const accountLinks = [
  { label: 'My Account', path: '/account' },
  { label: 'Order History', path: '/account/orders' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'Newsletter', path: '/newsletter' },
]

const helpLinks = [
  { label: 'Contact', path: '/contact' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
]

const categories = [
  { label: 'Fresh Fruits', path: '/shop?category=fruits' },
  { label: 'Vegetables', path: '/shop?category=vegetables' },
  { label: 'Organic Food', path: '/shop?category=organic' },
  { label: 'Dairy Products', path: '/shop?category=dairy' },
]

const paymentMethods = ['Visa', 'Mastercard', 'American Express', 'Discover']
</script>
