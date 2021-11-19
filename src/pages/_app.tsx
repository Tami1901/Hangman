import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '../store/store';
// import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
