export interface WishlistItem {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
}

export const useWishlist = () => {
  const wishlistItems = useState<WishlistItem[]>('wishlist', () => [])

  const isWishlisted = (productId: number) => {
    return wishlistItems.value.some(item => item.id === productId)
  }

  const toggleWishlist = (product: WishlistItem) => {
    const index = wishlistItems.value.findIndex(
      item => item.id === product.id,
    )
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    }
    else {
      wishlistItems.value.push(product)
    }
  }

  const removeFromWishlist = (id: number) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
  }

  const clearWishlist = () => {
    wishlistItems.value = []
  }

  return {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  }
}
