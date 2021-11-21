import React from 'react';
import { Box, VStack, Heading, HStack, Button } from '@chakra-ui/react';
import { LinkButton } from 'chakra-next-link';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

import { calcScore } from '../../helpers/calcScore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectLetters } from '../../store/slices/letters';
import { useResetGame } from '../../store/combinedActions';
import { selectQuote } from '../../store/slices/quote';

export const WinComponent = () => {
  const { api, uniqueCharacters } = useAppSelector(selectQuote);
  const { incorrectLetters } = useAppSelector(selectLetters);
  const time = useAppSelector((state) => state.time);
  const { width, height } = useWindowSize();

  const reset = useResetGame();

  return (
    <Box>
      <Confetti width={width} height={height} />
      <VStack
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        spacing={16}
        mt="20"
      >
        <Heading size="lg" data-test="endgame">
          🎉 Congratulations! You win!
        </Heading>
        <HStack>
          <Heading size="md">Your score is: </Heading>
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
