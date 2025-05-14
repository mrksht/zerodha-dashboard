import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import HoldingCard from './HoldingCard';

interface Holding {
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercentage: number;
}

interface HoldingsListProps {
  holdings: Holding[];
}

const HoldingsList: React.FC<HoldingsListProps> = ({ holdings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Holding>('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter holdings based on search term
  const filteredHoldings = holdings.filter(holding => 
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort holdings based on sort field and direction
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Handle sorting
  const handleSort = (field: keyof Holding) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-primary-800">Your Holdings</h2>
          
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Holdings table for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('symbol')}
              >
                <div className="flex items-center">
                  Stock
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center">
                  Quantity
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('averagePrice')}
              >
                <div className="flex items-center">
                  Avg. Price
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastPrice')}
              >
                <div className="flex items-center">
                  LTP
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pnl')}
              >
                <div className="flex items-center">
                  P&L
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-100">
            {sortedHoldings.map((holding) => (
              <tr key={holding.symbol} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{holding.symbol}</div>
                      <div className="text-xs text-neutral-500">{holding.exchange}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {holding.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  ₹{holding.averagePrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  ₹{holding.lastPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{holding.pnl.toFixed(2)}
                  </div>
                  <div className="text-xs flex items-center">
                    {holding.pnlPercentage >= 0 ? (
                      <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={holding.pnlPercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {Math.abs(holding.pnlPercentage).toFixed(2)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Holdings cards for mobile */}
      <div className="md:hidden">
        {sortedHoldings.length > 0 ? (
          <div className="divide-y divide-neutral-200">
            {sortedHoldings.map((holding) => (
              <HoldingCard key={holding.symbol} holding={holding} />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-neutral-500">
            No stocks found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsList;