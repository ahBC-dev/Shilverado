import { useState } from 'react';
import CoinSelector from '../components/CoinSelector';

import { useChartData } from '../utils/useChartData';

const Analytics = () => {
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [timeframe, setTimeframe] = useState('7'); //days

    //loader of chart's data
    const { chartData, loading } = useChartData(selectedCoin, timeframe);

    //Mock data - replace with actual data fetching later
    const timeframes = [
        { date: '24H', value: '1' },
        { date: '7D', price: '7' },
        { date: '30D', price: '30' },
        { date: '1Y', price: '365' },
    ];

    if (loading) {
        return <div className='min-h-screen gradient-bg-welcome flex items-center justify-center'>
            <div className='text-white text-xl'>
                Loading chart data...
            </div>
        </div>;

    }

    return (
        <div className="min-h-screen py-8">
            <div className='max-w-6xl mx-auto px-4'>
                <h1 className='text-4xl text-gradient text-center mb-2'>Market Analytics</h1>
                <p className='text-white text-center mb-8'>
                    Professional charts and market insights
                </p>

                {/* Controls */}
                <div className='flex gap-2'>
                    <CoinSelector 
                        selectedCoin={selectedCoin} 
                        onCoinChange={setSelectedCoin} 
                    />
                
                    {/*Timeframe Selector*/}
                    <div className='flex gap-2'>
                        {timeframes.map((tf) => (
                            <button
                                key={tf.value}
                                onClick={() => setTimeframe(tf.value)}
                                className={`px-4 py-2 rounded-lg ${timeframe === tf.value 
                                    ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white' 
                                    : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                {tf.date}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <div className='bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10'>
                    <PriceChart data={chartData} />
                </div>

                {/* stats */}
                {chartData.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
                    <div className='bg-white/5 p-4 rounded-lg text-center'>
                        <p className='text-gray-400'>Current Price</p>
                        <p className='text-2xl text-white font-bold'>
                            ${chartData[chartData.length - 1]?.price?.toLocaleString()}
                        </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg text-center'>
                        <p className='text-gray-400'>Price Change</p> {/* Changed h2 to p */}
                        <p className={`text-2xl font-bold ${
                            chartData[chartData.length - 1]?.price >= chartData[0]?.price
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                            {((chartData[chartData.length - 1]?.price - chartData[0]?.price) / chartData[0]?.price * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg text-center'>
                        <p className='text-gray-400'>Market Cap</p> {/* Changed h2 to p */}
                        <p className='text-2xl text-white font-bold'>{chartData.length}</p>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Analytics;