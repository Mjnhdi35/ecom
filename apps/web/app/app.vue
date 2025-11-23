<script setup lang="ts"></script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
/* Ensure smooth color transitions for dark mode */
* {
  transition-property: background-color, border-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}
</style>
