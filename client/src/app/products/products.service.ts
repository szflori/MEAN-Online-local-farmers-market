import { Injectable } from '@angular/core';
import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  async getProducts() {
    try {
      const response = await api.get('/products', { withCredentials: true });
      return response.data.map((item: any) => ({ id: item._id, ...item }));
    } catch (err: any) {
      throw err.response?.data || { message: 'Failed to load products' };
    }
  }
}
