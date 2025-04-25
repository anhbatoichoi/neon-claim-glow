
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ClaimCard = () => {
  const { toast } = useToast();
  const [claimed, setClaimed] = React.useState(false);

  const handleClaim = () => {
    setClaimed(true);
    toast({
      title: "🎉 Reward Claimed!",
      description: "100 NEON tokens have been added to your balance",
    });
  };

  return (
    <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-neon-primary p-6 space-y-6">
      <div className="flex items-center justify-center space-x-2">
        <Star className="w-6 h-6 text-neon-primary animate-pulse-neon" />
        <h2 className="text-2xl font-bold text-white">Daily Reward</h2>
        <Star className="w-6 h-6 text-neon-primary animate-pulse-neon" />
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-neon-primary text-lg">100 NEON tokens</p>
        <Button
          onClick={handleClaim}
          disabled={claimed}
          className={`w-full bg-transparent border-2 border-neon-primary text-neon-primary hover:bg-neon-primary hover:text-black transition-all duration-300 ${
            !claimed && 'animate-glow'
          }`}
        >
          {claimed ? "Claimed" : "Claim Now"}
        </Button>
      </div>
    </Card>
  );
};

export default ClaimCard;
