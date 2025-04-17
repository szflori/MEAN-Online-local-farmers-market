import { Injectable } from '@angular/core';
import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  async getFarmers() {
    try {
      const res = await api.get('/farmers', { withCredentials: true });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Could not load farmers' };
    }
  }
}
