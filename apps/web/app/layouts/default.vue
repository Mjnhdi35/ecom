<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <Header />
    <UMain class="flex-1">
      <UContainer>
        <slot />
      </UContainer>
    </UMain>
    <Footer />
  </div>
</template>
