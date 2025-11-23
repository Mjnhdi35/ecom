/**
 * Reusable Form Composable
 *
 * Provides form state management, validation, and submission handling
 * for use with Nuxt UI's UForm component.
 */

import type { FormError, FormSubmitEvent } from '@nuxt/ui'

export interface UseFormOptions<T extends object> {
  /**
   * Initial form state
   */
  initialState: T
  /**
   * Validation function
   */
  validate?: (state: Partial<T>) => FormError[]
  /**
   * Submit handler
   */
  onSubmit: (data: T) => Promise<void> | void
  /**
   * Success callback
   */
  onSuccess?: () => void
  /**
   * Error callback
   */
  onError?: (error: unknown) => void
  /**
   * Show toast notifications
   */
  showToast?: boolean
  /**
   * Success toast message
   */
  successMessage?: {
    title: string
    description: string
  }
  /**
   * Error toast message formatter
   */
  errorMessage?: (error: unknown) => string
}

export function useForm<T extends object>(options: UseFormOptions<T>) {
  const {
    initialState,
    validate,
    onSubmit,
    onSuccess,
    onError,
    showToast = true,
    successMessage,
    errorMessage,
  } = options

  // Form state
  const state = reactive<T>({ ...initialState } as T)

  // Loading state
  const loading = ref(false)

  // Toast
  const toast = useToast()

  /**
   * Reset form to initial state
   */
  function reset() {
    Object.assign(state, initialState)
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(event: FormSubmitEvent<T>) {
    loading.value = true

    try {
      await onSubmit(event.data)

      if (showToast && successMessage) {
        toast.add({
          title: successMessage.title,
          description: successMessage.description,
          color: 'success',
        })
      }

      onSuccess?.()
    }
    catch (error) {
      const errorMsg = errorMessage
        ? errorMessage(error)
        : extractErrorMessage(error)

      if (showToast) {
        toast.add({
          title: 'Error',
          description: errorMsg,
          color: 'error',
        })
      }

      onError?.(error)
    }
    finally {
      loading.value = false
    }
  }

  /**
   * Extract error message from various error formats
   */
  function extractErrorMessage(error: unknown): string {
    const apiError = error as {
      statusCode?: number
      statusMessage?: string
      message?: string
      data?: {
        message?: string
        error?: string
      }
    }

    return (
      apiError.data?.message
      || apiError.data?.error
      || apiError.message
      || apiError.statusMessage
      || 'An error occurred'
    )
  }

  return {
    state,
    loading: readonly(loading),
    reset,
    handleSubmit,
    validate,
  }
}
