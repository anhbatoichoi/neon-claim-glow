
import ClaimCard from "@/components/ClaimCard";
import RewardSession from "@/components/RewardSession";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-purple bg-clip-text text-transparent mb-8">
          NEON REWARDS
        </h1>
        <ClaimCard />
        <RewardSession />
      </div>
    </div>
  );
};

export default Index;
