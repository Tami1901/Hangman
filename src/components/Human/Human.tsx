import React from 'react';
import { Box } from '@chakra-ui/react';
import BodyPart from './BodyPart';
import Emoji from './Emoji';
import { useAppSelector } from '../../store/hooks';
import { selectGame } from '../../store/slices/game';
import { emojis } from '../../constants/emojiList';

export const Human = () => {
  const { incorrectLetters } = useAppSelector(selectGame);

  return (
    <Box pos="relative" w="80" h="440px" mt="20">
      {emojis.map(({ link }) => (
        <link key={link} rel="preload" as="image" href={link} />
      ))}

      <BodyPart height="468" top="10" left="20px" />
      <BodyPart height="200" left="50px" transform="rotate(90deg) translate(-56px, -50px)" />
      <Box pos="absolute" backgroundColor="white" w="1" h="20" left="160px" top="10" />
      <BodyPart height="220" left="22px" transform="rotate(90deg) translate(400px, -100px)" />
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
