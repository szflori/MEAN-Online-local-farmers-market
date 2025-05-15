import { Inject, Injectable } from '@angular/core';
import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  constructor(@Inject('resourcePath') private resourcePath: string) {}

  async createOne(body: Partial<T>): Promise<T & { id: string }> {
    try {
      const { data } = await api.post(this.resourcePath, body);
      return { id: data._id, ...data };
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to create item` };
    }
  }

  async getList(): Promise<(T & { id: string })[]> {
    try {
      const { data } = await api.get(this.resourcePath);
      return data.map((item: any) => ({ id: item._id, ...item }));
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to load list` };
    }
  }

  async getOne<T>(id: string): Promise<T & { id: string }> {
    try {
      const { data } = await api.get<T & { _id: string }>(
        `${this.resourcePath}/${id}`
      );
      return { id: data._id, ...data };
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to load item` };
    }
  }

  async updateOne(id: string, body: Partial<T>): Promise<T & { id: string }> {
    try {
      const { data } = await api.patch(`${this.resourcePath}/${id}`, body);
      return { id: data._id, ...data };
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to update item` };
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await api.delete(`${this.resourcePath}/${id}`);
    } catch (err: any) {
      throw err.response?.data || { message: `Failed to delete item` };
    }
  }
}
