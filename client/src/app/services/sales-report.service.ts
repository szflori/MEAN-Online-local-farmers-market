import { Injectable } from '@angular/core';
import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class SalesReportService {
  constructor() {}

  async getList(options: Record<string, any> = {}) {
    try {
      const { data } = await api.get('/sales-report', { params: options });
      return data;
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to load list` };
    }
  }
}
