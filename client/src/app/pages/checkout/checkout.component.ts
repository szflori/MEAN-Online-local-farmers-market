import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { OrderService } from '../../services/order.service';
import { CartState } from '../../../store/cart.state';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ClearCart } from '../../../store/cart.actions';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  user: any = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
    this.auth.checkSession();

    this.form = this.fb.group({
      fullName: [this.user?.name ?? '', Validators.required],
      address: [this.user?.address ?? '', Validators.required],
      phone: [this.user?.phone ?? '', Validators.required],
    });
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const orderData = this.form.value;
        const items = this.store.selectSnapshot(CartState.items);

        const payload = { items, ...orderData };
        await this.orderService.createOne(payload);

        this.store.dispatch(new ClearCart());

        this.router.navigate(['/app/orders']);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
