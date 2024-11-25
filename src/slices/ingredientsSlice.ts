import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export const fetchAllIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

export interface IngredientsState {
  isLoading: boolean;
  ingredientsList: TIngredient[];
  currentIngredient: TIngredient | null;
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredientsList: [],
  currentIngredient: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        fetchAllIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredientsList = action.payload;
        }
      );
  }
});

export const selectIngredientsList = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.ingredientsList;

export const selectLoadingStatus = (state: { ingredients: IngredientsState }) =>
  state.ingredients.isLoading;

export const ingredientsReducer = ingredientsSlice.reducer;
