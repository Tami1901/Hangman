import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type LettersState = {
  clickedLetters: string[];
  correctLetters: number;
  incorrectLetters: number;
};

const initialState: LettersState = {
  clickedLetters: [],
  correctLetters: 0,
  incorrectLetters: 0,
};

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.clickedLetters.push(action.payload);
    },
    refresh: () => initialState,
    correct: (state) => {
      state.correctLetters++;
    },
    incorrect: (state) => {
      state.incorrectLetters++;
    },
  },
});

export const { add, refresh, correct, incorrect } = lettersSlice.actions;

export const selectLetters = (state: RootState) => state.clickedLetters.clickedLetters;

export default lettersSlice.reducer;
