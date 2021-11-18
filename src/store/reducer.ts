import { createReducer } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type QuoteType = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
};

export const getQuote = createAsyncThunk('quote', async () => {
  const response = await axios.get<QuoteType>('http://api.quotable.io/random');

  return { ...response.data, content: response.data.content.toUpperCase() };
});

export type QuoteState = {
  data: {
    author: string;
    content: string;
  };
  pending: boolean;
  error: boolean;
};

const initialState: QuoteState = {
  data: {
    author: '',
    content: '',
  },
  pending: false,
  error: false,
};

// https://redux-toolkit.js.org/api/createAsyncThunk
export const quoteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getQuote.pending, (state) => {
      state.pending = true;
    })
    .addCase(getQuote.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(getQuote.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});

export default quoteReducer;
