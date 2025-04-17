import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartItem } from '../../../interfaces/cart.interface';
import { AddItem } from '../../../store/cart.actions';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input()
  product!: Product;

  constructor(private store: Store) {}

  addToCart() {
    const item: CartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      imageUrl: this.product.imageUrl,
    };

    console.log('ADDED');

    this.store.dispatch(new AddItem(item));
  }
}
