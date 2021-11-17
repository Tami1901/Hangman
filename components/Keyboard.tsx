import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { ALPHABET } from '../constants/alphabet';

const Keyboard = () => {
  return (
    <Box>
      {ALPHABET.map((elem) => (
        <Button
          key={elem}
          value={elem}
          onClick={(e) => console.log(e.target.innerText)}
          disabled={false}
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
