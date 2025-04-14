import axios from 'axios';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/app'; //TODO env
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  get currentUser() {
    return this.userSubject.value;
  }

  async register(data: { name: string; email: string; password: string }) {
    try {
      const res = await axios.post(`${this.apiUrl}/register`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || { message: 'Network error' };
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const res = await axios.post(
        `${this.apiUrl}/login`,
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
      const res = await axios.get(`${this.apiUrl}/check-session`, {
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
    await axios.post(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    this.userSubject.next(null);
  }
}
