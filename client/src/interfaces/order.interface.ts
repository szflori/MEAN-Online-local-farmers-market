export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
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
