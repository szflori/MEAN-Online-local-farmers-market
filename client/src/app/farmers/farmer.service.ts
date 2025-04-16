import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  private apiUrl = 'http://localhost:3000/app/farmers';

  constructor() {}

  async getFarmers() {
    try {
      const res = await axios.get(this.apiUrl, { withCredentials: true });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Could not load farmers' };
    }
  }
}
