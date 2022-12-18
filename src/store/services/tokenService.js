import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenValue: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    created(state, action) {
      // if (!state.userId) {
      //     localStorage.setItem('token', action.payload.accessToken);
      //     localStorage.setItem('userId', action.payload.user.id);
      //
      //     state.tokenValue = action.payload.accessToken;
      //     state.userId = action.payload.user.id;
      // } else {
      //     localStorage.setItem('token', action.payload.accessToken);
      //     state.tokenValue = action.payload.accessToken;
      // }

      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.user.id);
      localStorage.setItem("role", action.payload.user.role);

      state.tokenValue = action.payload.accessToken;
      state.userId = action.payload.user.id;
      state.role = action.payload.user.role;
    },
    removed(state) {
      localStorage.removeItem("token");

      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      state.tokenValue = null;
    },
  },
});

const { actions, reducer: tokenReducer } = authSlice;
const { created, removed } = actions;

export const createToken = (data) => (dispatch) => {
  dispatch(created(data));
};
export const removeToken = () => (dispatch) => {
  dispatch(removed());
};

export const getToken = () => (state) => state.token.tokenValue;
export const getUser = () => (state) => state.token.userId;
export const getRole = () => (state) => state.token.role;

export default tokenReducer;
