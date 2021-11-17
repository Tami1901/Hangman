import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuote = createAsyncThunk('quote', async () => {
  const response = await axios.get('http://api.quotable.io/random');

  return { ...response.data, content: response.data.content.toUpperCase() };
});
