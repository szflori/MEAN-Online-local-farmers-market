import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddItem, RemoveItem, UpdateQuantity, ClearCart } from './cart.actions';
import { CartItem } from '../interfaces/cart.interface';

export interface CartItemProps {
  id: string;
  name: string;
  avatarUrl: string;
  items: CartItem[];
}

export interface CartStateModel {
  farmers: CartItemProps[] | [];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: { farmers: [] },
})
export class CartState {
  @Selector()
  static items(state: CartStateModel): CartItemProps[] {
    return state.farmers;
  }

  @Selector()
  static total(state: CartStateModel): number {
    /* return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ); */
    return 0;
  }

  @Selector()
  static itemCount(state: CartStateModel): number {
    return state.farmers.reduce(
      (total, item) =>
        total +
        item.items.reduce((ptotal, product) => ptotal + product.quantity, 0),
      0
    );
  }

  @Action(AddItem)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddItem
  ) {
    const state = getState();
    const farmers = [...state.farmers];

    const existingFarmer = farmers.find((i) => i.id === payload.farmer.id);

    if (existingFarmer) {
      const existing = existingFarmer.items.find(
        (i) => i.productId === payload.productId
      );

      if (existing) {
        existing.quantity += payload.quantity;
      } else {
        existingFarmer.items.push(payload);
      }
    } else {
      farmers.push({
        id: payload.farmer.id,
        name: payload.farmer.name,
        avatarUrl: payload.farmer.avatarUrl,
        items: [payload],
      });
    }

    patchState({ farmers });
  }

  @Action(RemoveItem)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { productId }: RemoveItem
  ) {
    patchState({
      farmers: getState().farmers,
    });
  }

  @Action(UpdateQuantity)
  update(
    { getState, patchState }: StateContext<CartStateModel>,
    { productId, quantity }: UpdateQuantity
  ) {
    /* const items = getState().items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    ); */
    patchState({});
  }

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({});
  }
}
