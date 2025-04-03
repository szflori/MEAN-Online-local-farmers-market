import { Component } from '@angular/core';
import { CartItem } from '../cart-dropdown/cart-dropdown.component';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [
    { name: 'Bio Alma', quantity: 2, price: 250 },
    { name: 'Házi Méz', quantity: 1, price: 1800 },
  ];

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}
