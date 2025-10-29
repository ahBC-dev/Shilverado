import { IoTrendingDownSharp, IoTrendingUpSharp } from "react-icons/io5";
import { useCryptoData } from "../hooks/useCryptoData";
//mini chart
import MiniChart from "../hooks/MiniChart";
import CryptoLoader from "./CryptoLoader";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const Crypto = () => {
    const { cryptoData, isLoading, error } = useCryptoData();
    // ✅ Now check states AFTER useEffect setup
    if (isLoading) return <CryptoLoader />
    if (error) return <div>Error: {error.message}</div>
    if (!cryptoData || cryptoData.length === 0) return <div>No data found</div>

    //coin card component
    const CoinCard = ({ name, price, change, logo, sparkline, symbol, marketCap }) => (
    <div className="flex flex-row items-center justify-between px-2 border-gray-700 hover:bg-gray-800/30 transition-colors cursor-pointer min-w-screen">
        {/* Left Section - Coin Info */}
        <div className="flex items-center gap-2 w-full">
        <img src={logo} alt={name} className="w-7 h-7 rounded-full" />
        <div className="flex flex-row items-center gap-1">
            <span className="text-white font-medium text-base">{symbol.toUpperCase()}</span>
            <span className="text-gray-400 text-xs">{name}</span>
        </div>
        </div>

        {/* Middle Section - Price & Stats */}
        <div className="flex items-center w-full h-[75px] justify-end md:gap-x-16 lg:gap-x-20">
        {/* Price */}
        <div className="text-white font-medium text-base w-20 text-right">
            ${price?.toLocaleString()}
        </div>

        {/* 24h Change */}
        <div className={`flex items-center justify-end w-20 text-base font-bold ${
            change >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
            {change >= 0 ? '+' : '-'} {change?.toFixed(2)}%
        </div>

        {/* Market Cap */}
        <div className="text-gray-300 text-sm w-28 text-right hidden md:block">
            ${(marketCap / 1e9).toFixed(2)}B
        </div>

        {/* Mini Chart */}
        <div className="w-18 hidden md:block">
            <MiniChart data={sparkline} change={change} />
        </div>
        </div>
    </div>
    );
    
    // ✅ Now render your data
    return (
        <div className="flex justify-center items-center gradient-bg-welcome">
            <div className="flex flex-col items-center pb-10 w-full max-w-[1000px]">
                {/*Crypto Header*/}
                <div className="text-white flex text-start items-start w-full ml-3">
                    <details className="flex flex-col gap-2 group w-full p-1">
                        <div className="text-xs text-gray-500">
                            Get a comprehensive snapshot of all cryptocurrencies available on Silversed. This page displays the latest prices, 24-hour trading volume, price changes, and market capitalizations for all cryptocurrencies on Silversed. Users can quickly access key information about these digital assets and access the trade page from here.
                        </div>
                        <summary className="list-none flex justify-between">
                            <span className="text-gradientTwo text-base">Top Tokens by Market Capitalization</span>
                            <span className="text-gray-500 hover:text-gray-400 cursor-pointer text-sm flex items-center gap-1 mr-2">Expand<IoIosArrowUp className="transform group-open:rotate-180 transition-transform"/></span>
                        </summary>
                    </details>
                </div>
                {/*Crypto Prices Grid*/}
                <div className="flex justify-center items-center w-full overflow-x-auto">
                    
                        <div className="flex flex-col mt-3 p-2 pt-3 ">
                            <div className="flex flex-row items-center justify-between px-2 pb-3">
                                <p className="text-gray-400 text-sm">Name</p>
                                <div className="flex items-center w-full justify-end gap-x-14 md:gap-x-28 lg:gap-x-32 ">
                                    <p className="text-gray-400 text-sm">Price</p>
                                    <p className="text-gray-400 text-sm ">Change</p>
                                    <p className="text-gray-400 text-sm hidden md:block">Market Cap</p>
                                    <p className="text-gray-400 text-sm hidden md:block">Chart</p>
                                </div>
                            </div>
                            {cryptoData?.map(coin => (
                                <CoinCard 
                                    key={coin.id}
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    price={coin.current_price}
                                    change={coin.price_change_percentage_24h}
                                    logo={coin.image}
                                    marketCap={coin.market_cap}
                                    sparkline={coin.sparkline_in_7d?.price} // 7-day sparkline data
                                /> 
                            ))}
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Crypto
