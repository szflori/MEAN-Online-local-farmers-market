import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';

import { api } from '../../services/api';
import { ClearCart } from '../../store/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private store: Store) {}

  get currentUser() {
    return this.userSubject.value;
  }

  async register(data: { name: string; email: string; password: string }) {
    try {
      const res = await api.post(`/register`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Network error' };
    }
  }

  async registerFarmer(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const res = await api.post(`/register-farmer`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Network error' };
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const res = await api.post(
        `/login`,
        { username: data.email, password: data.password },
        {
          withCredentials: true,
        }
      );
      this.userSubject.next(res.data.user);

      this.store.dispatch(new ClearCart());

      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Network error' };
    }
  }

  async checkSession() {
    try {
      const res = await api.get(`/check-session`, {
        withCredentials: true,
      });
      this.userSubject.next(res.data);
      return res.data;
    } catch {
      this.userSubject.next(null);
      return null;
    }
  }

  async logout() {
    this.store.dispatch(new ClearCart());

    await api.post(
      `/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    this.userSubject.next(null);
  }

  async updateProfile(payload: any) {
    await api.patch('/profile', payload, {
      withCredentials: true,
    });
  }
}
