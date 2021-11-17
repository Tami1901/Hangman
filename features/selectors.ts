import { createSelector } from "reselect";
import { RootState } from "../app/store";

export const selectQuote = (state: RootState) => state.quote;

export const quoteSelector = createSelector(
  selectQuote,
  state => state
)