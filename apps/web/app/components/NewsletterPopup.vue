<template>
  <UModal v-model="isOpen">
    <div class="max-w-4xl">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-gray-900">
              Subscribe to Our Newsletter
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="close"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Image -->
          <div class="hidden md:block">
            <NuxtImg
              src="/assets/images/ImageCeo.png"
              alt="Newsletter"
              class="w-full h-full object-cover rounded-lg"
              loading="lazy"
              format="webp"
              sizes="sm:100vw md:50vw"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col justify-center">
            <p class="text-gray-700 mb-6">
              Subscribe to our newsletter and Save your
              <span class="text-warning-600 font-bold">20% money</span>
              with discount code today.
            </p>
            <div class="space-y-4">
              <UInput
                v-model="email"
                placeholder="Enter your email"
                size="lg"
                type="email"
              />
              <UButton
                color="primary"
                size="lg"
                block
                @click="handleSubscribe"
              >
                Subscribe
              </UButton>
              <div class="flex items-center gap-2">
                <UCheckbox
                  v-model="dontShowAgain"
                  label="Do not show this window"
                />
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'subscribe': [email: string]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const email = ref('')
const dontShowAgain = ref(false)

const handleSubscribe = () => {
  if (email.value.trim()) {
    emit('subscribe', email.value)
    if (dontShowAgain.value) {
      localStorage.setItem('newsletter-popup-dismissed', 'true')
    }
    close()
  }
}

const close = () => {
  isOpen.value = false
}

onMounted(() => {
  const dismissed = localStorage.getItem('newsletter-popup-dismissed')
  if (!dismissed) {
    setTimeout(() => {
      isOpen.value = true
    }, 2000)
  }
})
</script>
