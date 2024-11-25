// combinedFeedOrdersSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TIngredient } from '../utils/types';
import { getOrdersAndIngredientsApi } from '../utils/burger-api';

export const getCombinedOrdersAndIngredients = createAsyncThunk(
  'feedOrders/getCombined',
  async () => await getOrdersAndIngredientsApi()
);
