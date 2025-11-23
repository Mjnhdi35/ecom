<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <UMain class="flex-1">
      <UContainer>
        <slot />
      </UContainer>
    </UMain>
    <Footer />
  </div>
</template>
