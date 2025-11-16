export interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  badge?: string
  isWishlisted?: boolean
  category?: string
}

export const useProducts = () => {
  const products = useState<Product[]>('products', () => [])

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.value.filter(p => p.category === category)
  }

  const searchProducts = (query: string) => {
    if (!query) return products.value
    return products.value.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return {
    products,
    getProductById,
    getProductsByCategory,
    searchProducts,
  }
}
