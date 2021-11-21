import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ScoreType } from './scores';

const initialState: ScoreType[] = [];

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<ScoreType>) => {
      state.push(action.payload);
    },
  },
});

export const { save } = gamesSlice.actions;

export const selectGames = (state: RootState) => state.games;

export default gamesSlice.reducer;
