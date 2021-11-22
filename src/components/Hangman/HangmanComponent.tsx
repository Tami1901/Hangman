import { GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
import { ATTEMPTS } from '../../constants/gameConfig';
import { timeFormat } from '../../helpers/timeFormat';
import { useAppSelector } from '../../store/hooks';
import { selectGame } from '../../store/slices/game';
import { Human } from '../Human/Human';

export const HangmanComponent: React.FC = () => {
  const { incorrectLetters } = useAppSelector(selectGame);
  const { time } = useAppSelector((state) => state.time);

  return (
    <GridItem colSpan={1} position="relative">
      <Heading
        data-test="score"
        size="lg"
        position="absolute"
        left="16"
        top="16"
        fontFamily="Roboto Mono"
      >
        {timeFormat(time)}
      </Heading>
      <Heading size="lg" position="absolute" left="24" top="540" fontFamily="Roboto Mono">
        {incorrectLetters} / {ATTEMPTS}
      </Heading>
      <Human />
    </GridItem>
  );
};
