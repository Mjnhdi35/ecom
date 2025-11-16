export interface CartItem {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart', () => [])
  const isCartOpen = useState('cart-open', () => false)

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
  })

  const cartCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const addToCart = (
    product: {
      id: number
      name: string
      image: string
      price: number
    },
    quantity = 1,
  ) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    }
    else {
      cartItems.value.push({
        ...product,
        quantity,
      })
    }
    isCartOpen.value = true
  }

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    isCartOpen,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
