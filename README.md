# Coinbase Onramp Frontend Demo

A TypeScript Next.js application that integrates with Coinbase Onramp API to enable crypto purchases with fiat currency. This demo showcases wallet connection using RainbowKit and crypto purchasing functionality using Coinbase's OnchainKit.

## Features

- **Wallet Connection**: Connect Web3 wallets using RainbowKit
- **Multi-chain Support**: Supports Ethereum, Base, Polygon, Optimism, and Arbitrum
- **Crypto Purchase**: Buy crypto with credit/debit cards via Coinbase Onramp
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: RainbowKit + wagmi
- **Onramp Integration**: Coinbase OnchainKit
- **State Management**: TanStack Query

## Prerequisites

Before running this application, you'll need:

1. **Coinbase Developer Platform Project ID**
   - Go to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
   - Create a new project
   - Copy your Project ID

2. **WalletConnect Project ID**
   - Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your Project ID

3. **Alchemy API Key** (Optional but recommended)
   - Go to [Alchemy](https://www.alchemy.com/)
   - Create a new app
   - Copy your API key

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd testing-coinbase-onramp-flow
   npm install
   ```

2. **Environment Configuration**
   Update `.env.local` with your credentials:
   ```bash
   NEXT_PUBLIC_COINBASE_PROJECT_ID=your_coinbase_project_id_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here
   NEXT_PUBLIC_ENVIRONMENT=development
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Network Selection**: The app will suggest switching to Base network for optimal experience
3. **Buy Crypto**: Click "Buy Crypto with Card" to open the Coinbase Onramp interface
4. **Complete Purchase**: Follow the onramp flow to purchase crypto with your card

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── providers.tsx      # Global providers (Wagmi, RainbowKit, OnchainKit)
│   ├── wallet/           # Wallet connection components
│   │   └── WalletConnection.tsx
│   └── onramp/           # Onramp purchase components
│       └── OnrampPurchase.tsx
└── lib/                   # Configuration and utilities
    ├── wagmi.ts          # Wagmi configuration
    └── onchain.ts        # OnchainKit configuration
```

## Configuration

### Supported Networks
- Ethereum Mainnet
- Base (Coinbase L2)
- Polygon
- Optimism
- Arbitrum

### Default Settings
- **Default Network**: Base (recommended for Coinbase integrations)
- **Default Currency**: USD
- **Default Amount**: $100
- **Default Asset**: ETH

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure your WalletConnect Project ID is correct
   - Check that your wallet supports the selected network

2. **Onramp Not Loading**
   - Verify your Coinbase Project ID is correct
   - Ensure you're on a supported network (Base recommended)

3. **Type Errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all environment variables are properly set

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Run linting
npm run lint
```

## Learn More

- [Coinbase Onramp Documentation](https://docs.cdp.coinbase.com/onramp-&-offramp/introduction/welcome)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [RainbowKit Documentation](https://rainbowkit.com/)
- [wagmi Documentation](https://wagmi.sh/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

This project is open source and available under the [MIT License](LICENSE).
