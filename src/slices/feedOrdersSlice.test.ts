import { getFeedOrders, initialState, feedSlice } from './feedOrdersSlice';

const mockOrdersFeed = {
  success: true,
  orders: [
    {
      _id: '67423fdbb27b06001c3ea2b5',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-11-23T20:49:31.026Z',
      updatedAt: '2024-11-23T20:49:31.926Z',
      number: 60286
    },
    {
      _id: '67425993b27b06001c3ea2f4',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Краторный spicy бургер',
      createdAt: '2024-11-23T22:39:15.832Z',
      updatedAt: '2024-11-23T22:39:16.692Z',
      number: 60288
    }
  ],
  total: 60299,
  totalToday: 255
};

describe('Feed Slice Reducer', () => {
  describe('Initialization', () => {
    it('should return the initial state', () => {
      const state = feedSlice.reducer(undefined, { type: '' });
      expect(state).toEqual(initialState);
    });
  });

  describe('getFeedOrders action', () => {
    it('should handle pending state', () => {
      const action = { type: getFeedOrders.pending.type };
      const state = feedSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('should handle rejected state', () => {
      const action = {
        type: getFeedOrders.rejected.type,
        error: { message: 'Test' }
      };
      const state = feedSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Test'
      });
    });

    it('should handle fulfilled state with data', () => {
      const action = {
        type: getFeedOrders.fulfilled.type,
        payload: mockOrdersFeed
      };
      const state = feedSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orders: mockOrdersFeed.orders,
        total: mockOrdersFeed.total,
        totalToday: mockOrdersFeed.totalToday,
        isLoading: false,
        error: ''
      });
    });
  });
});
