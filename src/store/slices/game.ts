import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type GameState = {
  clickedLetters: string[];
  correctLetters: number;
  incorrectLetters: number;
  endOfGame: 'win' | 'loss' | undefined;
};

const initialState: GameState = {
  clickedLetters: [],
  correctLetters: 0,
  incorrectLetters: 0,
  endOfGame: undefined,
};

const gameSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.clickedLetters.push(action.payload);
    },
    refresh: (state, action: PayloadAction<boolean>) => ({
      ...initialState,
      ...(action.payload && { endOfGame: state.endOfGame }),
    }),
    correct: (state) => {
      state.correctLetters++;
    },
    incorrect: (state) => {
      state.incorrectLetters++;
    },
    finishGame: (state, action: PayloadAction<'win' | 'loss' | undefined>) => {
      state.endOfGame = action.payload;
    },
  },
});

export const { add, refresh, correct, incorrect, finishGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.clickedLetters;

export default gameSlice.reducer;
