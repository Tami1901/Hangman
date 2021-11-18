import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectQuote = (state: RootState) => state.quote;

export const quoteSelector = createSelector(selectQuote, (state) => state);
