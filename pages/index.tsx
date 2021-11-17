import React from 'react';
import type { NextPage } from 'next';
import Header from '../components/Header';
import {
  VStack,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/hooks';
import { save } from '../features/nicknameSlice';
import { useRouter } from 'next/dist/client/router';

const Home: NextPage = () => {
  const textColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: { nickname: string }) => {
    await dispatch(save(data.nickname));
    router.push('/hangman');
  };

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack mt="4">
              <Input
                {...register('nickname')}
                type="text"
                placeholder="nickname"
                aria-label="nickname"
                textColor={textColor}
                minLength={4}
              />

              <Button
                type="submit"
                value="submit"
                href="/hangman"
                width="40"
                colorScheme="green"
              >
                {' '}
                Start{' '}
              </Button>
            </HStack>
          </form>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
