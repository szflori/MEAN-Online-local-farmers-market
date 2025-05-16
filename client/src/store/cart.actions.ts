import { CartItem } from '../interfaces/cart.interface';

export class AddItem {
  static readonly type = '[Cart] Add Item';
  constructor(public payload: CartItem) {}
}

export class RemoveItem {
  static readonly type = '[Cart] Remove Item';
  constructor(public farmerId: string, public productId: string) {}
}

export class UpdateQuantity {
  static readonly type = '[Cart] Update Quantity';
  constructor(public farmerId: string, public productId: string, public quantity: number) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear';
}
