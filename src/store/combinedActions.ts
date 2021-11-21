import { useCallback } from 'react';
import { useAppDispatch } from './hooks';
import { refresh } from './slices/letters';
import { getQuote } from './slices/quote';
import { startTimer } from './slices/time';

export const useResetGame = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(getQuote());
    dispatch(refresh());
    dispatch(startTimer());
  }, [dispatch]);
};
