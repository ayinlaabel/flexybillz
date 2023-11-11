import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  email: null,
  phoneNumber: null,
  username: null,
  initialRoute: null,
  firstName: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setInitialRoute: (state, action) => {
      state.initialRoute = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const {
  setUser,
  setEmail,
  setPhoneNumber,
  setUsername,
  setToken,
  setInitialRoute,
  setFirstName,
} = userSlice.actions;

/**
 * Seletors
 * @param {*} state
 * @returns
 */
export const selectUser = (state: any) => state.user.user;
export const selectEmail = (state: any) => state.user.email;
export const selectToken = (state: any) => state.user.token;
export const selectPhoneNumber = (state: any) => state.user.phoneNumber;
export const selectUsername = (state: any) => state.user.username;
export const selectInitialRoute = (state: any) => state.user.initialRoute;
export const selectFirstName = (state: any) => state.user.firstName;

export default userSlice.reducer;
