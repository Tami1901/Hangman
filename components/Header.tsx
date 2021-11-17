import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { LinkIconButton } from 'chakra-next-link';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  nickname?: any;
}

const Header = ({ nickname }: HeaderProps) => {
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
        <LinkIconButton
          href="/"
          aria-label="back"
          icon={<ArrowBackIcon />}
          position="absolute"
          left="4"
          size="sm"
        />
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
