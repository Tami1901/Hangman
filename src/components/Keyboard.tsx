import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters, add, correct, incorrect } from '../store/slices/letters';
import { quoteSelector } from '../store/slices/quote';
import { alphabet } from '../constants/alphabet';

const Keyboard = () => {
  const dispatch = useAppDispatch();
  const clickedLetters = useAppSelector(selectLetters);
  const quote = useAppSelector(quoteSelector);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {alphabet.map((elem) => (
        <Button
          data-test={`keyboard-${elem}`}
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
