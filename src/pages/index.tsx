import React from 'react';
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
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { save } from '../store/nicknameSlice';
import { useRouter } from 'next/router';

type FormType = { nickname: string };

const Home: NextPage = () => {
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const { register, handleSubmit, formState } = useForm<FormType>();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormType) => {
    dispatch(save(data.nickname));
    await router.push('/hangman');
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

          <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
            <Flex mt="4" alignItems="flex-start">
              <FormControl w="70%" isInvalid={!!formState.errors.nickname}>
                <Input
                  {...register('nickname', {
                    minLength: { message: 'Username needs to be at least 4 characters', value: 4 },
                  })}
                  type="text"
                  placeholder="nickname"
                  aria-label="nickname"
                  textColor={textColor}
                />
                <FormErrorMessage>{formState.errors.nickname?.message}</FormErrorMessage>
              </FormControl>

              <Button
                ml="4"
                w="40"
                type="submit"
                colorScheme="green"
                isDisabled={!!formState.errors.nickname}
              >
                Start
              </Button>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
