import { Component, Input } from '@angular/core';

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart-dropdown',
  standalone: false,
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
})
export class CartDropdownComponent {
  @Input() cartItems: CartItem[] = [];

  get totalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
