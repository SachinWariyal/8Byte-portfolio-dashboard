// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioTable from './Components/PortfolioTable';
import type { Holding, HoldingWithLive } from './types.ts';

const App: React.FC = () => {
  const initial: Holding[] = [
  { symbol: 'RELIANCE.NS', purchasePrice: 2500, qty: 50, sector: 'Energy' },
  { symbol: 'TCS.NS', purchasePrice: 3000, qty: 20, sector: 'Technology' },
  { symbol: 'INFY.NS', purchasePrice: 1400, qty: 30, sector: 'Technology' },
  { symbol: 'HDFCBANK.NS', purchasePrice: 1500, qty: 40, sector: 'Financials' },
  { symbol: 'ICICIBANK.NS', purchasePrice: 900, qty: 60, sector: 'Financials' },
  { symbol: 'ITC.NS', purchasePrice: 320, qty: 100, sector: 'Consumer Goods' },
  { symbol: 'LT.NS', purchasePrice: 2300, qty: 15, sector: 'Infrastructure' },
  { symbol: 'SBIN.NS', purchasePrice: 600, qty: 80, sector: 'Financials' },
  { symbol: 'MARUTI.NS', purchasePrice: 9200, qty: 5, sector: 'Auto' },
  { symbol: 'TATAMOTORS.NS', purchasePrice: 600, qty: 25, sector: 'Auto' }
];


  const [data, setData] = useState<HoldingWithLive[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/data', { tickers: initial });
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-4xl">📊</span>
          <h1 className="text-4xl font-extrabold text-blue-900">Dynamic Portfolio Dashboard</h1>
        </div>
        {isLoading && <p className="text-blue-600 text-center mb-6 animate-pulse italic">🔄 Updating live data...</p>}
        <PortfolioTable holdings={data} />
      </div>
    </div>
  );
};

export default App;
