import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import {
  loginUserApi,
  getUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi
} from '../utils/burger-api';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const modifyUser = createAsyncThunk(
  'user/modifyUser',
  async (userData: { email?: string; name?: string; password?: string }) => {
    const response = await updateUserApi(userData);
    return {
      email: response.user.email,
      name: response.user.name
    };
  }
);

export const verifyUserAuth = createAsyncThunk(
  'user/verifyUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      const response = await getUserApi();
      dispatch(saveUser(response.user));
    }
    dispatch(setAuthChecked());
  }
);

export const signOutUser = createAsyncThunk('user/signOutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
});

interface UserState {
  isAuthChecked: boolean;
  userInfo: TUser | null;
  errorMessage: string;
}

export const initialState: UserState = {
  isAuthChecked: false,
  userInfo: null,
  errorMessage: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    saveUser: (state, action: PayloadAction<TUser | null>) => {
      state.userInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.errorMessage = `Ошибка при логировании: ${action.error.message}`;
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.errorMessage = '';
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.userInfo = null;
      });
  }
});

export const { setAuthChecked, saveUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const selectUserData = (state: { user: UserState }) =>
  state.user.userInfo;
export const selectAuthCheckedStatus = (state: { user: UserState }) =>
  state.user.isAuthChecked;
export const selectErrorMessage = (state: { user: UserState }) =>
  state.user.errorMessage;
