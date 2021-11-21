import { Flex, HStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { ATTEMPTS } from '../../constants/gameConfig';
import { timeFormat } from '../../helpers/timeFormat';
import { useAppSelector } from '../../store/hooks';
import { selectLetters } from '../../store/slices/letters';
import Emoji from '../Human/Emoji';

export const EmojiMobileComponent: React.FC = () => {
  const { incorrectLetters } = useAppSelector(selectLetters);
  const { time } = useAppSelector((state) => state.time);

  return (
    <Flex justifyContent="space-between" p="4">
      <HStack spacing={'6'}>
        <Heading size="lg">
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
