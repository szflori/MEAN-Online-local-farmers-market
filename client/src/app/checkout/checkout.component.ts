import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { OrderService } from '../services/order.service';
import { CartState } from '../../store/cart.state';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const orderData = this.form.value;

      // elküldjük a backendnek az NGXS store-ból a kosarat
      const items = this.store.selectSnapshot(CartState.items);
    }
  }
}
