import {
  fetchOrders,
  fetchOrderByNumber,
  createBurgerOrder,
  initialState,
  ordersReducer
} from './ordersSlice';

const mockOrders = [
  {
    _id: '67423fdbb27b06001c3ea2b5',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-11-23T22:39:15.832Z',
    updatedAt: '2024-11-23T22:39:16.692Z',
    number: 60288
  },
  {
    _id: '67425993b27b06001c3ea2f4',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентная булка R2-D3',
    createdAt: '2024-11-23T22:39:15.832Z',
    updatedAt: '2024-11-23T22:39:16.692Z',
    number: 60289
  }
];

const mockOrder = {
  _id: '667be890856777001bb1ddd9',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
  owner: '667be7001bb102e856778ddd',
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2024-11-23T22:39:16.692Z',
  updatedAt: '2024-11-23T22:39:16.692Z',
  number: 60295
};

const mockOrderBurger = {
  success: true,
  name: 'Флюоресцентный минеральный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Краторный био-марсианский бургер',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ],
    _id: '667be8908545455242524',
    owner: {
      name: 'prost',
      email: 'enver027@yandex.ru',
      createdAt: '2024-11-23T22:39:16.692Z',
      updatedAt: '2024-11-23T22:39:16.692Z'
    },
    status: 'done',
    name: 'Флюоресцентный минеральный бургер',
    createdAt: '2024-11-23T22:39:16.692Z',
    updatedAt: '2024-11-23T22:39:16.692Z',
    number: 60296,
    price: 2225
  }
};

const createTestState = (additionalState = {}) => ({
  ...initialState,
  ...additionalState
});

describe('Orders Slice Reducer', () => {
  it('should return the initial state', () => {
    const state = ordersReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('fetchOrders action', () => {
    it('should handle pending state', () => {
      const action = { type: fetchOrders.pending.type };
      const state = ordersReducer(initialState, action);
      expect(state).toEqual(createTestState({ isOrderRequestPending: true }));
    });

    it('should handle fulfilled state', () => {
      const action = { type: fetchOrders.fulfilled.type, payload: mockOrders };
      const state = ordersReducer(initialState, action);
      expect(state).toEqual(createTestState({ orders: mockOrders }));
    });
  });

  describe('fetchOrderByNumber action', () => {
    it('should handle fulfilled state', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: [mockOrder]
      };
      const state = ordersReducer(initialState, action);
      expect(state).toEqual(createTestState({ currentOrder: mockOrder }));
    });
  });

  describe('createBurgerOrder action', () => {
    it('should handle fulfilled state', () => {
      const action = {
        type: createBurgerOrder.fulfilled.type,
        payload: mockOrderBurger
      };
      const state = ordersReducer(initialState, action);
      expect(state).toEqual(
        createTestState({ modalOrderData: mockOrderBurger.order })
      );
    });
  });
});
