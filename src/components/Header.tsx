import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { LinkIconButton } from 'chakra-next-link';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PURGE } from 'redux-persist/lib/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { refresh } from '../store/slices/letters';
import { getQuote } from '../store/slices/quote';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector((state) => state.nickname);

  const router = useRouter();

  return (
    <Flex
      as="header"
      position="relative"
      justifyContent="space-around"
      alignItems="center"
      opacity="0.8"
      boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      p="4"
    >
      {nickname && (
        <HStack position="absolute" left="4">
          <LinkIconButton
            aria-label="back"
            icon={<ArrowBackIcon />}
            colorScheme="red"
            size="md"
            onClick={() => {
              dispatch({ type: 'reset-store' });
              router.push('/');
            }}
          />

          <Button
            onClick={() => {
              dispatch(getQuote());
              dispatch(refresh());
            }}
            colorScheme="orange"
            size="md"
          >
            <AddIcon w={2} h={2} />
          </Button>
        </HStack>
      )}

      <Heading>Hangman</Heading>
      <HStack position="absolute" right="4">
        {nickname && <Avatar name={nickname} size="sm" />}
        <ThemeSwitcher />
      </HStack>
    </Flex>
  );
};

export default Header;
