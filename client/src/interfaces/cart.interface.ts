export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  farmer: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}
