import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { quoteReducer } from '.';
import counterReducer from './counter/counterSlice';
import nicknameReducer from './nicknameSlice';
import clickedLettersReducer from './lettersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quote: quoteReducer,
    nickname: nicknameReducer,
    clickedLetters: clickedLettersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
