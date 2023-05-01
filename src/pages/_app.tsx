import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Flex } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism  } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Flex flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box flex="1">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Flex>
      </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp;
