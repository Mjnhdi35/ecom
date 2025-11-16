<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />

    <UContainer class="py-16 mb-16">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>
        <p class="text-lg text-gray-700">
          Find answers to common questions about our products, shipping,
          returns, and more.
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-4">
        <UAccordion :items="faqs">
          <template #default="{ item }">
            <div class="p-6">
              <p class="text-gray-700 leading-relaxed">
                {{ item.answer }}
              </p>
            </div>
          </template>
        </UAccordion>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'FAQs' }]

const faqs = [
  {
    label: 'What is organic food?',
    defaultOpen: false,
    answer:
      'Organic food is produced using methods that comply with organic farming standards. These standards vary worldwide, but organic farming in general features practices that cycle resources, promote ecological balance, and conserve biodiversity.',
  },
  {
    label: 'How do I place an order?',
    defaultOpen: false,
    answer:
      'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You can also call us directly to place an order over the phone.',
  },
  {
    label: 'What are your shipping options?',
    defaultOpen: false,
    answer:
      'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, and express shipping is available for an additional fee.',
  },
  {
    label: 'Can I return or exchange products?',
    defaultOpen: false,
    answer:
      'Yes, we offer a 30-day return policy. Products must be in their original condition and packaging. Please contact our customer service team to initiate a return.',
  },
  {
    label: 'Do you offer discounts or promotions?',
    defaultOpen: false,
    answer:
      'Yes! We regularly offer discounts and promotions. Sign up for our newsletter to receive exclusive offers and be the first to know about sales.',
  },
  {
    label: 'How do I track my order?',
    defaultOpen: false,
    answer:
      'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.',
  },
]
</script>
