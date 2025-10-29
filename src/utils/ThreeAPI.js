// In ThreeAPI.js - THIS WORKS
export const getGlobalMetrics = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    const data = await response.json();
    
    return {
      totalMarketCap: {
        value: data.data.total_market_cap.usd,
        change24h: data.data.market_cap_change_percentage_24h_usd
      },
      tradeVolume: {
        value: data.data.total_volume.usd,
        change24h: data.data.market_cap_change_percentage_24h_usd
      },
      btcDominance: {
        value: data.data.market_cap_percentage.btc,
        change24h: 0
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};