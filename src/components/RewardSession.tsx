
import React from 'react';
import { Card } from "@/components/ui/card";

const RewardSession = () => {
  return (
    <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-neon-secondary mt-6 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Reward Session</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-neon-secondary">Daily Reward</span>
          <span className="text-white">100 NEON</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-neon-secondary">Time until next claim</span>
          <span className="text-white">24:00:00</span>
        </div>
      </div>
    </Card>
  );
};

export default RewardSession;
