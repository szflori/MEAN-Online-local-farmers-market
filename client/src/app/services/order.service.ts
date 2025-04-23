import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';

import { api } from '../../services/api';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  placeOrder(orderData: any): Observable<any> {
    return from(
      api
        .post('/orders', orderData, {
          withCredentials: true,
        })
        .then((res) => res.data)
    );
  }

  getMyOrders(): Observable<any[]> {
    return from(api.get('/orders', { withCredentials: true })).pipe(
      map((res) => res.data)
    );
  }

  getOrderById(id: string): Observable<any> {
    return from(
      api.get(`/orders/${id}`, {
        withCredentials: true,
      })
    ).pipe(map((res) => res.data));
  }
}
