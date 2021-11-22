import { Flex, HStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { ATTEMPTS } from '../../constants/gameConfig';
import { timeFormat } from '../../helpers/timeFormat';
import { useAppSelector } from '../../store/hooks';
import { selectGame } from '../../store/slices/game';
import Emoji from '../Human/Emoji';

export const EmojiMobileComponent: React.FC = () => {
  const { incorrectLetters } = useAppSelector(selectGame);
  const { time } = useAppSelector((state) => state.time);

  return (
    <Flex justifyContent="space-between" p="12px 0">
      <HStack spacing={'6'} alignItems={'center'}>
        <Heading data-test="score" size="lg" fontFamily={'Roboto Mono'}>
          {incorrectLetters} / {ATTEMPTS}
        </Heading>

        <Emoji />
      </HStack>
      <Heading size="lg" fontFamily="Roboto Mono">
        {timeFormat(time)}
      </Heading>
    </Flex>
  );
};
