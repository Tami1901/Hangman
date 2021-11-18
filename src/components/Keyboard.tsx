import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { quoteSelector } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters, add, correct, incorrect } from '../store/lettersSlice';

const A = 65;

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
            quote.data.content.split('').includes(elem)
              ? dispatch(correct())
              : dispatch(incorrect());
          }}
          isDisabled={clickedLetters.includes(elem)}
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
