import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { AuthProvider } from '../contexts/AuthContext';

const colors = {
  barber: {
    900: '#12131b',
    400: '#1b1c29',
    100: '#c6c6c6'
  },
  button: {
    cta: '#fba931',
    gray: '#DFDFDF',
    default: '#FFF',
    danger: '#FF4040'
  },
  orange: {
    900: '#fba931'
  }
}

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;