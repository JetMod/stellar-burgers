import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';

export interface IBurgerBuilderState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IBurgerBuilderState = {
  items: {
    bun: null,
    ingredients: []
  }
};

const burgerBuilderSlice = createSlice({
  name: 'burgerBuilder',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.items.bun = ingredient;
        } else {
          state.items.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientBack: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.items.ingredients.length - 1) {
        const ingredient = state.items.ingredients.splice(index, 1)[0];
        state.items.ingredients.splice(index + 1, 0, ingredient);
      }
    },
    moveIngredientForward: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.items.ingredients.splice(index, 1)[0];
        state.items.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    resetBuilder: (state) => {
      state.items = initialState.items;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientBack,
  moveIngredientForward,
  resetBuilder
} = burgerBuilderSlice.actions;

export const burgerBuilderReducer = burgerBuilderSlice.reducer;
export const selectBuilderItems = (state: {
  burgerBuilder: IBurgerBuilderState;
}) => state.burgerBuilder.items;
