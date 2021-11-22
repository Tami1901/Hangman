import React, { useEffect } from 'react';
import { Box, VStack, Heading, HStack, Button, useBreakpointValue } from '@chakra-ui/react';
import { LinkButton } from 'chakra-next-link';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

import { calcScore } from '../../helpers/calcScore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { finishGame, refresh, selectGame } from '../../store/slices/game';
import { useResetGame } from '../../store/combinedActions';
import { selectQuote } from '../../store/slices/quote';

export const WinComponent = () => {
  const { api, uniqueCharacters } = useAppSelector(selectQuote);
  const { incorrectLetters, endOfGame } = useAppSelector(selectGame);
  const time = useAppSelector((state) => state.time);
  const { width, height } = useWindowSize();
  const dispatch = useAppDispatch();

  const reset = useResetGame();

  useEffect(() => {
    dispatch(refresh(true));
  }, [dispatch]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <Confetti width={width} height={height} />
      <VStack
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        mt="20"
        spacing={16}
      >
        <Heading size="lg" data-test="endgame">
          🎉 Congratulations! You win!
        </Heading>
        <HStack>
          <Heading size="md">{isMobile ? 'Score:' : 'Your score is:'} </Heading>
          <Heading color="orange">
            {calcScore({
              err: incorrectLetters,
              unique: uniqueCharacters.length,
              len: api.data?.length || 0,
              duration: time.duration,
            })}
          </Heading>
        </HStack>
        <HStack>
          <Button colorScheme="green" onClick={reset} width="50%">
            New game
          </Button>
          <LinkButton href="/scores" colorScheme="orange" width="50%">
            Scores
          </LinkButton>
        </HStack>
      </VStack>
    </Box>
  );
};
