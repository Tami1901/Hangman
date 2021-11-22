import React, { useEffect } from 'react';
import {
  Box,
  HStack,
  VStack,
  Flex,
  Spinner,
  Grid,
  GridItem,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { quoteSelector } from '../store/slices/quote';
import { selectNickname } from '../store/slices/nickname';
import { finishGame, selectGame } from '../store/slices/game';
import { startTimer, stopTimer, tickTime } from '../store/slices/time';
import { WinComponent } from '../components/Hangman/WinComponent';
import { useSaveGame } from '../hooks/useSaveGame';
import { ATTEMPTS } from '../constants/gameConfig';
import { alphabet } from '../constants/alphabet';
import { HangmanComponent } from '../components/Hangman/HangmanComponent';
import { EmojiMobileComponent } from '../components/Hangman/EmojiMobileComponent';
import { useResetGame } from '../store/combinedActions';
import { QuoteComponent } from '../components/Hangman/QuoteComponent';

const HangmanPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { api: quoteApi } = useAppSelector(quoteSelector);
  const { clickedLetters, incorrectLetters, endOfGame } = useAppSelector(selectGame);
  const { duration } = useAppSelector((state) => state.time);
  const nickname = useAppSelector(selectNickname);

  const router = useRouter();
  const reset = useResetGame();

  useEffect(() => {
    if (!nickname) {
      router.push('/');
    }

    reset();
  }, [nickname, reset, router]);

  const isLost = incorrectLetters >= ATTEMPTS;
  const isWin = quoteApi.data?.content
    .split('')
    .filter((a) => alphabet.includes(a))
    .every((word) => clickedLetters.includes(word));

  const toast = useToast();
  const saveGame = useSaveGame();

  useEffect(() => {
    if (isWin || isLost) {
      if (duration === 0 || isLost) {
        dispatch(finishGame('loss'));
        return;
      }

      dispatch(finishGame('win'));
      saveGame(duration)
        .then(() => toast({ title: 'Game saved' }))
        .catch((err) => toast({ title: 'Error saving game', status: 'error' }));

      return;
    }

    dispatch(startTimer());
    const timer = setInterval(() => {
      dispatch(tickTime());
    }, 1000);

    return () => {
      dispatch(stopTimer());
      clearInterval(timer);
    };
  }, [duration, isLost, isWin, toast, saveGame, dispatch]);

  const isTablet = useBreakpointValue({ base: true, lg: true, xl: false });

  return (
    <>
      {quoteApi.pending ? (
        <Spinner />
      ) : endOfGame === 'win' ? (
        <WinComponent />
      ) : (
        <Grid
          templateColumns={`${isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}`}
          maxW="1200px"
          width="90%"
          height="100%"
          mx="auto"
        >
          {!isTablet && <HangmanComponent />}

          <GridItem colSpan={2}>
            {isTablet && <EmojiMobileComponent />}
            <QuoteComponent />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default HangmanPage;
