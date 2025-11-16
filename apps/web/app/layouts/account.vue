<template>
  <div>
    <AppHeader />

    <!-- Breadcrumbs -->
    <div class="bg-gray-900 text-white py-8 mb-8">
      <UContainer>
        <nav class="text-sm">
          <NuxtLink
            to="/"
            class="hover:text-primary-400"
          >Home</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink
            to="/account"
            class="hover:text-primary-400"
          >My Account</NuxtLink>
          <span
            v-if="breadcrumb"
            class="mx-2"
          >/</span>
          <span
            v-if="breadcrumb"
            class="text-primary-400"
          >{{
            breadcrumb
          }}</span>
        </nav>
      </UContainer>
    </div>

    <UContainer class="py-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <UCard>
            <div class="text-center mb-6">
              <UAvatar
                :src="user?.avatar || '/assets/images/ImageCeo.png'"
                :alt="user?.name || 'User'"
                size="xl"
                class="mx-auto mb-4"
              />
              <h3 class="text-lg font-semibold text-gray-900">
                {{ user?.name || 'User' }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ user?.email || '' }}
              </p>
            </div>
            <nav class="space-y-2">
              <NuxtLink
                to="/account"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="
                  $route.path === '/account'
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'hover:bg-gray-50 text-gray-700'
                "
              >
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5"
                />
                Dashboard
              </NuxtLink>
              <NuxtLink
                to="/account/orders"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="
                  $route.path.startsWith('/account/orders')
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'hover:bg-gray-50 text-gray-700'
                "
              >
                <UIcon
                  name="i-heroicons-shopping-bag"
                  class="w-5 h-5"
                />
                Order History
              </NuxtLink>
              <NuxtLink
                to="/account/settings"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="
                  $route.path === '/account/settings'
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'hover:bg-gray-50 text-gray-700'
                "
              >
                <UIcon
                  name="i-heroicons-cog-6-tooth"
                  class="w-5 h-5"
                />
                Settings
              </NuxtLink>
              <button
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 w-full text-left"
                @click="handleLogout"
              >
                <UIcon
                  name="i-heroicons-arrow-right-on-rectangle"
                  class="w-5 h-5"
                />
                Logout
              </button>
            </nav>
          </UCard>
        </aside>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <slot />
        </div>
      </div>
    </UContainer>

    <NewsletterSubscription />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumb = computed(() => {
  if (route.path === '/account') return ''
  if (route.path === '/account/orders') return 'Order History'
  if (route.path.startsWith('/account/orders/')) return 'Order Details'
  if (route.path === '/account/settings') return 'Settings'
  return ''
})

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/assets/images/ImageCeo.png',
})

const handleLogout = () => {
  navigateTo('/login')
}
</script>
