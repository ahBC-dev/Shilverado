import { useState, useEffect } from 'react';
import CryptoLoader from './CryptoLoader';

import { IoIosArrowForward } from "react-icons/io";

import { getGlobalMetrics } from '../utils/ThreeAPI';

const MiniStats = () => {
    const [marketData, setMarketData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGlobalMetrics(); //coinbase function
            setMarketData(data);
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    //format large nums
      const formatNumber = (num) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num}`;
      };

    // Stat box component
    const StatBox = ({ title, value, change, isPositive }) => (
        <div className="flex-1 white-glassmorphism p-3 rounded-xl hover:scale-105 transition-transform duration-300 w-[170px] h-[150px]">
            <h3 className="text-gray-400 text-base font-medium mb-2">{title}</h3>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <div className={`flex items-center text-sm font-bold ${
                isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
                {isPositive ? '↗' : '↘'} {change}
            </div>
        </div>
    );

    return (
        <div className='flex flex-col max-w-[730px] items-center w-full'>
            <div className='flex flex-col gap-3 items-start pt-8 px-8 pb-5 '>
                <h1 className='text-gradient text-3xl'>Market Stats</h1>
                <p className='text-sm text-white'>The overall market cap represents the total value of all cryptocurrencies combined in the global market.</p>
                <details className='cursor-pointer group flex flex-col gap-2'>
                    <div className='text-sm text-white'>
                        The overall cryptocurrency market capitalization measures the total value of all 
                        digital assets in circulation by multiplying each coin’s 
                        price by its circulating supply and summing them all together. 
                        It provides a snapshot of the market’s size, growth, 
                        and investor sentiment — showing whether the crypto industry as a whole is expanding or contracting. 
                        A rising market cap often indicates growing confidence and adoption, 
                        while a falling cap may signal a market correction or declining interest.
                    </div>
                    <summary className='list-none flex items-center gap-1 text-blue-700 hover:text-blue-600 transition-colors'>
                        <span className='text-sm transition-colors'>
                            Read more
                        </span>
                        <IoIosArrowForward className='text-lg text-blue transform group-open:rotate-90 transition-transform' />
                    </summary>
                </details>
            </div>
            <div className="w-full overflow-x-auto  px-8 pb-8">
                <div className='flex gap-3 min-w-min'>
                    {/* Market Cap */}
                    <StatBox
                        title='Total MarketCap'
                        value={marketData ? formatNumber(marketData.totalMarketCap.value) : <CryptoLoader />}
                        change={marketData ? `${marketData.totalMarketCap.change24h?.toFixed(2)}%` : "0%"}
                        isPositive={marketData?.totalMarketCap.change24h > 0}

                    />
                    {/* 24h Volume */}
                    <StatBox
                        title='24h Trade Volume'
                        value={marketData ? formatNumber(marketData.tradeVolume.value) : <CryptoLoader />}
                        change={marketData ? `${marketData.tradeVolume.change24h?.toFixed(2)}%` : "0%"}
                        isPositive={marketData?.tradeVolume.change24h > 0}
                    />
                    <StatBox
                        title='BTC Dominance'
                        value={marketData ? `${marketData.btcDominance.value?.toFixed(1)}%` : <CryptoLoader />}
                        change={marketData ? `${marketData.btcDominance.change24h?.toFixed(2)}%` : "0%"}
                        isPositive={marketData?.btcDominance.change24h > 0}
                    />
                </div>
            </div>         
        </div>
    )
}

export default MiniStats;