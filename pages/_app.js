import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layout';
import '@/styles/globals.css';
import { AlertContextProvider } from '@/context/AlertContext';
import theme from '@/styles/theme';
import { IsAddContextProvider } from '@/context/IsAddContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AlertContextProvider>
        <IsAddContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IsAddContextProvider>
      </AlertContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
