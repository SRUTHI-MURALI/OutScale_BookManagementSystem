import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectStudent = (state) => state.user.user;

export default userSlice.reducer;
