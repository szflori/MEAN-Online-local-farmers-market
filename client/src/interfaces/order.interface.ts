export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  productId: string;
  name: string;
  category: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  farmer: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  address: string;
  phone: string;
  createdAt: Date;
}
