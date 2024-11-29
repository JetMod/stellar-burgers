import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllIngredients,
  initialState,
  ingredientsReducer
} from './ingredientsSlice';
import { TIngredient } from '../utils/types';
import * as api from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients: TIngredient[] = [
  {
    _id: '67425993b27b06001c3ea2f4',
    name: 'Краторный spicy бургер',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  }
];

describe('Ingredients Slice Reducer', () => {
  describe('Initialization', () => {
    it('should return the initial state', () => {
      const state = ingredientsReducer(undefined, { type: '' });
      expect(state).toEqual(initialState);
    });
  });

  describe('fetchAllIngredients action', () => {
    it('should handle pending state', () => {
      const action = { type: fetchAllIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('should handle rejected state', () => {
      const action = { type: fetchAllIngredients.rejected.type };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: false });
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: fetchAllIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        ingredientsList: mockIngredients
      });
    });
  });

  describe('fetchAllIngredients Thunk', () => {
    it('dispatches fulfilled when API call succeeds', async () => {
      (api.getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);

      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ ingredients: initialState }));

      const thunk = fetchAllIngredients();
      await thunk(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith({
        type: fetchAllIngredients.pending.type,
        meta: expect.objectContaining({
          requestId: expect.any(String),
          requestStatus: 'pending'
        })
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: fetchAllIngredients.fulfilled.type,
        payload: mockIngredients,
        meta: expect.objectContaining({
          requestId: expect.any(String),
          requestStatus: 'fulfilled'
        })
      });
    });

    it('dispatches rejected when API call fails', async () => {
      (api.getIngredientsApi as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ ingredients: initialState }));

      const thunk = fetchAllIngredients();
      await thunk(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith({
        type: fetchAllIngredients.pending.type,
        meta: expect.objectContaining({
          requestId: expect.any(String),
          requestStatus: 'pending'
        })
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: fetchAllIngredients.rejected.type,
        error: expect.any(Object),
        meta: expect.objectContaining({
          requestId: expect.any(String),
          requestStatus: 'rejected'
        })
      });
    });
  });
});
