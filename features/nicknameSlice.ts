import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type NicknameState = {
  nn: string;
};

const initialState: NicknameState = {
  nn: '',
};

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<string>) => {
      state.nn = action.payload;
    },
  },
});

export const { save } = nicknameSlice.actions;

export const selectNickname = (state: RootState) => state.nickname.nn;

export default nicknameSlice.reducer;
