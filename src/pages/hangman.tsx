import { Box, Button, HStack, VStack, Text, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Header from '../components/Header';
import Keyboard, { alphabet } from '../components/Keyboard';
import { getQuote, quoteSelector } from '../store';
import { selectNickname } from '../store/nicknameSlice';
import { selectLetters, refresh } from '../store/lettersSlice';

const Quote: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(quoteSelector);
  const nickname = useAppSelector(selectNickname);
  const clickedLetters = useAppSelector(selectLetters);

  const words = data.content.split(' ');

  useEffect(() => {
    dispatch(getQuote());
  }, []);

  return (
    <>
      <Header nickname={nickname} />

      <Box display="flex" maxW="80%" height="100%" justifyContent="center" mx="auto">
        <VStack spacing="12" mt="20">
          {pending && <p>Loading...</p>}
          {data && (
            <Flex justifyContent="center" flexWrap="wrap">
              {words.map((w) => (
                <HStack mr="12" mb="6">
                  {w.split('').map((l) => (
                    <Box
                      width="30px"
                      fontWeight="bold"
                      fontSize="26px"
                      boxSizing="border-box"
                      textAlign="center"
                    >
                      {clickedLetters.includes(l) ? l : alphabet.includes(l) ? '_' : l}
                    </Box>
                  ))}
                </HStack>
              ))}
            </Flex>
          )}

          {error && <p>Oops, something went wrong</p>}

          <Box display="flex" width="70%" justifyContent="center">
            <Keyboard />
          </Box>
          <Button
            onClick={() => {
              dispatch(getQuote());
              dispatch(refresh());
            }}
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
