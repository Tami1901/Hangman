import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { getQuote, quoteSelector } from '../features';

const Quote: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(quoteSelector);

  return (
    <>
      <Header />
      <Box display="flex" width="100%" height="100vh" justifyContent="center">
        <VStack>
          <Box>
            {pending && <p>Loading...</p>}
            {data && <p>{data.content}</p>}
            {error && <p>Oops, something went wrong</p>}
            <Button
              onClick={() => dispatch(getQuote())}
              disabled={pending}
              colorScheme="orange"
            >
              Generate new quote
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Quote;
