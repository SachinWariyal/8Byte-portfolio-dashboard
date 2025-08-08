import React, { useMemo } from 'react';
import type { HoldingWithLive } from '../types.ts';

interface Props {
  holdings: HoldingWithLive[];
}

const PortfolioTable: React.FC<Props> = ({ holdings }) => {
  const sectors = useMemo(() => {
    const grouped: { [key: string]: HoldingWithLive[] } = {};
    holdings.forEach(h => {
      if (!grouped[h.sector]) grouped[h.sector] = [];
      grouped[h.sector].push(h);
    });
    return grouped;
  }, [holdings]);

  return (
    <div className="overflow-x-auto">
      {Object.entries(sectors).map(([sector, rows]) => {
        const totalInvestment = rows.reduce((sum, r) => sum + r.purchasePrice * r.qty, 0);
        const presentValue = rows.reduce((sum, r) => sum + r.cmp * r.qty, 0);
        const gain = presentValue - totalInvestment;

        return (
          <div key={sector} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{sector}</h2>
            <div className="mb-2 text-sm text-gray-700">
              <strong>Total Investment:</strong> ₹{totalInvestment.toFixed(2)} | <strong>Current:</strong> ₹{presentValue.toFixed(2)} | <strong>Gain/Loss:</strong>{' '}
              <span className={gain >= 0 ? 'text-green-600' : 'text-red-600'}>
                ₹{gain.toFixed(2)}
              </span>
            </div>
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Symbol</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Purchase Price</th>
                  <th className="p-2 border">Investment</th>
                  <th className="p-2 border">CMP</th>
                  <th className="p-2 border">Present Value</th>
                  <th className="p-2 border">Gain/Loss</th>
                  <th className="p-2 border">P/E</th>
                  <th className="p-2 border">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const investment = row.purchasePrice * row.qty;
                  const value = row.cmp * row.qty;
                  const gl = value - investment;

                  return (
                    <tr key={row.symbol} className="text-center">
                      <td className="p-2 border">{row.symbol}</td>
                      <td className="p-2 border">{row.qty}</td>
                      <td className="p-2 border">₹{row.purchasePrice}</td>
                      <td className="p-2 border">₹{investment.toFixed(2)}</td>
                      <td className="p-2 border">₹{row.cmp.toFixed(2)}</td>
                      <td className="p-2 border">₹{value.toFixed(2)}</td>
                      <td className={`p-2 border ${gl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{gl.toFixed(2)}
                      </td>
                      <td className="p-2 border">{row.pe ?? '—'}</td>
                      <td className="p-2 border">{row.earnings ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioTable;
