import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type NicknameState = {
  nickname: string | undefined;
};

const initialState: NicknameState = {
  nickname: undefined,
};

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { save } = nicknameSlice.actions;

export const selectNickname = (state: RootState) => state.nickname.nickname;

export default nicknameSlice.reducer;
