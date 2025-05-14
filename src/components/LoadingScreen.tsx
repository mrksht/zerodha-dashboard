import { BarChart } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <div className="text-center">
        <BarChart className="h-16 w-16 text-primary-500 mx-auto animate-pulse-slow" />
        <h2 className="mt-4 text-xl font-semibold text-primary-800">Loading...</h2>
        <div className="mt-4">
          <div className="w-16 h-1 bg-accent-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;