import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Flex,
  Heading,
  Code,
  Spinner,
  SimpleGrid,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Header from '../components/Header';
import Keyboard, { alphabet } from '../components/Keyboard';
import { getQuote, quoteSelector } from '../store/slices/quote';
import { selectNickname } from '../store/slices/nickname';
import { selectLetters, refresh } from '../store/slices/letters';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';
import { resetTime, startTimer, stopTimer, tickTime } from '../store/slices/time';
import axios from 'axios';
import { getScores, scoresSelect } from '../store/slices/scores';
import { Human } from '../components/Human/Human';
import { LinkButton } from 'chakra-next-link';

export const ATTEMPTS = 6;

type playerScoreType = {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
};

const HangmanPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { api: quoteApi, uniqueCharacters } = useAppSelector(quoteSelector);
  const nickname = useAppSelector(selectNickname);
  const { clickedLetters, incorrectLetters } = useAppSelector(selectLetters);
  const { time, duration } = useAppSelector((state) => state.time);
  const { data: scoreData } = useAppSelector(scoresSelect);
  // if (scoreData) Object.values(scoreData).filter((a) => console.log(setScore(a.errors)));

  const router = useRouter();
  useEffect(() => {
    if (!nickname) {
      router.push('/');
    }
    dispatch(getQuote());
    dispatch(getScores());
    dispatch(startTimer());
  }, []);

  const words = quoteApi.data?.content.split(' ');
  const isLost = incorrectLetters >= ATTEMPTS;
  const isWin = quoteApi.data?.content
    .split('')
    .filter((a) => alphabet.includes(a))
    .every((word) => clickedLetters.includes(word));

  useEffect(() => {
    if (isWin || isLost) {
      if (duration === -1) {
        return;
      }
      if (quoteApi.data && nickname) {
        const playerScore: playerScoreType = {
          quoteId: quoteApi.data._id,
          length: quoteApi.data.length,
          uniqueCharacters: uniqueCharacters.length,
          userName: nickname,
          errors: incorrectLetters,
          duration,
        };
        axios.post(
          'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores',
          playerScore
        );
      }
      return;
    }

    dispatch(startTimer());
    const timer = setInterval(() => {
      dispatch(tickTime());
    }, 1000);

    return () => {
      clearInterval(timer);
      dispatch(stopTimer());
    };
  }, [isWin, isLost, duration]);

  const minutes = Math.floor(time / 60);

  return (
    <Box minH="100vh">
      <Header />
      {quoteApi.pending && false ? (
        <Spinner />
      ) : (
        <Box>
          {isWin ? (
            <Box>
              <Confetti />
              <VStack
                display="flex"
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                spacing={16}
                mt="20"
              >
                <Heading size="lg">🎉 Congratulations! You win!</Heading>
                <HStack>
                  <Heading size="md">Your score is: </Heading>
                  <Heading color="orange">
                    {Math.round((100 / (1 + incorrectLetters)) * 100) / 100}
                  </Heading>
                </HStack>
                <HStack>
                  <Button colorScheme="green" onClick={() => dispatch(refresh())} width="50%">
                    New game
                  </Button>
                  <LinkButton href="/scores" colorScheme="orange" width="50%">
                    Scores
                  </LinkButton>
                </HStack>
              </VStack>
            </Box>
          ) : (
            <>
              <Box
                display="flex"
                width="100%"
                p="4"
                borderBottom="2px solid orange"
                position="relative"
              >
                <Heading size="lg" position="absolute" left="16">
                  {minutes === 0 ? `${time} sec` : `${minutes} min ${time % 60} sec`}
                </Heading>
                <Heading size="lg" m="0 auto">
                  Guess the famous quote
                </Heading>

                <Heading size="lg" position="absolute" right="16">
                  {incorrectLetters} / {ATTEMPTS}
                </Heading>
              </Box>
              <Grid
                templateColumns={'repeat(3, 1fr)'}
                maxW="1200px"
                width="90%"
                height="100%"
                mx="auto"
              >
                <GridItem colSpan={1}>
                  <Human />
                </GridItem>
                <GridItem colSpan={2}>
                  <VStack spacing="8" mt="26">
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
                              >
                                {!isLost
                                  ? clickedLetters.includes(l)
                                    ? l
                                    : alphabet.includes(l)
                                    ? '_'
                                    : l
                                  : l}
                              </Box>
                            ))}
                          </HStack>
                        ))}
                      </Flex>
                    )}

                    {quoteApi.error && <p>Oops, something went wrong</p>}

                    <Box display="flex" width="70%" justifyContent="center">
                      {isLost ? (
                        <VStack
                          spacing="12"
                          backgroundColor="orange.100"
                          borderRadius="4px"
                          p="8"
                          mb="12"
                        >
                          <Heading size="lg" color="gray.700">
                            😢 Better luck, next time! Try new game
                          </Heading>
                          <Button
                            colorScheme="green"
                            onClick={() => {
                              dispatch(getQuote());
                              dispatch(refresh());
                            }}
                          >
                            New game
                          </Button>
                        </VStack>
                      ) : (
                        <Keyboard />
                      )}
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HangmanPage;
