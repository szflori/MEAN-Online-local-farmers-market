import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartItem } from '../../../../interfaces/cart.interface';
import { AddItem } from '../../../../store/cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: any;
  @Input({ required: true }) isAuthed!: boolean;

  constructor(private store: Store) {}

  get isVisible(): boolean {
    return this.isAuthed;
  }

  addToCart() {
    const item: CartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      imageUrl: this.product.imageUrl,
      farmer: this.product.farmer,
    };

    this.store.dispatch(new AddItem(item));
  }
}
