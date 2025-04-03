import { Component, EventEmitter, Output } from '@angular/core';
import { CartItem } from '../cart-dropdown/cart-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  cartItems: CartItem[] = [
    { name: 'Alma', quantity: 2, price: 250 },
    { name: 'Méz', quantity: 1, price: 1800 },
  ];
}
