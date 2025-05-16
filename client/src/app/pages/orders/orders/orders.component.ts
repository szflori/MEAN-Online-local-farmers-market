import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = [
    'orderNumber',
    'createdAt',
    'status',
    'total',
    'farmer',
  ];
  loading = true;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.orders = await this.orderService.getList();
    try {
    } catch (err: any) {
      this.error = err.message || 'Failed to load orders';
    } finally {
      this.loading = false;
    }
  }
}
