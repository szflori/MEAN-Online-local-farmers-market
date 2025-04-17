import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddItem, RemoveItem, UpdateQuantity, ClearCart } from './cart.actions';
import { CartItem } from '../interfaces/cart.interface';

export interface CartStateModel {
  items: CartItem[];
}

// TODO guest localstore, bejelentkezsnél clear, 
@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
export class CartState {
  @Selector()
  static items(state: CartStateModel): CartItem[] {
    return state.items;
  }

  @Selector()
  static total(state: CartStateModel): number {
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  @Selector()
  static itemCount(state: CartStateModel): number {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }

  @Action(AddItem)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddItem
  ) {
    const state = getState();
    const items = [...state.items];
    const existing = items.find((i) => i.productId === payload.productId);
    if (existing) {
      existing.quantity += payload.quantity;
    } else {
      items.push(payload);
    }
    patchState({ items });
  }

  @Action(RemoveItem)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { productId }: RemoveItem
  ) {
    patchState({
      items: getState().items.filter((i) => i.productId !== productId),
    });
  }

  @Action(UpdateQuantity)
  update(
    { getState, patchState }: StateContext<CartStateModel>,
    { productId, quantity }: UpdateQuantity
  ) {
    const items = getState().items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    patchState({ items });
  }

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({ items: [] });
  }
}
