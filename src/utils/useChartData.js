import { useState, useEffect } from 'react';
import { getHistoricalData } from './cryptoAPI';

export const useChartData = (coinId, days = 7) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      const data = await getHistoricalData(coinId, days);
      
      if (data && data.prices) {
        // Format data for Recharts
        const formattedData = data.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp).toLocaleDateString(),
          price: price,
          timestamp: timestamp
        }));
        setChartData(formattedData);
      }
      
      setLoading(false);
    };

    fetchChartData();
  }, [coinId, days]);

  return { chartData, loading };
};