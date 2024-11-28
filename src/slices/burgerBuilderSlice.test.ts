import {
  addIngredient,
  removeIngredient,
  moveIngredientBack,
  moveIngredientForward,
  resetBuilder,
  burgerBuilderReducer
} from './burgerBuilderSlice';
import { TIngredient } from '../utils/types';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actual,
    nanoid: jest.fn(() => 'test-id')
  };
});

describe('burgerBuilderSlice tests', () => {
  const initialState = {
    items: {
      bun: null,
      ingredients: []
    }
  };

  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'test.jpg',
    image_mobile: 'test_mobile.jpg',
    image_large: 'test_large.jpg'
  };

  const mockBun: TIngredient = {
    _id: '2',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'bun.jpg',
    image_mobile: 'bun_mobile.jpg',
    image_large: 'bun_large.jpg'
  };

  it('should add an ingredient (filling)', () => {
    const newState = burgerBuilderReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(newState.items.ingredients).toHaveLength(1);
    expect(newState.items.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: 'test-id'
    });
  });

  it('should add a bun', () => {
    const newState = burgerBuilderReducer(initialState, addIngredient(mockBun));
    expect(newState.items.bun).toMatchObject({ ...mockBun, id: 'test-id' });
  });

  it('should remove an ingredient', () => {
    const state = {
      items: {
        bun: null,
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      }
    };
    const newState = burgerBuilderReducer(state, removeIngredient('test-id'));
    expect(newState.items.ingredients).toHaveLength(0);
  });

  it('should move ingredient back', () => {
    const state = {
      items: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: '1' },
          { ...mockIngredient, id: '2' }
        ]
      }
    };
    const newState = burgerBuilderReducer(state, moveIngredientBack(0));
    expect(newState.items.ingredients.map((ing) => ing.id)).toEqual(['2', '1']);
  });

  it('should move ingredient forward', () => {
    const state = {
      items: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: '1' },
          { ...mockIngredient, id: '2' }
        ]
      }
    };
    const newState = burgerBuilderReducer(state, moveIngredientForward(1));
    expect(newState.items.ingredients.map((ing) => ing.id)).toEqual(['2', '1']);
  });

  it('should reset builder', () => {
    const state = {
      items: {
        bun: { ...mockBun, id: 'test-id' },
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      }
    };
    const newState = burgerBuilderReducer(state, resetBuilder());
    expect(newState.items).toEqual(initialState.items);
  });
});
