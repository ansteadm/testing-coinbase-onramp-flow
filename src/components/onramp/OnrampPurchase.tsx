'use client';

import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';

export function OnrampPurchase() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('100');
  const [selectedChain, setSelectedChain] = useState('base');

  const handleDirectLink = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      // First, try to get a session token using CDP API v2 JWT authentication
      console.log('Attempting to create session token with CDP API v2...');
      const sessionResponse = await fetch('/api/session-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addresses: { [address]: [selectedChain] }
        }),
      });

      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        
        if (sessionData.sessionToken) {
          // Use session token approach
          console.log('Session token created successfully!');
          const projectId = process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID;
          
          const sessionParams = new URLSearchParams({
            appId: projectId!,
            sessionToken: sessionData.sessionToken,
            defaultAsset: selectedToken,
            defaultNetwork: selectedChain,
            presetFiatAmount: amount,
            fiatCurrency: 'USD',
          });

          const sessionUrl = `https://pay.coinbase.com/buy?${sessionParams.toString()}`;
          
          const popup = window.open(
            sessionUrl, 
            'coinbase-onramp', 
            'width=500,height=700,scrollbars=yes,resizable=yes'
          );

          if (!popup) {
            setError('Please allow popups for this site to use the payment feature.');
          } else {
            console.log('Opened Coinbase Pay with session token');
          }
          return;
        }
      }

      // Fallback to direct URL approach if session token fails
      console.log('Session token failed, using direct URL approach');
      const projectId = process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID;
      
      const params = new URLSearchParams({
        appId: projectId!,
        addresses: JSON.stringify({ [address]: [selectedChain] }),
        assets: JSON.stringify([selectedToken]),
        defaultAsset: selectedToken,
        defaultNetwork: selectedChain,
        presetFiatAmount: amount,
        fiatCurrency: 'USD',
      });

      const directUrl = `https://pay.coinbase.com/buy?${params.toString()}`;
      
      const popup = window.open(
        directUrl, 
        'coinbase-onramp', 
        'width=500,height=700,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        setError('Please allow popups for this site to use the payment feature.');
      }

    } catch (error) {
      console.error('Error opening payment window:', error);
      setError('Failed to open payment window. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [address, selectedToken, amount, selectedChain]);

  if (!isConnected) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Please connect your wallet to continue</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Buy Crypto</h2>
      
      {/* Purchase Configuration */}
      <div className="space-y-4 mb-6">
        {/* Token Selection */}
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-black mb-1">
            Token
          </label>
          <select
            id="token"
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="ETH">ETH - Ethereum</option>
            <option value="USDC">USDC - USD Coin</option>
            <option value="USDT">USDT - Tether</option>
            <option value="BTC">BTC - Bitcoin</option>
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-black mb-1">
            Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Enter amount in USD"
          />
        </div>

        {/* Chain Selection */}
        <div>
          <label htmlFor="chain" className="block text-sm font-medium text-black mb-1">
            Network
          </label>
          <select
            id="chain"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="base">Base</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="optimism">Optimism</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>
      </div>

      {/* Purchase Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-black mb-2">Purchase Summary</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-black">Token:</span>
            <span className="font-medium text-black">{selectedToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Amount:</span>
            <span className="font-medium text-black">${amount} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Network:</span>
            <span className="font-medium capitalize text-black">{selectedChain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Wallet:</span>
            <span className="font-medium text-xs text-black">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-xs text-red-600 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <button
          onClick={handleDirectLink}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Opening...' : 'Buy Crypto with Card'}
        </button>

        <div className="text-sm text-gray-500 text-center">
          <p>Powered by Coinbase Onramp</p>
          <p>Secure • Fast • Easy</p>
        </div>
      </div>
    </div>
  );
}
