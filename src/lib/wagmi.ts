import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, base, polygon, optimism, arbitrum } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set');
}

export const config = getDefaultConfig({
  appName: 'Coinbase Onramp Flow',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [base, mainnet, polygon, optimism, arbitrum],
  ssr: true, // Enable server-side rendering
});

export const supportedChains = [base, mainnet, polygon, optimism, arbitrum];
export const defaultChain = base; // Base is Coinbase's L2 chain
