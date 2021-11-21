import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'chakra-next-link';
import { useRouter } from 'next/router';

import { layoutProps } from '../pages/_app';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ThemeSwitcher from './ThemeSwitcher';
import { useResetGame } from '../store/combinedActions';

const Header = () => {
  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector((state) => state.nickname);

  const headerColor = useColorModeValue('gray.600', 'gray.400');

  const router = useRouter();
  const logout = () => {
    dispatch({ type: 'reset-store' });
    router.push('/');
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const reset = useResetGame();

  return (
    <Flex
      w="100vw"
      pos="absolute"
      top="0"
      left="0"
      right="0"
      h="20"
      boxShadow="rgba(0, 0, 0, 0.32) 1.95px 1.95px 2.6px"
    >
      <Grid {...layoutProps} templateColumns="2fr 1fr" as="header" p="4" alignItems={'center'}>
        <HStack spacing="10" alignItems="center">
          <Heading color={headerColor} lineHeight={1}>
            Hangman
          </Heading>
          {router.pathname !== '/' && !isMobile && (
            <>
              <Link
                href="/hangman"
                _focus={{ outline: 'none' }}
                _activeLink={{ textDecor: 'underline' }}
              >
                New game
              </Link>
              <Link
                href="/scores"
                _focus={{ outline: 'none' }}
                _activeLink={{ textDecor: 'underline' }}
              >
                Leaderboard
              </Link>
            </>
          )}
        </HStack>

        <Flex justify="flex-end" align="center" data-test="nav-right">
          <ThemeSwitcher />
          {nickname && (
            <Box pl="4">
              <Menu>
                <MenuButton data-test="avatar-button">
                  <Avatar data-test="avatar" name={nickname} size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      reset();
                      router.push('/hangman');
                    }}
                  >
                    New game
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/scores')}>Scores</MenuItem>
                  <MenuDivider />
                  <MenuItem data-test="logout" onClick={() => logout()}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Header;
