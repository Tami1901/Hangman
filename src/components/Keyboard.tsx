import { Box, Button, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { ATTEMPTS } from '../pages/hangman';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters, add, correct, incorrect, refresh } from '../store/slices/letters';
import { getQuote, quoteSelector } from '../store/slices/quote';

export const A = 65;

export const alphabet = Array.from(new Array(26), (_, i) => String.fromCharCode(i + A));

const Keyboard = () => {
  const dispatch = useAppDispatch();
  const clickedLetters = useAppSelector(selectLetters);
  const quote = useAppSelector(quoteSelector);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {alphabet.map((elem) => (
        <Button
          key={elem}
          value={elem}
          onClick={() => {
            dispatch(add(elem));
            quote.api.data?.content.split('').includes(elem)
              ? dispatch(correct())
              : dispatch(incorrect());
          }}
          isDisabled={clickedLetters.clickedLetters.includes(elem)}
          m="2"
          p="0"
        >
          {elem}
        </Button>
      ))}
    </Box>
  );
};

export default Keyboard;
