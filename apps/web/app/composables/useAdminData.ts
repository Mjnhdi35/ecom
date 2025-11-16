export interface AdminOrder {
  id: string
  customer: string
  date: string
  total: number
  status: 'completed' | 'pending' | 'processing' | 'cancelled'
  items: number
}

export interface AdminProduct {
  id: number
  name: string
  image: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'out-of-stock'
  category: string
  sales?: number
  revenue?: number
}

export const useAdminData = () => {
  const stats = {
    revenue: { value: 45231, change: 12.5 },
    orders: { value: 1234, change: 8.2 },
    customers: { value: 8234, change: 15.3 },
    products: { value: 1234 },
  }

  const recentOrders: AdminOrder[] = [
    {
      id: '12345',
      customer: 'John Doe',
      date: '2025-01-15',
      total: 125.99,
      status: 'completed',
      items: 3,
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      date: '2025-01-15',
      total: 89.5,
      status: 'pending',
      items: 2,
    },
    {
      id: '12347',
      customer: 'Mike Johnson',
      date: '2025-01-14',
      total: 234,
      status: 'processing',
      items: 5,
    },
    {
      id: '12348',
      customer: 'Sarah Williams',
      date: '2025-01-13',
      total: 56.75,
      status: 'completed',
      items: 1,
    },
  ]

  const topProducts: AdminProduct[] = [
    {
      id: 1,
      name: 'Green Apple',
      image: '/assets/images/green-apple.png',
      sales: 234,
      revenue: 3234,
      price: 14.99,
      stock: 100,
      status: 'active',
      category: 'Fruits',
    },
    {
      id: 2,
      name: 'Fresh Tomato',
      image: '/assets/images/tomato.png',
      sales: 189,
      revenue: 1890,
      price: 9.99,
      stock: 50,
      status: 'active',
      category: 'Vegetables',
    },
    {
      id: 3,
      name: 'Organic Lettuce',
      image: '/assets/images/green-lettuce.png',
      sales: 156,
      revenue: 2028,
      price: 12.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'Organic',
    },
  ]

  const adminProducts: AdminProduct[] = [
    {
      id: 1,
      name: 'Green Apple',
      image: '/assets/images/green-apple.png',
      price: 14.99,
      stock: 100,
      status: 'active',
      category: 'Fruits',
    },
    {
      id: 2,
      name: 'Fresh Tomato',
      image: '/assets/images/tomato.png',
      price: 9.99,
      stock: 50,
      status: 'active',
      category: 'Vegetables',
    },
    {
      id: 3,
      name: 'Organic Lettuce',
      image: '/assets/images/green-lettuce.png',
      price: 12.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'Organic',
    },
  ]

  const adminOrders: AdminOrder[] = [
    {
      id: '12345',
      customer: 'John Doe',
      date: '2025-01-15',
      total: 125.99,
      status: 'completed',
      items: 3,
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      date: '2025-01-15',
      total: 89.5,
      status: 'pending',
      items: 2,
    },
    {
      id: '12347',
      customer: 'Mike Johnson',
      date: '2025-01-14',
      total: 234,
      status: 'processing',
      items: 5,
    },
  ]

  const orderStats = {
    total: 1234,
    pending: 45,
    processing: 23,
    completed: 1166,
  }

  type StatusColor
    = | 'error'
      | 'info'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'neutral'

  type OrderStatus = AdminOrder['status']
  type ProductStatus = AdminProduct['status']

  const getStatusColor = (
    status: OrderStatus | ProductStatus | string,
  ): StatusColor => {
    const colorMap: Record<string, StatusColor> = {
      'completed': 'success',
      'pending': 'warning',
      'processing': 'info',
      'cancelled': 'error',
      'active': 'success',
      'inactive': 'neutral',
      'out-of-stock': 'neutral',
    }
    return colorMap[status] || 'neutral'
  }

  return {
    stats,
    recentOrders,
    topProducts,
    adminProducts,
    adminOrders,
    orderStats,
    getStatusColor,
  }
}
