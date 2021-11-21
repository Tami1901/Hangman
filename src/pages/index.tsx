import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Header from '../components/Header';
import {
  VStack,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { save } from '../store/slices/nickname';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { Form, InputField } from 'chakra-form';

const schema = z.object({
  nickname: z.string().min(4).max(20),
});

const Home: NextPage = () => {
  const textColor = useColorModeValue('gray.700', 'gray.100');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const nickname = useAppSelector((state) => state.nickname);

  useEffect(() => {
    if (nickname.nickname) {
      router.push('/hangman');
    }
  }, []);

  return (
    <VStack
      spacing="10"
      w="90%"
      mt="10"
      marginX="auto"
      maxW="650px"
      justifyContent="center"
      p="10"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      borderRadius="5px"
    >
      <Heading data-test="title" textAlign="center" size="lg" color={textColor}>
        Enter your nickname and start the game
      </Heading>

      <Form
        schema={schema}
        onSubmit={async (data) => {
          dispatch(save(data.nickname));
          await router.push('/hangman');
        }}
        noWrap
      >
        <Flex w="85%" mt="4" alignItems="flex-start" mx="auto" flexDir={['column', 'row']}>
          <InputField name="nickname" noLabel mb="4" />
          <Button ml={[0, '4']} w={['full', '40']} type="submit" colorScheme="green">
            Start
          </Button>
        </Flex>
      </Form>
    </VStack>
  );
};

export default Home;
