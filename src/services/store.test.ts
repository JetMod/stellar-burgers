import { rootReducer } from './store';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { feedSlice } from '../slices/feedOrdersSlice';
import { burgerBuilderReducer } from '../slices/burgerBuilderSlice';
import { ordersReducer } from '../slices/ordersSlice';
import { userReducer } from '../slices/authSlice';

describe('проверка rootReducer', () => {
  it('returns the initial state on an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, action),
      feed: feedSlice.reducer(undefined, action),
      burgerBuilder: burgerBuilderReducer(undefined, action),
      user: userReducer(undefined, action),
      orders: ordersReducer(undefined, action)
    });
  });
});
