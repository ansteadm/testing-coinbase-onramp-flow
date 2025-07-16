# Coinbase Onramp Session Token Setup

## Important: Session Token Requirement

Your Coinbase Developer Platform project is configured to require **secure initialization** using session tokens. This is a security feature that ensures onramp transactions are properly authenticated.

## Current Implementation

The current implementation now includes **CDP API v2 JWT authentication** for proper session token generation. The system tries multiple approaches in order:

1. **CDP API v2** with JWT bearer token authentication (ES256 signed)
2. **OnchainKit API** with bearer token authentication  
3. **Direct Project ID** approach as fallback

## Setting Up CDP API v2 Session Tokens

To use the proper CDP API v2 authentication:

### 1. Generate CDP API Credentials

1. Go to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Navigate to your project settings
3. Click "API Keys" in the left sidebar
4. Click "Create API Key"
5. Download the JSON file containing your credentials
6. The file contains `name` (API Key ID) and `private_key` fields

### 2. Update Environment Variables

Add these to your `.env.local`:

```bash
# Existing variables
NEXT_PUBLIC_COINBASE_PROJECT_ID=43db276f-0f79-46ad-bff0-ad3631988b22
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=7575f23cff9923ea77dae3ae6a8fdced

# CDP API v2 Credentials
COINBASE_API_KEY_ID=your_api_key_name_here
COINBASE_API_SECRET=your_private_key_here

# OnchainKit API Key (alternative)
ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
```

**Important**: The `COINBASE_API_SECRET` should be the private key from your downloaded CDP API key file. The CDP SDK will handle the proper formatting.

### 3. How It Works

The implementation now uses the official **@coinbase/cdp-sdk** for proper CDP API v2 authentication:

1. **CDP SDK Authentication**: Uses the official SDK's `generateJwt` function for proper ES256 JWT generation
2. **Correct API Endpoints**: Uses the proper `api.developer.coinbase.com/onramp/v1/buy/session` endpoint
3. **Multiple Fallbacks**: Tries CDP SDK authentication, then OnchainKit, then direct project ID
4. **Error Handling**: Graceful fallback ensures the app always works

The implementation follows the [CDP API v2 Authentication Guide](https://docs.cdp.coinbase.com/api-reference/v2/authentication#typescript) exactly using the official SDK.

### 3. How It Works

The implementation now includes proper CDP API v2 authentication:

1. **JWT Generation**: Creates ES256-signed JWT tokens with proper headers and claims
2. **API Authentication**: Uses bearer token authentication as per CDP API v2 spec
3. **Multiple Fallbacks**: Tries CDP API v2, then OnchainKit, then direct project ID
4. **Error Handling**: Graceful fallback ensures the app always works

The JWT implementation follows the [CDP API v2 Authentication Guide](https://docs.cdp.coinbase.com/api-reference/v2/authentication#typescript) exactly.

### 4. Testing Your Setup

With your current credentials:
- **API Key ID**: `55af0813-965d-4728-ab2a-bac4716c1aa3` ✅
- **OnchainKit Key**: `KUT0nZhQhbiZT8OwowmvCkiwOASIXo8u` ✅
- **CDP API Secret**: Configured ✅

The system will now try CDP API v2 authentication first, then fall back to OnchainKit if needed.

## Current Status

- ✅ Project ID: Configured
- ✅ WalletConnect: Configured  
- ⚠️ Session Tokens: Using enhanced project ID approach (should work for most cases)
- 🔄 Production Session Tokens: Requires CDP API credentials (optional)

## Testing

The current implementation should work for testing and development. If you encounter session token errors, check:

1. Your project ID is correct
2. Your wallet is connected
3. You're on a supported network (Base recommended)

## Resources

- [Coinbase Onramp Documentation](https://docs.cdp.coinbase.com/onramp-&-offramp/introduction/welcome)
- [CDP API Documentation](https://docs.cdp.coinbase.com/onramp/docs/api-initializing)
- [Session Token API](https://docs.cdp.coinbase.com/onramp/docs/api-initializing#getting-an-coinbase-onramp-buysell-session-token)
