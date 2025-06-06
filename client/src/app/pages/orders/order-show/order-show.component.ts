import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order } from '../../../../interfaces/order.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order-show',
  standalone: false,
  templateUrl: './order-show.component.html',
  styleUrl: './order-show.component.scss',
})
export class OrderShowComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;
  order: Order | null = null;
  form!: FormGroup;
  loading = true;
  error: string | null = null;
  editMode = false;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadOrder(id);

    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.auth.checkSession();
  }

  get isUser() {
    return this.user?.role === 'USER';
  }

  async loadOrder(id: string) {
    try {
      this.order = await this.orderService.getOne(id);
    } catch (e: any) {
      this.error = e.message || 'Failed to load order';
    } finally {
      this.loading = false;
    }
  }

  editProduct() {
    if (this.order?.status !== 'COMPL%ETED') {
      this.router.navigate(['/management/orders', this.order?.id, 'edit']);
    } else {
      alert('Order is completed');
    }
  }

  async deleteProduct() {
    if (!this.order) return;

    const confirmed = confirm(
      `Biztosan törölni szeretnéd ${this.order.orderNumber} rendelést?`
    );
    if (!confirmed) return;

    try {
      await this.orderService.deleteOne(this.order.id);
      this.router.navigate([`/${this.isUser ? 'app' : 'management'}/orders`]);
    } catch (err: any) {
      alert(err.message || 'A törlés nem sikerült');
    }
  }
}
