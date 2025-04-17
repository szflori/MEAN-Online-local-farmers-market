import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  public items$ = this.itemsSubject.asObservable();

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

   getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  addItem(item: CartItem) {
    const items = [...this.getItems()];
    const index = items.findIndex(p => p.productId === item.productId);
    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  updateQuantity(productId: string, quantity: number) {
    const items = this.getItems().map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  removeItem(productId: string) {
    const items = this.getItems().filter(item => item.productId !== productId);
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  clear() {
    this.itemsSubject.next([]);
    localStorage.removeItem('cart');
  }
}
