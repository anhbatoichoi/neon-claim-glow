
import ClaimCard from "@/components/ClaimCard";
import RewardSession from "@/components/RewardSession";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(!connected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="absolute top-4 right-4">
        <Button
          onClick={handleConnect}
          className="bg-transparent border-2 border-neon-primary text-neon-primary hover:bg-neon-primary hover:text-black transition-all duration-300 flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          {connected ? "Connected" : "Connect Wallet"}
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-purple bg-clip-text text-transparent mb-8">
            NEON REWARDS
          </h1>
          <ClaimCard />
          <RewardSession />
        </div>
      </div>
    </div>
  );
};

export default Index;
