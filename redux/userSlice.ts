// userSlice.ts

import { IUserState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserStateStore {
  allUser: IUserState[];
}

const initialState: IUserStateStore = {
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<IUserState>) {
      state.allUser = [
        ...state.allUser,
        { name: action.payload.name, score: action.payload.score },
      ];
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
