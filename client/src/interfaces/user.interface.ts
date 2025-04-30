export interface User {
  name: string;
  email: string;
  role: 'USER' | 'FARMER' | 'ADMIN';
  address?: string;
  bio: string;
  avatarUrl: String;
  createdAt: Date;
}
