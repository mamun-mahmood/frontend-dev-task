import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  status: object;
  isLoggedIn: boolean;
  token: string;
}

const initialState: IUserState = {
  id: 2,
  name: "",
  email: "",
  first_name: "",
  last_name: "",
  avatar: "",
  status: {},
  isLoggedIn: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, first_name, last_name, avatar, token } = action.payload;
      state.id = id;
      state.name = name || state.name;
      state.email = email || state.email;
      state.first_name = first_name || state.first_name;
      state.last_name =  last_name || state.last_name;
      state.avatar =  avatar || state.avatar;
      state.isLoggedIn = true;
      state.token = token || state.token;
    },
    clearUser: (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.avatar = "";
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: { user: IUserState }) => state.user;
export default userSlice.reducer;
