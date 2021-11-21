import axios from 'axios';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { alphabet } from '../../constants/alphabet';
import { RootState } from '../store';

type QuoteType = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
};

export const getQuote = createAsyncThunk('quote', async () => {
  let response = await axios.get<QuoteType>('https://api.quotable.io/random');

  for (let i = 0; i < 2; i++) {
    if (response.data.content.length < 60) break;

    const tmpResponse = await axios.get<QuoteType>('https://api.quotable.io/random');
    if (tmpResponse.data.content.length < response.data.content.length) response = tmpResponse;
  }

  return { ...response.data, content: response.data.content.toUpperCase() };
});

export type QuoteState = {
  api: {
    data: QuoteType | undefined;
    pending: boolean;
    error: boolean;
  };
  uniqueCharacters: string[];
};

const initialState: QuoteState = {
  api: { data: undefined, pending: false, error: false },
  uniqueCharacters: [],
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuote.pending, (state) => {
      state.api.pending = true;
      state.api.error = false;
    });
    builder.addCase(getQuote.fulfilled, (state, action) => {
      state.api.data = action.payload;
      state.uniqueCharacters = [
        ...new Set(
          action.payload.content
            .toUpperCase()
            .split('')
            .filter((c) => alphabet.includes(c))
        ),
      ];
      state.api.pending = false;
      state.api.error = false;
    });
    builder.addCase(getQuote.rejected, (state) => {
      state.api.pending = false;
      state.api.error = true;
    });
  },
});

export const selectQuote = (state: RootState) => state.quote;

export const quoteSelector = createSelector(selectQuote, (state) => state);

export default quoteSlice.reducer;
