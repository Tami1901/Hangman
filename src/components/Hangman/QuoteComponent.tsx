import { VStack, Flex, HStack, Box, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { alphabet } from '../../constants/alphabet';
import { ATTEMPTS } from '../../constants/gameConfig';
import { useAppSelector } from '../../store/hooks';
import { selectGame } from '../../store/slices/game';
import { quoteSelector } from '../../store/slices/quote';
import Keyboard from '../Keyboard';
import { LostMessageComponent } from '../LostMessageComponent';

export const QuoteComponent: React.FC = () => {
  const { api: quoteApi } = useAppSelector(quoteSelector);
  const { clickedLetters, incorrectLetters } = useAppSelector(selectGame);

  const isTablet = useBreakpointValue({ base: true, lg: true, xl: false });
  const words = quoteApi.data?.content.split(' ');
  const isLost = incorrectLetters >= ATTEMPTS;

  return (
    <VStack spacing="8" mt={isTablet ? '12' : '28'}>
      {quoteApi.pending && <p>Loading...</p>}
      {quoteApi.data && (
        <Flex justifyContent="center" flexWrap="wrap">
          {words?.map((w, i) => (
            <HStack mr={`${isTablet ? '' : '12'}`} mb="6" key={`${w}-${i}`}>
              {w.split('').map((l, i) => (
                <Box
                  key={`${l}-${i}`}
                  width="30px"
                  fontWeight="bold"
                  fontSize="26px"
                  boxSizing="border-box"
                  textAlign="center"
                  color={isLost && !clickedLetters.includes(l) ? 'red.400' : undefined}
                >
                  {isLost || clickedLetters.includes(l) || !alphabet.includes(l) ? l : '_'}
                </Box>
              ))}
            </HStack>
          ))}
        </Flex>
      )}

      {quoteApi.error && <p>Oops, something went wrong</p>}

      <Box display="flex" width={['100%', '100%', '100%', '70%']} justifyContent="center">
        {isLost ? <LostMessageComponent /> : <Keyboard />}
      </Box>
    </VStack>
  );
};
