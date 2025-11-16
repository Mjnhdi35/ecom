export default defineAppConfig({
  ui: {
    // Button configuration - Custom styling for ecom design system
    button: {
      default: {
        size: 'md',
        color: 'primary',
        variant: 'solid',
      },
      // Custom variants
      variants: {
        solid: {
          'primary':
            'bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-500',
          'soft-primary':
            'bg-soft-primary-500 text-white hover:bg-soft-primary-600 focus-visible:outline-soft-primary-500',
          'hard-primary':
            'bg-hard-primary-500 text-white hover:bg-hard-primary-600 focus-visible:outline-hard-primary-500',
          'warning':
            'bg-warning-500 text-white hover:bg-warning-600 focus-visible:outline-warning-500',
          'danger':
            'bg-danger-500 text-white hover:bg-danger-600 focus-visible:outline-danger-500',
        },
        outline: {
          'primary':
            'bg-transparent border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600',
          'soft-primary':
            'bg-transparent border-soft-primary-500 text-soft-primary-500 hover:bg-soft-primary-50 hover:border-soft-primary-600 hover:text-soft-primary-600',
          'hard-primary':
            'bg-transparent border-hard-primary-500 text-hard-primary-500 hover:bg-hard-primary-50 hover:border-hard-primary-600 hover:text-hard-primary-600',
          'warning':
            'bg-transparent border-warning-500 text-warning-500 hover:bg-warning-50 hover:border-warning-600 hover:text-warning-600',
          'danger':
            'bg-transparent border-danger-500 text-danger-500 hover:bg-danger-50 hover:border-danger-600 hover:text-danger-600',
        },
        ghost: {
          'primary':
            'bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-600',
          'soft-primary':
            'bg-transparent text-soft-primary-500 hover:bg-soft-primary-50 hover:text-soft-primary-600',
          'hard-primary':
            'bg-transparent text-hard-primary-500 hover:bg-hard-primary-50 hover:text-hard-primary-600',
          'warning':
            'bg-transparent text-warning-500 hover:bg-warning-50 hover:text-warning-600',
          'danger':
            'bg-transparent text-danger-500 hover:bg-danger-50 hover:text-danger-600',
        },
        soft: {
          'primary':
            'bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-600',
          'soft-primary':
            'bg-soft-primary-50 text-soft-primary-500 hover:bg-soft-primary-100 hover:text-soft-primary-600',
          'hard-primary':
            'bg-hard-primary-50 text-hard-primary-500 hover:bg-hard-primary-100 hover:text-hard-primary-600',
          'warning':
            'bg-warning-50 text-warning-500 hover:bg-warning-100 hover:text-warning-600',
          'danger':
            'bg-danger-50 text-danger-500 hover:bg-danger-100 hover:text-danger-600',
        },
      },
    },
  },
})
