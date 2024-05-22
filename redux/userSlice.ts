// userSlice.ts

import { ILeaderboardRank } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILeaderboardRankStore {
  allUser: ILeaderboardRank[];
}

const initialState: ILeaderboardRankStore = {
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<ILeaderboardRank>) {
      state.allUser = [
        ...state.allUser,
        { name: action.payload.name, score: action.payload.score },
      ];
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
