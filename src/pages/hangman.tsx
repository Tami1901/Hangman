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

import Keyboard from '../components/Keyboard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getQuote, quoteSelector } from '../store/slices/quote';
import { selectNickname } from '../store/slices/nickname';
import { selectLetters, refresh } from '../store/slices/letters';
import { startTimer, stopTimer, tickTime } from '../store/slices/time';
import { WinComponent } from '../components/Hangman/WinComponent';
import { useSaveGame } from '../hooks/useSaveGame';
import { ATTEMPTS } from '../constants/gameConfig';
import { alphabet } from '../constants/alphabet';
import { HangmanComponent } from '../components/Hangman/HangmanComponent';
import { EmojiMobileComponent } from '../components/Hangman/EmojiMobileComponent';
import { LostMessageComponent } from '../components/LostMessageComponent';
import { useResetGame } from '../store/combinedActions';

const HangmanPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { api: quoteApi } = useAppSelector(quoteSelector);
  const nickname = useAppSelector(selectNickname);
  const { clickedLetters, incorrectLetters } = useAppSelector(selectLetters);
  const { duration } = useAppSelector((state) => state.time);

  const router = useRouter();
  const reset = useResetGame();

  useEffect(() => {
    if (!nickname) {
      router.push('/');
    }

    reset();
  }, [nickname, reset, router]);

  const words = quoteApi.data?.content.split(' ');
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
        return;
      }

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
      ) : isWin ? (
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
            <VStack spacing="8" mt={isTablet ? '12' : '28'}>
              {quoteApi.pending && <p>Loading...</p>}
              {quoteApi.data && (
                <Flex justifyContent="center" flexWrap="wrap">
                  {words?.map((w, i) => (
                    <HStack mr="12" mb="6" key={`${w}-${i}`}>
                      {w.split('').map((l, i) => (
                        <Box
                          key={`${l}-${i}`}
                          width="30px"
                          fontWeight="bold"
                          fontSize="26px"
                          boxSizing="border-box"
                          textAlign="center"
                          color={isLost && !clickedLetters.includes(l) ? 'red.400' : undefined}
                        >
                          {isLost || clickedLetters.includes(l) || !alphabet.includes(l) ? l : '_'}
                        </Box>
                      ))}
                    </HStack>
                  ))}
                </Flex>
              )}

              {quoteApi.error && <p>Oops, something went wrong</p>}

              <Box display="flex" width={['90%', '90%', '90%', '70%']} justifyContent="center">
                {isLost ? <LostMessageComponent /> : <Keyboard />}
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default HangmanPage;
