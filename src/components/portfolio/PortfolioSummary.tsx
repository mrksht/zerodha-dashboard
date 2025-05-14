import { ArrowUp, ArrowDown, DollarSign, Briefcase, Activity } from 'lucide-react';

interface PortfolioSummaryProps {
  data: {
    totalInvestment: number;
    currentValue: number;
    todayPnL: number;
    overallPnL: number;
    overallPnLPercentage: number;
  };
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ data }) => {

  console.log(data, 'data')
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const isProfitable = data.overallPnL >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Main Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-700 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
              Portfolio Value
            </h2>
            <p className="text-sm text-neutral-500 mt-1">Current market value of your investments</p>
          </div>
          <span className={`text-sm px-2 py-1 rounded-full ${
            isProfitable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isProfitable ? <ArrowUp className="h-3 w-3 inline" /> : <ArrowDown className="h-3 w-3 inline" />}
            {data.overallPnLPercentage.toFixed(2)}%
          </span>
        </div>
        
        <div className="flex items-baseline mb-1">
          <span className="text-3xl font-bold text-primary-800">{formatCurrency(data.currentValue)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border-r border-neutral-200 pr-4">
            <p className="text-sm text-neutral-500">Invested</p>
            <p className="text-lg font-medium text-neutral-800">{formatCurrency(data.totalInvestment)}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Overall P&L</p>
            <p className={`text-lg font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(data.overallPnL)}
            </p>
          </div>
        </div>
      </div>

      {/* Today's P&L Card */}
      <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="flex items-center mb-4">
          <Activity className="h-5 w-5 mr-2 text-primary-500" />
          <h2 className="text-lg font-semibold text-neutral-700">Today's Performance</h2>
        </div>
        
        <div className="flex items-baseline mb-4">
          <span className={`text-3xl font-bold ${data.todayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(data.todayPnL)}
          </span>
          <span className={`ml-2 text-sm ${data.todayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.todayPnL >= 0 ? '+' : ''}{(data.todayPnL / data.totalInvestment * 100).toFixed(2)}%
          </span>
        </div>
        
        <div className="h-16 bg-neutral-50 rounded overflow-hidden">
          {/* This would be a chart in a real app */}
          <div className="h-full w-full flex items-end">
            <div 
              className={`${data.todayPnL >= 0 ? 'bg-accent-500' : 'bg-red-500'} w-full`} 
              style={{ height: `${Math.min(Math.abs(data.todayPnL / data.totalInvestment * 100) * 5, 100)}%` }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;