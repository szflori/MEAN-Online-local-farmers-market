import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { CartState } from '../../../store/cart.state';
import { CartItem } from '../../../interfaces/cart.interface';

@Component({
  selector: 'app-cart-dropdown',
  standalone: false,
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
})
export class CartDropdownComponent {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;
  cartItemCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartState.items);
    this.totalPrice$ = this.store.select(CartState.total);
    this.cartItemCount$ = this.store.select(CartState.itemCount);
  }
}
