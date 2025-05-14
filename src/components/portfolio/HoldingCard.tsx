import { ArrowUp, ArrowDown } from 'lucide-react';

interface Holding {
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercentage: number;
}

interface HoldingCardProps {
  holding: Holding;
}

const HoldingCard: React.FC<HoldingCardProps> = ({ holding }) => {
  const isProfitable = holding.pnl >= 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-semibold text-neutral-800">{holding.symbol}</h3>
          <p className="text-xs text-neutral-500">{holding.exchange}</p>
        </div>
        <div className={`text-sm font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'} flex items-center`}>
          {isProfitable ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 mr-1" />
          )}
          {Math.abs(holding.pnlPercentage).toFixed(2)}%
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-xs text-neutral-500">Qty</p>
          <p className="font-medium text-neutral-800">{holding.quantity}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Avg Price</p>
          <p className="font-medium text-neutral-800">₹{holding.averagePrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">LTP</p>
          <p className="font-medium text-neutral-800">₹{holding.lastPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-neutral-500">P&L</p>
        <p className={`font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
          ₹{holding.pnl.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default HoldingCard;