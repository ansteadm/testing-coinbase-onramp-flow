# Coinbase Onramp Frontend Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a TypeScript Next.js frontend project that integrates with Coinbase Onramp API for crypto purchasing functionality. The project includes:

- **Wallet Connection**: Using RainbowKit/WalletConnect for Web3 wallet integration
- **Onramp Integration**: Coinbase OnchainKit SDK for purchasing crypto with fiat
- **UI Framework**: Next.js 14+ with App Router, TypeScript, and Tailwind CSS

## Key Technologies & Libraries
- **Next.js 14+** with App Router and TypeScript
- **@coinbase/onchainkit** - Main SDK for Coinbase integrations
- **@rainbow-me/rainbowkit** - Wallet connection UI
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript interface for Ethereum
- **Tailwind CSS** - Styling framework

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use proper error handling with try-catch blocks
- Implement loading states for async operations
- Follow Next.js 14+ App Router patterns

### Wallet Integration
- Use RainbowKit for wallet connection UI
- Implement proper wallet state management
- Handle wallet connection errors gracefully
- Support multiple wallet providers (MetaMask, WalletConnect, etc.)

### Onramp Integration
- Use OnchainKit's OnrampKit components
- Implement proper error handling for payment flows
- Handle different payment methods (card, bank transfer)
- Provide clear user feedback during transactions

### Security Considerations
- Never store private keys or sensitive data
- Validate all user inputs
- Use environment variables for API keys
- Implement proper CORS and CSP headers

### Environment Variables
- `NEXT_PUBLIC_COINBASE_PROJECT_ID` - Coinbase CDP project ID
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Alchemy API key (optional)

## File Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── wallet/         # Wallet connection components
│   ├── onramp/         # Onramp purchase components
│   └── ui/             # Shared UI components
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Component Patterns
- Use compound components for complex UI elements
- Implement proper TypeScript interfaces for props
- Use React Query for data fetching and caching
- Implement proper accessibility (ARIA labels, keyboard navigation)

## Testing
- Write unit tests for utility functions
- Test wallet connection flows
- Test onramp purchase flows
- Mock external API calls in tests

## Common Patterns
- Always handle wallet connection state
- Implement proper error boundaries
- Use proper loading states
- Validate transaction parameters
- Handle network switching
