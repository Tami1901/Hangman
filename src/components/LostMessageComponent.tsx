import { VStack, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { useResetGame } from '../store/combinedActions';

export const LostMessageComponent = () => {
  const reset = useResetGame();

  return (
    <VStack spacing="8" backgroundColor="orange.100" borderRadius="4px" p="8" mb="8">
      <Heading data-test="endgame" size="lg" color="gray.700" textAlign="center">
        😢 Better luck, next time! Try new game
      </Heading>
      <Button colorScheme="green" onClick={reset}>
        New game
      </Button>
    </VStack>
  );
};
