import { type OrderType } from '../utils/sharedTypes';

export const discountedOrder = (orders: OrderType[], value: number) => {
  return orders.map(order => ({
    ...order,
    price: {
      ...order.price,
      priceItem: order.price.priceItem*(100-value)/100,
    },
  }));
};