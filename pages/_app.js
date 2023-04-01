import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layout';
import '@/styles/globals.css';
import { AlertContextProvider } from '@/context/AlertContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AlertContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
