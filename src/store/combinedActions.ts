import { useCallback } from 'react';
import { useAppDispatch } from './hooks';
import { refresh } from './slices/game';
import { getQuote } from './slices/quote';
import { startTimer } from './slices/time';

export const useResetGame = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(refresh(false));
    dispatch(getQuote());
    dispatch(startTimer());
  }, [dispatch]);
};
