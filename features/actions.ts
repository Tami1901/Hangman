import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuote = createAsyncThunk('quote', async () => {
  const response = await axios.get('http://api.quotable.io/random');
  console.log(response.data);
  return response.data;
});
