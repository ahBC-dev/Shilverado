import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Get current prices with sparklines for crypto cards
export const getCryptoData = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
    );
    return response.data; // Returns 50 coins with ALL your current data
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
};

// Get historical data for analytics charts
export const getHistoricalData = async (coinId = 'bitcoin', days = 7) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
};

// NEW function - only top 5 coins
export const getTopCoins = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return null;
  }
};

