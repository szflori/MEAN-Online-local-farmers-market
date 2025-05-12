import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../../interfaces/order.interface';

@Component({
  selector: 'app-orders-mgmt',
  standalone: false,
  templateUrl: './orders-mgmt.component.html',
  styleUrl: './orders-mgmt.component.scss',
})
export class OrdersMgmtComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = [
    'user',
    'farmer',
    'status',
    'total',
    'createdAt',
  ];

  loading = true;
  error: string | null = null;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    this.orders = await this.orderService.getList();
    try {
    } catch (err: any) {
      this.error = err.message || 'Failed to load orders';
    } finally {
      this.loading = false;
    }
  }
}
