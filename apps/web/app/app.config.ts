/**
 * App Configuration
 *
 * Defines runtime configuration for Nuxt UI components,
 * colors, and design system tokens.
 *
 * @see https://ui.nuxt.com/docs/getting-started/theme
 */
export default defineAppConfig({
  ui: {
    // Semantic color configuration
    colors: {
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    } as const,

    // Button component configuration
    button: {
      defaultVariants: {
        color: 'primary',
        size: 'md',
        variant: 'solid',
      },
    },

    // Icon component configuration
    icon: {
      defaultVariants: {
        size: 'md',
      },
    },

    // Checkbox component configuration
    checkbox: {
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    },

    // RadioGroup component configuration
    radioGroup: {
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    },

    // Input component configuration
    input: {
      defaultVariants: {
        color: 'primary',
        size: 'lg',
        variant: 'outline',
      },
      slots: {
        base: 'relative',
        wrapper: 'relative',
        leading: 'absolute inset-y-0 left-0 flex items-center pl-3',
        trailing: 'absolute inset-y-0 right-0 flex items-center pr-3',
        inner:
          'block w-full border-0 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm',
        input:
          'block w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-colors duration-200',
      },
    },

    // Card component configuration
    card: {
      slots: {
        root: 'rounded-lg border border-default transition-shadow duration-200',
        header: 'border-b border-default',
        footer: 'border-t border-default',
      },
    },

    // Alert component configuration
    alert: {
      defaultVariants: {
        color: 'primary',
        variant: 'soft',
      },
    },

    // Modal component configuration
    modal: {
      slots: {
        overlay: 'transition-opacity duration-200',
        content: 'transition-transform duration-200',
      },
    },

    // Toast component configuration
    toast: {
      slots: {
        root: 'rounded-lg shadow-lg transition-all duration-200',
      },
    },

    // Header component configuration
    header: {
      slots: {
        root: 'bg-white dark:bg-gray-900 sticky top-0 z-50',
        container:
          'flex items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800',
        left: 'shrink-0',
        center: 'flex-1 max-w-2xl mx-auto hidden lg:flex',
        right: 'flex items-center gap-2 lg:gap-4 shrink-0',
        top: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800',
        bottom: 'hidden lg:block bg-gray-900 dark:bg-gray-800',
        body: 'lg:hidden',
      },
    },

    // Footer component configuration
    footer: {
      slots: {
        root: '',
        top: 'bg-white dark:bg-gray-900',
        bottom: 'bg-primary-800 dark:bg-primary-900',
      },
    },

    // Main component configuration
    main: {
      base: 'flex-1',
    },

    // Container component configuration
    container: {
      base: 'w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-[300px]',
    },
  },
})
