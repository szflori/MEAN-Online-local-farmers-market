import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/app/products';

  constructor() {}

  async getProducts() {
    try {
      const response = await axios.get(this.apiUrl, { withCredentials: true });
      return response.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Failed to load products' };
    }
  }
}
