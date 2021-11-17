import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
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
      <Heading>Hangman</Heading>
      <Box position="absolute" right="10">
        <ThemeSwitcher />
      </Box>
    </Flex>
  );
};

export default Header;
