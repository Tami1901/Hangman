import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Header from '../components/Header';
import {
  VStack,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  HStack,
  FormControl,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LinkButton } from 'chakra-next-link';

const Home: NextPage = () => {
  const [nickname, setNickname] = useState('');
  const textColor = useColorModeValue('gray.700', 'gray.100');

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nickname', nickname);
    }
  }, [nickname]);

  return (
    <>
      <Header />
      <Flex width="100%" justifyContent="center">
        <VStack
          spacing="10"
          width="50%"
          justifyContent="center"
          mt="10"
          p="10"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          borderRadius="5px"
        >
          <Heading size="lg" color={textColor}>
            Enter your nickname and start the game
          </Heading>

          <HStack mt="20">
            <FormControl id="nickname" isRequired>
              <Input
                type="text"
                isInvalid
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="nickname"
                aria-label="nickname"
                textColor={textColor}
              />
            </FormControl>
            <LinkButton
              href="/hangman"
              width="40"
              isDisabled={!nickname}
              colorScheme="green"
            >
              {' '}
              Start{' '}
            </LinkButton>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
