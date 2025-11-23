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
        size: 'md',
        variant: 'outline',
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
        root: 'bg-white sticky top-0 z-50',
        container:
          'flex items-center justify-between gap-2 sm:gap-4 border-b border-gray-200',
        left: 'shrink-0',
        center: 'flex-1 max-w-2xl mx-auto hidden lg:flex',
        right: 'flex items-center gap-2 lg:gap-4 shrink-0',
        top: 'bg-white border-b border-gray-200',
        bottom: 'bg-gray-900',
      },
    },

    // Footer component configuration
    footer: {
      slots: {
        root: '',
        top: 'bg-white',
        bottom: 'bg-primary-800',
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
});
