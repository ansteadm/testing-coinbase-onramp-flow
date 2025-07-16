import { base } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_COINBASE_PROJECT_ID is not set');
}

export const onchainConfig = {
  apiKey: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
  chain: base,
  schemaId: '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9' as `0x${string}`, // Optional: for attestations
};

export const COINBASE_ONRAMP_CONFIG = {
  appId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
  // Default configuration for onramp
  defaultExperience: 'buy',
  defaultPaymentMethod: 'card',
  defaultPurchaseAmount: '100',
  defaultAsset: 'ETH',
  defaultNetwork: 'base',
  defaultFiatCurrency: 'USD',
} as const;
