<template>
  <div class="space-y-8">
    <!-- Reviews Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Overall Rating -->
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="text-center mb-6">
          <div class="text-5xl font-bold text-gray-900 mb-2">
            {{ overallRating.toFixed(1) }}
          </div>
          <RatingStars
            :rating="overallRating"
            size="lg"
            class="justify-center mb-2"
          />
          <p class="text-sm text-gray-600">
            Based on {{ totalReviews }} reviews
          </p>
        </div>

        <!-- Rating Breakdown -->
        <div class="space-y-2">
          <div
            v-for="(count, rating) in ratingBreakdown"
            :key="rating"
            class="flex items-center gap-3"
          >
            <span class="text-sm font-semibold text-gray-700 w-8">
              {{ rating }} star
            </span>
            <div class="flex-1 bg-gray-200 rounded-full h-2">
              <div
                class="bg-primary-600 h-2 rounded-full transition-all"
                :style="{ width: `${(count / totalReviews) * 100}%` }"
              />
            </div>
            <span class="text-sm text-gray-600 w-12 text-right">
              {{ count }}
            </span>
          </div>
        </div>
      </div>

      <!-- Review Form -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          Write a Review
        </h3>
        <form
          class="space-y-4"
          @submit.prevent="handleSubmitReview"
        >
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Your Rating
            </label>
            <div class="flex items-center gap-2">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="focus:outline-none"
                @click="reviewForm.rating = star"
              >
                <UIcon
                  :name="
                    star <= reviewForm.rating
                      ? 'i-heroicons-star-solid'
                      : 'i-heroicons-star'
                  "
                  :class="[
                    'w-6 h-6 transition-colors',
                    star <= reviewForm.rating
                      ? 'text-warning-500'
                      : 'text-gray-300',
                  ]"
                />
              </button>
              <span class="text-sm text-gray-600 ml-2">
                {{ reviewForm.rating }}/5
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Your Name
            </label>
            <UInput
              v-model="reviewForm.name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Your Email
            </label>
            <UInput
              v-model="reviewForm.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Your Review
            </label>
            <UTextarea
              v-model="reviewForm.comment"
              placeholder="Write your review here..."
              :rows="4"
              required
            />
          </div>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            :loading="isSubmitting"
          >
            Submit Review
          </UButton>
        </form>
      </div>
    </div>

    <!-- Filter Reviews -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm font-semibold text-gray-900">Filter by:</span>
        <UButton
          v-for="filter in ratingFilters"
          :key="filter.value"
          :variant="selectedFilter === filter.value ? 'solid' : 'outline'"
          :color="selectedFilter === filter.value ? 'primary' : 'neutral'"
          size="sm"
          @click="selectedFilter = filter.value"
        >
          {{ filter.label }}
        </UButton>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Sort by:</span>
        <USelectMenu
          v-model="sortBy"
          :options="sortOptions"
          size="sm"
        />
      </div>
    </div>

    <!-- Reviews List -->
    <div class="space-y-6">
      <div
        v-for="review in filteredReviews"
        :key="review.id"
        class="bg-white border border-gray-200 rounded-lg p-6"
      >
        <div class="flex items-start gap-4">
          <UAvatar
            :src="review.avatar"
            :alt="review.name"
            size="lg"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ review.name }}
                </h4>
                <div class="flex items-center gap-2 mt-1">
                  <RatingStars
                    :rating="review.rating"
                    size="sm"
                  />
                  <span class="text-xs text-gray-500">
                    {{ formatDate(review.date) }}
                  </span>
                </div>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ review.comment }}
            </p>
            <div class="flex items-center gap-4">
              <UButton
                variant="ghost"
                size="sm"
                :color="review.helpful ? 'primary' : 'neutral'"
                @click="handleHelpful(review.id)"
              >
                <UIcon
                  :name="
                    review.helpful
                      ? 'i-heroicons-hand-thumb-up-solid'
                      : 'i-heroicons-hand-thumb-up'
                  "
                  class="w-4 h-4 mr-1"
                />
                Helpful ({{ review.helpfulCount }})
              </UButton>
              <UButton
                variant="ghost"
                size="sm"
                color="neutral"
                @click="handleReport(review.id)"
              >
                Report
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredReviews.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-chat-bubble-left-right"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        No reviews found
      </h3>
      <p class="text-gray-600">
        Be the first to review this product!
      </p>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center"
    >
      <UPagination
        v-model:page="currentPage"
        :total="totalReviews"
        :items-per-page="reviewsPerPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Review {
  id: number
  name: string
  email: string
  avatar: string
  rating: number
  comment: string
  date: string
  helpful: boolean
  helpfulCount: number
}

interface Props {
  productId: number
  reviews?: Review[]
}

const props = withDefaults(defineProps<Props>(), {
  reviews: () => [],
})

const emit = defineEmits<{
  reviewSubmitted: [
    review: Omit<Review, 'id' | 'date' | 'helpful' | 'helpfulCount'>,
  ]
  helpful: [reviewId: number]
  report: [reviewId: number]
}>()

const reviews = ref<Review[]>([
  ...props.reviews,
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/assets/images/ImageCeo.png',
    rating: 5,
    comment:
      'Excellent product! Very fresh and high quality. Highly recommend to everyone.',
    date: '2025-01-15',
    helpful: false,
    helpfulCount: 12,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/assets/images/ImageCeo.png',
    rating: 4,
    comment:
      'Good quality product, arrived fresh. Packaging could be better but overall satisfied.',
    date: '2025-01-10',
    helpful: true,
    helpfulCount: 8,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: '/assets/images/ImageCeo.png',
    rating: 5,
    comment:
      'Amazing quality! Will definitely order again. Fast shipping and great customer service.',
    date: '2025-01-08',
    helpful: false,
    helpfulCount: 15,
  },
])

const reviewForm = ref({
  name: '',
  email: '',
  rating: 5,
  comment: '',
})

const selectedFilter = ref<'all' | 1 | 2 | 3 | 4 | 5>('all')
const sortBy = ref('latest')
const currentPage = ref(1)
const reviewsPerPage = 10
const isSubmitting = ref(false)

const ratingFilters: Array<{
  label: string
  value: 'all' | 1 | 2 | 3 | 4 | 5
}> = [
  { label: 'All', value: 'all' },
  { label: '5 Star', value: 5 },
  { label: '4 Star', value: 4 },
  { label: '3 Star', value: 3 },
  { label: '2 Star', value: 2 },
  { label: '1 Star', value: 1 },
]

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest Rating', value: 'highest' },
  { label: 'Lowest Rating', value: 'lowest' },
  { label: 'Most Helpful', value: 'helpful' },
]

const filteredReviews = computed(() => {
  let filtered = [...reviews.value]

  // Filter by rating
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(
      r => r.rating === (selectedFilter.value as number),
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'oldest':
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
      break
    case 'highest':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'lowest':
      filtered.sort((a, b) => a.rating - b.rating)
      break
    case 'helpful':
      filtered.sort((a, b) => b.helpfulCount - a.helpfulCount)
      break
    default: // latest
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
  }

  // Pagination
  const start = (currentPage.value - 1) * reviewsPerPage
  const end = start + reviewsPerPage
  return filtered.slice(start, end)
})

const totalReviews = computed(() => reviews.value.length)

const overallRating = computed(() => {
  if (totalReviews.value === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return sum / totalReviews.value
})

const ratingBreakdown = computed(() => {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.value.forEach((review) => {
    const rating = review.rating as keyof typeof breakdown
    if (rating in breakdown && breakdown[rating] !== undefined) {
      breakdown[rating] = (breakdown[rating] || 0) + 1
    }
  })
  return breakdown
})

const totalPages = computed(() =>
  Math.ceil(totalReviews.value / reviewsPerPage),
)

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleSubmitReview = async () => {
  if (
    !reviewForm.value.name
    || !reviewForm.value.email
    || !reviewForm.value.comment
  ) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const newReview: Review = {
    id: reviews.value.length + 1,
    name: reviewForm.value.name,
    email: reviewForm.value.email,
    avatar: '/assets/images/ImageCeo.png',
    rating: reviewForm.value.rating,
    comment: reviewForm.value.comment,
    date: new Date().toISOString().split('T')[0] || '',
    helpful: false,
    helpfulCount: 0,
  }

  reviews.value.unshift(newReview)
  emit('reviewSubmitted', {
    name: reviewForm.value.name,
    email: reviewForm.value.email,
    rating: reviewForm.value.rating,
    comment: reviewForm.value.comment,
    avatar: '/assets/images/ImageCeo.png',
  })

  // Reset form
  reviewForm.value = {
    name: '',
    email: '',
    rating: 5,
    comment: '',
  }

  isSubmitting.value = false
  currentPage.value = 1
}

const handleHelpful = (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.helpful = !review.helpful
    review.helpfulCount += review.helpful ? 1 : -1
    emit('helpful', reviewId)
  }
}

const handleReport = (reviewId: number) => {
  emit('report', reviewId)
  // Show toast notification
  console.log('Review reported:', reviewId)
}
</script>
