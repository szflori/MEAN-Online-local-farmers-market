import axios from 'axios';

export const API_PATH = {
  salesReport: '/sales-report',
  farmers: '/farmers',
  orders: '/orders',
  products: '/products',
  users: '/users',
};

export const api = axios.create({
  baseURL: 'http://localhost:3333/app',
  withCredentials: true,
});
