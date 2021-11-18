import { Box, Button } from '@chakra-ui/react';
import React from 'react';

export const range = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill('')
    .map((_, idx) => start + idx);
};

const Keyboard = () => {
  return (
    <Box>
      {range(65, 90).map((elem) => (
        <Button
          key={elem}
          value={String.fromCharCode(elem)}
          onClick={(e) => console.log(String.fromCharCode(elem))}
          disabled={false}
          m="2"
          p="0"
        >
          {String.fromCharCode(elem)}
        </Button>
      ))}
    </Box>
  );
};

export default Keyboard;
