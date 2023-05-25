import { configureStore, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const userSlice = createSlice({
  name: 'user',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    changeUsername: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { login, logout, changeUsername } = userSlice.actions;

export { login, logout, changeUsername };

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
