import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type ScoreType = {
  id: number;
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
};

export const getScores = createAsyncThunk('scores', async () => {
  const response = await axios.get<ScoreType>(
    'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'
  );
  return { ...response.data };
});

export type ScoreState = {
  data: ScoreType | undefined;
  pending: boolean;
  error: boolean;
};

const initialState: ScoreState = {
  data: undefined,
  pending: false,
  error: false,
};

export const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScores.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getScores.fulfilled, (state, action) => {
      state.data = action.payload;
      state.pending = false;
    });
    builder.addCase(getScores.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const selectScores = (state: RootState) => state.scores;

export const scoresSelect = createSelector(selectScores, (state) => state);

export default scoresSlice.reducer;
