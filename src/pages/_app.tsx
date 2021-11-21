import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { Box, BoxProps, ChakraProvider } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from '../store/store';
import Header from '../components/Header';

export const layoutProps: BoxProps = {
  w: '80%',
  maxW: '1200px',
  marginX: 'auto',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Box pos="relative" minH="calc(100vh - 80px)">
            <Header />

            <Box {...layoutProps} pt="20">
              <Component {...pageProps} />
            </Box>
          </Box>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
