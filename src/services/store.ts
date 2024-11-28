import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { burgerBuilderReducer } from '../slices/burgerBuilderSlice';
import { userReducer } from '../slices/authSlice';
import { ordersReducer } from '../slices/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { feedSlice } from '../slices/feedOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedSlice.reducer,
  burgerBuilder: burgerBuilderReducer,
  user: userReducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
