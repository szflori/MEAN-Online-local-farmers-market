import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveItem, UpdateQuantity } from '../../../../store/cart.actions';
import { CartItemProps } from '../../../../store/cart.state';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: CartItemProps;
  @Input() compact: boolean = false;

  constructor(private store: Store) {}

  increase(id: string, quantity: number) {
    this.store.dispatch(new UpdateQuantity(this.item.id, id, quantity + 1));
  }

  decrease(id: string, quantity: number) {
    if (quantity > 1) {
      this.store.dispatch(new UpdateQuantity(this.item.id, id, quantity - 1));
    }
  }

  remove(id: string) {
    this.store.dispatch(new RemoveItem(this.item.id, id));
  }
}
