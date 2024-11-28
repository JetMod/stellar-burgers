import {
  authenticateUser,
  saveUser,
  initialState,
  signOutUser,
  modifyUser,
  setAuthChecked,
  userSlice
} from './authSlice';

import { setCookie, deleteCookie, getCookie } from '../utils/cookie';
import { loginUserApi } from '../utils/burger-api';

jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn()
}));

jest.mock('../utils/burger-api', () => ({
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

describe('tests for user slice', () => {
  test('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('test setAuthChecked', () => {
    const state = userSlice.reducer(initialState, setAuthChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  test('test saveUser', () => {
    const state = userSlice.reducer(
      initialState,
      saveUser({ email: 'email@ya.ru', name: 'Name' })
    );
    expect(state).toEqual({
      ...initialState,
      userInfo: { email: 'email@ya.ru', name: 'Name' }
    });
  });

  describe('test authenticateUser', () => {
    test('test authenticateUser pending', () => {
      const action = { type: authenticateUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, errorMessage: '' });
    });

    test('test authenticateUser rejected', () => {
      const action = {
        type: authenticateUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        errorMessage: 'Ошибка при логировании: Test'
      });
    });

    test('test authenticateUser fulfilled', () => {
      (loginUserApi as jest.Mock).mockResolvedValue({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        user: { email: 'email@ya.ru', name: 'Name' }
      });

      const action = {
        type: authenticateUser.fulfilled.type,
        payload: { email: 'email@ya.ru', name: 'Name' }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: { email: 'email@ya.ru', name: 'Name' },
        errorMessage: ''
      });
    });
  });

  describe('test modifyUser', () => {
    test('test modifyUser fulfilled', () => {
      const action = {
        type: modifyUser.fulfilled.type,
        payload: { email: 'z@ya.ru', name: 'Bob' }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: { email: 'z@ya.ru', name: 'Bob' },
        errorMessage: ''
      });
    });
  });

  describe('test signOutUser', () => {
    test('test signOutUser fulfilled', () => {
      const action = { type: signOutUser.fulfilled.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userInfo: null,
        errorMessage: ''
      });
    });
  });
});
