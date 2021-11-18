import { Box, Button, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import Keyboard, { range } from '../components/Keyboard';
import { getQuote, quoteSelector } from '../features';
import { selectNickname } from '../features/nicknameSlice';

const Quote: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(quoteSelector);
  const nn = useAppSelector(selectNickname);

  console.log(data.content);
  const lettersArray = data.content.split('');
  console.log(lettersArray);

  const letters = lettersArray.map((letter, i) => (
    <Box key={i} display="inline-block" padding="0" marginRight="16px">
      {range(32, 47).includes(letter.charCodeAt(0)) ? (
        <Box key={i} fontWeight="bold" fontSize="26px">
          {letter}
        </Box>
      ) : (
        <Box
          key={i}
          display="inline-block"
          width="30px"
          marginBottom="15px"
          borderBottom="1px solid"
          fontWeight="bold"
          fontSize="26px"
          boxSizing="border-box"
          textAlign="center"
        >
          {letter}
        </Box>
      )}
    </Box>
  ));

  return (
    <>
      <Header nickname={nn} />

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
