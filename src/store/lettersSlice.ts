import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type LettersState = {
  clickedLetters: string[];
};

const initialState: LettersState = {
  clickedLetters: [],
};

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.clickedLetters.push(action.payload);
    },
    refresh: () => initialState,
  },
});

export const { add, refresh } = lettersSlice.actions;

export const selectLetters = (state: RootState) => state.clickedLetters.clickedLetters;

export default lettersSlice.reducer;
