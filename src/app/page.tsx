import { WalletConnection } from "@/components/wallet/WalletConnection";
import { OnrampPurchase } from "@/components/onramp/OnrampPurchase";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Header with centered title */}
        <header className="mb-6">
          {/* Centered title content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Coinbase Onramp Demo
            </h1>
            <p className="text-lg text-gray-600">
              Connect your wallet and buy crypto with your card
            </p>
          </div>
        </header>

        {/* Wallet Connection positioned absolute at far right edge */}
        <div className="absolute top-8 -right-20 z-10">
          <WalletConnection />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Onramp Purchase Section */}
            <OnrampPurchase />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Built with Next.js, OnchainKit, and RainbowKit
          </p>
        </footer>
      </div>
    </div>
  );
}
