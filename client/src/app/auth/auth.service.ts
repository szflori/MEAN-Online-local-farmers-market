import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

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
    await api.post(
      `/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    this.userSubject.next(null);
  }
}
