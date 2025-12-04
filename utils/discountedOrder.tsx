import { type OrderType } from '../utils/sharedTypes';

export const discountedOrder = (orders: OrderType[], value: number) => {
  return orders.map(order => ({
    ...order,
    price: {
      ...order.price,
      priceItem: Math.round(order.price.priceItem * (1 - value)),
    },
  }));
};