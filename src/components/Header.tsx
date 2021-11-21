import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { LinkButton, LinkIconButton } from 'chakra-next-link';
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

  const headerColor = useColorModeValue('gray.600', 'gray.400');

  const router = useRouter();
  const logout = () => {
    dispatch({ type: 'reset-store' });
    router.push('/');
  };

  return (
    <SimpleGrid columns={3} as="header" boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" p="4">
      <HStack>
        {router.pathname === '/scores' && (
          <LinkIconButton
            aria-label="back"
            icon={<ArrowBackIcon />}
            href="/hangman"
            colorScheme="gray"
            size="md"
          />
        )}
        <ThemeSwitcher />
      </HStack>

      <Heading color={headerColor} marginX={'auto'}>
        Hangman
      </Heading>
      <HStack position="absolute" right="4">
        {nickname && (
          <Box>
            <Menu>
              <MenuButton>
                <Avatar name={nickname} size="md" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    router.push('/hangman');
                    dispatch(getQuote());
                    dispatch(refresh());
                  }}
                >
                  New game
                </MenuItem>
                <MenuItem onClick={() => router.push('/scores')}>Scores</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </HStack>
    </SimpleGrid>
  );
};

export default Header;
