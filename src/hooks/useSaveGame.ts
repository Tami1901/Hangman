import axios from 'axios';
import { useCallback } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from '../store/hooks';
import { save } from '../store/slices/games';
import { refresh } from '../store/slices/game';
import { RootState } from '../store/store';

type playerScoreType = {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
};

export const useSaveGame = () => {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();

  return useCallback(
    async (duration: number) => {
      const state = store.getState();
      const {
        quote: { uniqueCharacters, api },
        nickname: { nickname },
        clickedLetters: { incorrectLetters },
      } = state;

      const playerScore: playerScoreType = {
        quoteId: api.data!._id,
        length: api.data!.length,
        uniqueCharacters: uniqueCharacters.length,
        userName: nickname!,
        errors: incorrectLetters,
        duration,
      };

      dispatch(save({ ...playerScore, id: Date.now() }));
      await axios.post(
        'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores',
        playerScore
      );

      return true;
    },
    [store, dispatch]
  );
};
