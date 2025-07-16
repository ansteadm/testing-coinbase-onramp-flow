'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { useEffect } from 'react';

export function WalletConnection() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Auto-switch to Base chain when connected
  useEffect(() => {
    if (isConnected && chainId !== base.id) {
      switchChain?.({ chainId: base.id });
    }
  }, [isConnected, chainId, switchChain]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectButton showBalance={false} />
      
      {isConnected && chainId !== base.id && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <p className="text-yellow-800">
            Please switch to Base network for the best experience with Coinbase Onramp.
          </p>
          <button
            onClick={() => switchChain?.({ chainId: base.id })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Switch to Base
          </button>
        </div>
      )}
    </div>
  );
}
