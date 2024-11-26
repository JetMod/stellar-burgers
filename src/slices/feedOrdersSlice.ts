import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export const getFeedOrders = createAsyncThunk(
  'feedOrders/getAll',
  async () => await getFeedsApi()
);

export interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFeedOrders.fulfilled,
      (
        state,
        action: PayloadAction<{
          orders: TOrder[];
          total: number;
          totalToday: number;
        }>
      ) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    );
  }
});

export const selectFeedOrders = (state: { feed: IFeedState }) =>
  state.feed.orders;
export const selectTotalFeedOrders = (state: { feed: IFeedState }) =>
  state.feed.total;
export const selectTotalTodayFeedOrders = (state: { feed: IFeedState }) =>
  state.feed.totalToday;
export const feedReducers = feedSlice.reducer;
