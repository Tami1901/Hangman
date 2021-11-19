import { Box, Heading } from '@chakra-ui/layout';
import { time } from 'console';
import React, { useState } from 'react';
import { ATTEMPTS } from '../pages/hangman';
import { useAppSelector } from '../store/hooks';
import { selectLetters } from '../store/slices/letters';

const SubNav = () => {
  const { incorrectLetters } = useAppSelector(selectLetters);
  const time = useAppSelector((state) => state.time.time) || 0;

  const minutes = Math.floor(time / 60);

  return (
    <Box display="flex" width="100%" p="4" borderBottom="2px solid orange" position="relative">
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
  );
};

export default SubNav;
