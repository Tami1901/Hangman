import { Box, Button, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import Keyboard from '../components/Keyboard';
import { getQuote, quoteSelector } from '../features';

const Quote: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(quoteSelector);

  const sentence = data.content.split(/[ ,]+/);
  const words = sentence.map((word) => word.split(''));

  let nickname =
    typeof window !== 'undefined' &&
    (localStorage.getItem('nickname') as string);

  const letters = words.map((word, i) => (
    <Box key={i} display="inline-block" padding="0" marginRight="30px">
      {word.map((letter, i) => (
        <Box
          key={i}
          display="inline-block"
          width="30px"
          textTransform="uppercase"
          marginBottom="15px"
          borderBottom="1px solid"
          marginRight="4px"
          fontWeight="bold"
          fontSize="26px"
          boxSizing="border-box"
          textAlign="center"
        >
          {letter}
        </Box>
      ))}
    </Box>
  ));

  return (
    <>
      <Header nickname={nickname} />

      <Box display="flex" width="100%" height="100%" justifyContent="center">
        <VStack spacing="12" mt="20">
          {pending && <p>Loading...</p>}
          {data && (
            <Box textAlign="center" mx="6">
              {letters}
            </Box>
          )}

          {error && <p>Oops, something went wrong</p>}

          <Box display="flex" width="70%" justifyContent="center">
            <Keyboard />
          </Box>
          <Button
            onClick={() => dispatch(getQuote())}
            disabled={pending}
            colorScheme="orange"
          >
            Generate new quote
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Quote;
