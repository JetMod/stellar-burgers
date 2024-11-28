import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import {
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '../utils/burger-api';

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => await getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number) => {
    const { orders } = await getOrderByNumberApi(number);
    return orders;
  }
);

export const createBurgerOrder = createAsyncThunk(
  'orders/createBurgerOrder',
  async (ingredients: string[]) => {
    const orderResponse = await orderBurgerApi(ingredients);
    return orderResponse;
  }
);

export interface OrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  isOrderRequestPending: boolean;
  modalOrderData: TOrder | null;
}

export const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isOrderRequestPending: false,
  modalOrderData: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearModalAfterOrder: (state) => {
      state.modalOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isOrderRequestPending = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isOrderRequestPending = false;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.isOrderRequestPending = false;
      })
      .addCase(createBurgerOrder.pending, (state) => {
        state.isOrderRequestPending = true;
      })
      .addCase(createBurgerOrder.rejected, (state) => {
        state.isOrderRequestPending = false;
      })
      .addCase(
        createBurgerOrder.fulfilled,
        (state, action: PayloadAction<{ order: TOrder }>) => {
          state.isOrderRequestPending = false;
          state.modalOrderData = action.payload.order;
        }
      )
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.currentOrder = action.payload[0] || null;
        }
      );
  }
});

export const { clearModalAfterOrder } = ordersSlice.actions;
export const selectAllOrders = (state: { orders: OrdersState }) =>
  state.orders.orders;
export const selectIsOrderRequestPending = (state: { orders: OrdersState }) =>
  state.orders.isOrderRequestPending;
export const selectModalOrderData = (state: { orders: OrdersState }) =>
  state.orders.modalOrderData;
export const selectCurrentOrder = (state: { orders: OrdersState }) =>
  state.orders.currentOrder;
export const ordersReducer = ordersSlice.reducer;
