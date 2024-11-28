import { RootState } from './store';

export const selectOrderById = (number: number) => (state: RootState) => {
  if (state.feed.orders.length || state.orders.orders.length) {
    return (
      state.feed.orders.find((order) => order.number === number) ||
      state.orders.orders.find((order) => order.number === number)
    );
  }

  if (state.feed.modalOrder) {
    return state.feed.modalOrder.number === number
      ? state.feed.modalOrder
      : null;
  }

  return null;
};
