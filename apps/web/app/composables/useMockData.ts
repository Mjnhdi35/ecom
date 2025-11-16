export interface Category {
  id: number
  name: string
  image: string
  count?: number
}

export interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  badge?: string
  category?: string
  description?: string
}

export interface Banner {
  title: string
  description?: string
  price?: number
  badge?: string
  badgeColor?: 'primary' | 'error' | 'warning' | 'success'
  bgClass: string
  backgroundImage?: string
  showCountdown?: boolean
  countdownDate?: string
}

export interface NewsItem {
  id: number
  image: string
  title: string
  excerpt: string
  author: string
  date: string
  commentCount?: number
}

export interface Testimonial {
  id: number
  content: string
  name: string
  role: string
  avatar: string
  rating: number
}

// Agriculture product images - using Unsplash API with local fallback
const getProductImage = (productName: string, localPath?: string) => {
  // In production, you can use Unsplash API
  // For now, using local images with option to switch to API
  if (localPath) return localPath

  // Fallback to Unsplash if no local image
  const query = encodeURIComponent(`${productName} organic fresh agriculture`)
  return `https://source.unsplash.com/800x800/?${query}`
}

const PRODUCT_IMAGES = {
  apple: getProductImage('green apple', '/assets/images/green-apple.png'),
  tomato: getProductImage('fresh tomato', '/assets/images/tomato.png'),
  lettuce: getProductImage(
    'organic lettuce',
    '/assets/images/green-lettuce.png',
  ),
  cauliflower: getProductImage(
    'fresh cauliflower',
    '/assets/images/cauliflower.png',
  ),
  eggplant: getProductImage('fresh eggplant', '/assets/images/eggplant.png'),
  mango: getProductImage('ripe mango', '/assets/images/mango.png'),
  chilli: getProductImage('green chilli', '/assets/images/green-chilli.png'),
  bundle: getProductImage('vegetables bundle', '/assets/images/Image.png'),
  fruitMix: getProductImage('fruit mix', '/assets/images/Image-2.png'),
  salad: getProductImage('fresh salad', '/assets/images/green.png'),
  premium: getProductImage('organic box', '/assets/images/Products.png'),
  // Additional agriculture products
  carrot: getProductImage('fresh carrot'),
  broccoli: getProductImage('fresh broccoli'),
  spinach: getProductImage('fresh spinach'),
  cucumber: getProductImage('fresh cucumber'),
  bellPepper: getProductImage('bell pepper'),
  onion: getProductImage('fresh onion'),
  potato: getProductImage('organic potato'),
  banana: getProductImage('organic banana'),
  orange: getProductImage('fresh orange'),
  strawberry: getProductImage('fresh strawberry'),
  grapes: getProductImage('fresh grapes'),
  corn: getProductImage('fresh corn'),
  peas: getProductImage('fresh peas'),
} as const

export const useMockData = () => {
  const categories: Category[] = [
    { id: 1, name: 'Fresh Fruits', image: PRODUCT_IMAGES.apple, count: 24 },
    {
      id: 2,
      name: 'Fresh Vegetables',
      image: PRODUCT_IMAGES.tomato,
      count: 32,
    },
    {
      id: 3,
      name: 'Organic Produce',
      image: PRODUCT_IMAGES.lettuce,
      count: 18,
    },
    {
      id: 4,
      name: 'Herbs & Spices',
      image: PRODUCT_IMAGES.chilli,
      count: 15,
    },
    { id: 5, name: 'Root Vegetables', image: PRODUCT_IMAGES.carrot, count: 12 },
    { id: 6, name: 'Leafy Greens', image: PRODUCT_IMAGES.spinach, count: 10 },
    { id: 7, name: 'Grains & Legumes', image: PRODUCT_IMAGES.corn, count: 8 },
    {
      id: 8,
      name: 'Seasonal Specials',
      image: PRODUCT_IMAGES.bundle,
      count: 6,
    },
  ]

  const products: Product[] = [
    // Fruits
    {
      id: 1,
      name: 'Organic Green Apple',
      image: PRODUCT_IMAGES.apple,
      price: 14.99,
      originalPrice: 19.99,
      rating: 4.5,
      reviewCount: 125,
      badge: 'Sale 25%',
      category: 'Fresh Fruits',
    },
    {
      id: 2,
      name: 'Fresh Ripe Mango',
      image: PRODUCT_IMAGES.mango,
      price: 15.99,
      originalPrice: 20.99,
      rating: 4.9,
      reviewCount: 89,
      badge: 'Sale 24%',
      category: 'Fresh Fruits',
    },
    {
      id: 3,
      name: 'Organic Banana Bunch',
      image: PRODUCT_IMAGES.banana,
      price: 8.99,
      originalPrice: 11.99,
      rating: 4.7,
      reviewCount: 156,
      badge: 'Sale 25%',
      category: 'Fresh Fruits',
    },
    {
      id: 4,
      name: 'Fresh Sweet Orange',
      image: PRODUCT_IMAGES.orange,
      price: 12.99,
      rating: 4.6,
      reviewCount: 98,
      category: 'Fresh Fruits',
    },
    {
      id: 5,
      name: 'Organic Strawberries',
      image: PRODUCT_IMAGES.strawberry,
      price: 16.99,
      originalPrice: 21.99,
      rating: 4.8,
      reviewCount: 142,
      badge: 'Sale 23%',
      category: 'Fresh Fruits',
    },
    {
      id: 6,
      name: 'Fresh Red Grapes',
      image: PRODUCT_IMAGES.grapes,
      price: 18.99,
      originalPrice: 24.99,
      rating: 4.7,
      reviewCount: 112,
      badge: 'Sale 24%',
      category: 'Fresh Fruits',
    },
    // Vegetables
    {
      id: 7,
      name: 'Fresh Organic Tomato',
      image: PRODUCT_IMAGES.tomato,
      price: 9.99,
      rating: 4.8,
      reviewCount: 203,
      category: 'Fresh Vegetables',
    },
    {
      id: 8,
      name: 'Organic Carrot Bundle',
      image: PRODUCT_IMAGES.carrot,
      price: 7.99,
      originalPrice: 10.99,
      rating: 4.6,
      reviewCount: 178,
      badge: 'Sale 27%',
      category: 'Root Vegetables',
    },
    {
      id: 9,
      name: 'Fresh Organic Lettuce',
      image: PRODUCT_IMAGES.lettuce,
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.3,
      reviewCount: 95,
      badge: 'Sale 19%',
      category: 'Leafy Greens',
    },
    {
      id: 10,
      name: 'Fresh Broccoli Head',
      image: PRODUCT_IMAGES.broccoli,
      price: 10.99,
      originalPrice: 13.99,
      rating: 4.7,
      reviewCount: 134,
      badge: 'Sale 21%',
      category: 'Fresh Vegetables',
    },
    {
      id: 11,
      name: 'Organic Cauliflower',
      image: PRODUCT_IMAGES.cauliflower,
      price: 8.99,
      rating: 4.6,
      reviewCount: 87,
      category: 'Fresh Vegetables',
    },
    {
      id: 12,
      name: 'Fresh Eggplant',
      image: PRODUCT_IMAGES.eggplant,
      price: 7.99,
      originalPrice: 12.99,
      rating: 4.7,
      reviewCount: 76,
      badge: 'Sale 38%',
      category: 'Fresh Vegetables',
    },
    {
      id: 13,
      name: 'Organic Spinach Bundle',
      image: PRODUCT_IMAGES.spinach,
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.5,
      reviewCount: 108,
      badge: 'Sale 23%',
      category: 'Leafy Greens',
    },
    {
      id: 14,
      name: 'Fresh Cucumber',
      image: PRODUCT_IMAGES.cucumber,
      price: 6.99,
      rating: 4.4,
      reviewCount: 92,
      category: 'Fresh Vegetables',
    },
    {
      id: 15,
      name: 'Organic Bell Pepper Mix',
      image: PRODUCT_IMAGES.bellPepper,
      price: 11.99,
      originalPrice: 14.99,
      rating: 4.8,
      reviewCount: 145,
      badge: 'Sale 20%',
      category: 'Fresh Vegetables',
    },
    {
      id: 16,
      name: 'Fresh Onion Bundle',
      image: PRODUCT_IMAGES.onion,
      price: 5.99,
      rating: 4.3,
      reviewCount: 167,
      category: 'Root Vegetables',
    },
    {
      id: 17,
      name: 'Organic Potatoes',
      image: PRODUCT_IMAGES.potato,
      price: 8.99,
      originalPrice: 11.99,
      rating: 4.6,
      reviewCount: 201,
      badge: 'Sale 25%',
      category: 'Root Vegetables',
    },
    {
      id: 18,
      name: 'Fresh Green Chilli',
      image: PRODUCT_IMAGES.chilli,
      price: 6.99,
      rating: 4.4,
      reviewCount: 64,
      category: 'Herbs & Spices',
    },
    {
      id: 19,
      name: 'Fresh Corn on the Cob',
      image: PRODUCT_IMAGES.corn,
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.7,
      reviewCount: 118,
      badge: 'Sale 23%',
      category: 'Grains & Legumes',
    },
    {
      id: 20,
      name: 'Fresh Peas Pods',
      image: PRODUCT_IMAGES.peas,
      price: 7.99,
      rating: 4.5,
      reviewCount: 83,
      category: 'Grains & Legumes',
    },
    // Bundles & Specials
    {
      id: 21,
      name: 'Fresh Vegetables Bundle',
      image: PRODUCT_IMAGES.bundle,
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviewCount: 256,
      badge: 'Sale 17%',
      category: 'Seasonal Specials',
    },
    {
      id: 22,
      name: 'Organic Fruit Mix Box',
      image: PRODUCT_IMAGES.fruitMix,
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.6,
      reviewCount: 189,
      badge: 'Sale 20%',
      category: 'Seasonal Specials',
    },
    {
      id: 23,
      name: 'Fresh Salad Pack',
      image: PRODUCT_IMAGES.salad,
      price: 11.99,
      originalPrice: 14.99,
      rating: 4.7,
      reviewCount: 142,
      badge: 'Sale 20%',
      category: 'Leafy Greens',
    },
    {
      id: 24,
      name: 'Premium Organic Box',
      image: PRODUCT_IMAGES.premium,
      price: 34.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviewCount: 312,
      badge: 'Sale 13%',
      category: 'Seasonal Specials',
    },
  ]

  const promotionalBanners: Banner[] = [
    {
      title: 'Best Deals',
      description: 'Fresh vegetables',
      badge: 'BEST DEALS',
      bgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
      backgroundImage: '/assets/images/Bannar3.png',
    },
    {
      title: 'Best Fat Free',
      description: 'Natural & Organic',
      badge: 'BEST FAT FREE',
      bgClass: 'bg-gradient-to-br from-black to-gray-800',
      backgroundImage: '/assets/images/Bannar4.png',
    },
    {
      title: 'Sale of the Month',
      price: 29.99,
      badge: 'SUMMER SALE',
      bgClass: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      backgroundImage: '/assets/images/Bannar5.png',
      showCountdown: true,
      countdownDate: '2025-12-31T23:59:59',
    },
  ]

  const latestNews: NewsItem[] = [
    {
      id: 1,
      image: PRODUCT_IMAGES.bundle,
      title: '10 Benefits of Eating Organic Agriculture Products',
      excerpt:
        'Discover the amazing health benefits of incorporating organic agriculture products into your daily diet. Learn about nutrient density, pesticide-free farming, and environmental impact...',
      author: 'Dr. Sarah Green',
      date: '15 Jan 2025',
      commentCount: 24,
    },
    {
      id: 2,
      image: PRODUCT_IMAGES.fruitMix,
      title: 'Sustainable Agriculture: How to Store Fresh Produce',
      excerpt:
        'Learn the best practices for storing your fresh vegetables and fruits to maintain their quality, extend shelf life, and preserve nutritional value. Expert tips from agriculture specialists...',
      author: 'Michael Farmstead',
      date: '12 Jan 2025',
      commentCount: 18,
    },
    {
      id: 3,
      image: PRODUCT_IMAGES.salad,
      title: 'Seasonal Agriculture Guide 2025: Best Times to Buy',
      excerpt:
        'A comprehensive guide to seasonal fruits and vegetables. Know when to buy them for the best quality, flavor, and nutritional value. Support local agriculture and save money...',
      author: 'Emma Harvest',
      date: '10 Jan 2025',
      commentCount: 31,
    },
    {
      id: 4,
      image: PRODUCT_IMAGES.carrot,
      title: 'Organic Farming Methods: What Makes It Different',
      excerpt:
        'Understanding organic agriculture practices, soil health, crop rotation, and natural pest control methods. Why organic produce is worth the investment for your health...',
      author: 'James Organic',
      date: '8 Jan 2025',
      commentCount: 15,
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content:
        'Fresh Shop has the best quality organic products. I\'ve been shopping here for months and I\'m always satisfied with the freshness and quality.',
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      avatar: '/assets/images/ImageCeo.png',
      rating: 5,
    },
    {
      id: 2,
      content:
        'The delivery is fast and the products are always fresh. Highly recommend Fresh Shop for all your organic food needs.',
      name: 'Michael Brown',
      role: 'Premium Member',
      avatar: '/assets/images/ImageCeo.png',
      rating: 5,
    },
    {
      id: 3,
      content:
        'Amazing customer service and great prices. The organic vegetables are always crisp and fresh. Love shopping here!',
      name: 'Emily Davis',
      role: 'Loyal Customer',
      avatar: '/assets/images/ImageCeo.png',
      rating: 5,
    },
  ]

  return {
    categories,
    products,
    promotionalBanners,
    latestNews,
    testimonials,
    getPopularProducts: () => products.slice(0, 4),
    getHotDeals: () =>
      products.filter(p => p.badge?.includes('Sale')).slice(0, 4),
    getFeaturedProducts: () => products.slice(8, 12),
  }
}
