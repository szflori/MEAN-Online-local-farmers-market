export interface Product {
  id: string;
  name: string;
  farmer: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  category: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}
