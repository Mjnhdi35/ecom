<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-2"
        >
          <UIcon
            v-if="collapsed"
            name="i-heroicons-squares-2x2"
            class="w-6 h-6 text-primary-600 mx-auto"
          />
          <template v-else>
            <UIcon
              name="i-heroicons-squares-2x2"
              class="w-6 h-6 text-primary-600"
            />
            <span class="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
          </template>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="navItems"
          orientation="vertical"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{
            src: '/assets/images/ImageCeo.png',
            alt: 'Admin',
          }"
          :label="collapsed ? undefined : 'Admin User'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #right>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                icon="i-heroicons-bell"
                color="neutral"
                size="sm"
              />
              <UButton
                variant="ghost"
                icon="i-heroicons-cog-6-tooth"
                color="neutral"
                size="sm"
              />
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <div class="p-6">
        <slot />
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const navItems: NavigationMenuItem[][] = [[
  {
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/admin',
    active: route.path === '/admin',
  },
  {
    label: 'Products',
    icon: 'i-heroicons-cube',
    to: '/admin/products',
    active: route.path.startsWith('/admin/products'),
  },
  {
    label: 'Orders',
    icon: 'i-heroicons-shopping-bag',
    to: '/admin/orders',
    active: route.path.startsWith('/admin/orders'),
  },
  {
    label: 'Customers',
    icon: 'i-heroicons-users',
    to: '/admin/customers',
    active: route.path.startsWith('/admin/customers'),
  },
  {
    label: 'Categories',
    icon: 'i-heroicons-folder',
    to: '/admin/categories',
    active: route.path.startsWith('/admin/categories'),
  },
  {
    label: 'Analytics',
    icon: 'i-heroicons-chart-bar',
    to: '/admin/analytics',
    active: route.path.startsWith('/admin/analytics'),
  },
], [
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/admin/settings',
    active: route.path.startsWith('/admin/settings'),
  },
]]
</script>
