import React from 'react';
import { NextPage } from 'next';
import { Box, Image } from '@chakra-ui/react';
import BodyPart from './BodyPart';
import Emoji from './Emoji';
import { useAppSelector } from '../../store/hooks';
import { selectLetters } from '../../store/slices/letters';

export const Human = () => {
  const { incorrectLetters } = useAppSelector(selectLetters);

  return (
    <Box pos="relative" w="80" h="440px" mt="20">
      <BodyPart height="400" top="10" left="20px" />
      <BodyPart height="200" left="50px" transform="rotate(90deg) translate(-56px, -50px)" />
      <Box pos="absolute" backgroundColor="white" w="1" h="20" left="160px" top="10" />

      <BodyPart height="20" left="150px" top="10" />
      {incorrectLetters > 0 && <Emoji />}
      {incorrectLetters > 2 && (
        <BodyPart
          top="48"
          height="100"
          left="50%"
          transform="rotate(35deg) translate(-40px, 16px)"
        />
      )}
      {incorrectLetters > 1 && (
        <BodyPart top="48" height="126px" left="50%" transform="translateX(-50%)" />
      )}
      {incorrectLetters > 3 && (
        <BodyPart
          top="48"
          height="100"
          left="50%"
          transform="rotate(-35deg) translate(27px, 8px)"
        />
      )}
      {incorrectLetters > 4 && (
        <BodyPart
          top="300"
          height="100"
          left="50%"
          transform="rotate(35deg) translate(-32px, 16px)"
        />
      )}
      {incorrectLetters > 5 && (
        <BodyPart
          top="300"
          height="100"
          left="50%"
          transform="rotate(-35deg) translate(20px, 6px)"
        />
      )}
    </Box>
  );
};
