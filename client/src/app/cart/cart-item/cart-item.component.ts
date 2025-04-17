import { Component, Input } from '@angular/core';
import { CartItem } from '../../../interfaces/cart.interface';
import { Store } from '@ngxs/store';
import { RemoveItem, UpdateQuantity } from '../../../store/cart.actions';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Input() compact: boolean = false;

  constructor(private store: Store) {}

  increase() {
    this.store.dispatch(
      new UpdateQuantity(this.item.productId, this.item.quantity + 1)
    );
  }

  decrease() {
    if (this.item.quantity > 1) {
      this.store.dispatch(
        new UpdateQuantity(this.item.productId, this.item.quantity - 1)
      );
    }
  }

  remove() {
    this.store.dispatch(new RemoveItem(this.item.productId));
  }
}
