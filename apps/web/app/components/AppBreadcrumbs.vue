<template>
  <div :class="['py-8 mb-8', bgClass]">
    <UContainer>
      <nav class="text-sm">
        <template
          v-for="(crumb, index) in items"
          :key="index"
        >
          <NuxtLink
            v-if="crumb.path"
            :to="crumb.path"
            :class="[
              index === items.length - 1
                ? activeClass
                : 'hover:text-primary-400',
              textClass,
            ]"
          >
            {{ crumb.label }}
          </NuxtLink>
          <span
            v-else
            :class="[index === items.length - 1 ? activeClass : '', textClass]"
          >
            {{ crumb.label }}
          </span>
          <span
            v-if="index < items.length - 1"
            class="mx-2"
          >/</span>
        </template>
      </nav>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface Breadcrumb {
  label: string
  path?: string
}

interface Props {
  items: Breadcrumb[]
  bgClass?: string
  textClass?: string
  activeClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: 'bg-gray-900 text-white',
  textClass: 'text-white',
  activeClass: 'text-primary-400',
})
</script>
