import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp;
