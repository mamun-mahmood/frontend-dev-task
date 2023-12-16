import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  status: object;
}

const initialState: IUserState = {
  id: 0,
  name: "John Doe",
  email: "",
  first_name: "",
  last_name: "",
  avatar: "",
  status: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, first_name, last_name, avatar } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.first_name = first_name;
      state.last_name = last_name;
      state.avatar = avatar;
    },
    clearUser: (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.avatar = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: { user: IUserState }) => state.user;
export default userSlice.reducer;
