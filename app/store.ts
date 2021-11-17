import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { quoteReducer } from '../features';
import counterReducer from '../features/counter/counterSlice';
import nicknameReducer from '../features/nicknameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quote: quoteReducer,
    nickname: nicknameReducer,
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
