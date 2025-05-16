import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddItem, RemoveItem, UpdateQuantity, ClearCart } from './cart.actions';
import { CartItem } from '../interfaces/cart.interface';

export interface CartItemProps {
  id: string;
  name: string;
  avatarUrl: string;
  items: CartItem[];
  total: number;
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
    return state.farmers.reduce((sum, item) => sum + item.total, 0);
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

      existingFarmer.total = existingFarmer.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    } else {
      const items = [payload];
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      farmers.push({
        id: payload.farmer.id,
        name: payload.farmer.name,
        avatarUrl: payload.farmer.avatarUrl,
        items,
        total,
      });
    }

    patchState({ farmers });
  }

  @Action(RemoveItem)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { farmerId, productId }: RemoveItem
  ) {
    const updatedFarmers = getState()
      .farmers.map((farmer) => {
        if (farmer.id === farmerId) {
          const newItems = farmer.items.filter(
            (item) => item.productId !== productId
          );
          if (newItems.length === 0) {
            return null;
          }
          return { ...farmer, items: newItems };
        }

        return farmer;
      })
      .filter((f): f is CartItemProps => f !== null);

    patchState({
      farmers: updatedFarmers,
    });
  }

  @Action(UpdateQuantity)
  update(
    { getState, patchState }: StateContext<CartStateModel>,
    { farmerId, productId, quantity }: UpdateQuantity
  ) {
    const updatedFarmers = getState()
      .farmers.map((farmer) => {
        if (farmer.id === farmerId) {
          const newItems = farmer.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0);

          if (newItems.length === 0) {
            return null;
          }

          return { ...farmer, items: newItems };
        }
        return farmer;
      })
      .filter((f): f is CartItemProps => f !== null);

    patchState({ farmers: updatedFarmers });
  }

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({ farmers: [] });
  }
}
