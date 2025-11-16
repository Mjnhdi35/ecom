<template>
  <div>
    <AppHeader />

    <!-- Breadcrumbs -->
    <AppBreadcrumbs
      :items="breadcrumbs"
      bg-class="bg-gray-900 dark:bg-gray-950"
      text-class="text-white"
      active-class="text-primary-400"
    />

    <slot />

    <NewsletterSubscription />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

interface Breadcrumb {
  label: string
  path?: string
}

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const crumbs: Breadcrumb[] = [{ label: 'Home', path: '/' }]

  if (route.path.startsWith('/product/')) {
    crumbs.push({ label: 'Shop', path: '/shop' })
    const category = (route.query.category as string) || 'Agriculture'
    crumbs.push({
      label: category,
      path: `/shop?category=${category.toLowerCase()}`,
    })
    crumbs.push({ label: 'Product Details' })
  }
  else if (route.path === '/shop') {
    crumbs.push({ label: 'Shop' })
    if (route.query.category) {
      crumbs.push({ label: route.query.category as string })
    }
  }
  else {
    crumbs.push({ label: 'Shop', path: '/shop' })
  }

  return crumbs
})
</script>
