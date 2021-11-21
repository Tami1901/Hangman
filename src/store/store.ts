import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import quoteReducer from './slices/quote';
import nicknameReducer from './slices/nickname';
import clickedLettersReducer from './slices/letters';
import timeReducer from './slices/time';
import scoreReducer from './slices/scores';
import gamesReducer from './slices/games';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['clickedLetters', 'time', 'quote'],
};

const rootReducer = combineReducers({
  quote: quoteReducer,
  nickname: nicknameReducer,
  clickedLetters: clickedLettersReducer,
  time: timeReducer,
  scores: scoreReducer,
  games: gamesReducer,
});

const persistedReducer = persistReducer(persistConfig, ((state, action) => {
  if (action?.type === 'reset-store') {
    return rootReducer(undefined, action);
  }

  return rootReducer(state as any, action);
}) as typeof rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
