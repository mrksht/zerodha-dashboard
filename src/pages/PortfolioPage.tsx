import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Info, Activity, Briefcase, DollarSign, AlertCircle, Loader2 } from 'lucide-react';
import { portfolioService } from '../services/api';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import HoldingsList from '../components/portfolio/HoldingsList';

interface KiteHolding {
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercentage: number;
}

interface PortfolioData {
  totalInvestment: number;
  currentValue: number;
  todayPnL: number;
  overallPnL: number;
  overallPnLPercentage: number;
  holdings: KiteHolding[];
}

const PortfolioPage = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolio();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();

    // Refresh data every minute
    const intervalId = setInterval(fetchPortfolio, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="mt-4 text-neutral-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white shadow-md p-6 mt-4">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">Error</h2>
        </div>
        <p className="text-neutral-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="rounded-lg bg-white shadow-md p-6 mt-4">
        <div className="flex items-center text-neutral-600 mb-4">
          <Info className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">No Portfolio Data</h2>
        </div>
        <p className="text-neutral-700">
          No holdings found in your portfolio. Start trading to see your investments here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary-800 mb-2">Portfolio</h1>
        <p className="text-neutral-600">
          View and manage your investments and track performance
        </p>
      </header>

      <PortfolioSummary data={portfolioData} />
      
      <HoldingsList holdings={portfolioData.holdings} />
    </div>
  );
};

export default PortfolioPage;