import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters, add } from '../store/lettersSlice';

const A = 65;

export const alphabet = Array.from(new Array(26), (_, i) => String.fromCharCode(i + A));

const Keyboard = () => {
  const dispatch = useAppDispatch();
  const clickedLetters = useAppSelector(selectLetters);
  return (
    <Box>
      {alphabet.map((elem) => (
        <Button
          key={elem}
          value={elem}
          onClick={() => dispatch(add(elem))}
          disabled={clickedLetters.includes(elem) ? true : false}
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
