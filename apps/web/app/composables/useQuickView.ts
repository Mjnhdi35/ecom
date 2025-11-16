import type { Product } from './useProducts'

export interface QuickViewProduct extends Product {
  images: string[]
  sku: string
  inStock: boolean
  stock: number
  description: string
  category: string
  tags: string[]
}

export const useQuickView = () => {
  const createQuickViewProduct = (product: Product): QuickViewProduct => ({
    ...product,
    images: [
      product.image,
      '/assets/images/green-apple.png',
      '/assets/images/tomato.png',
      '/assets/images/green-lettuce.png',
    ],
    sku: '2,51,594',
    inStock: true,
    stock: 100,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Vegetables',
    tags: ['Vegetables', 'Healthy', 'Fresh'],
  })

  return { createQuickViewProduct }
}
