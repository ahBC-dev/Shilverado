import ThreeDEthCard from "./3DEthCard"
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { IoTrendingDownSharp, IoTrendingUpSharp } from "react-icons/io5";

import CryptoLoader from "./CryptoLoader";
//crypto
import { getTopCoins } from "../utils/cryptoAPI";
import { useEffect } from "react";
//news
import { fetchCryptoNews } from "../utils/NewsAPI";


const WelcomeTwo = () => {
    const { connectWallet, currentAccount } = useContext(TransactionContext);

    const [cryptoNews, setCryptoNews] = useState([])
    const [cryptoData, setCryptoData] = useState(null);

    const [isLoading, setIsLoading] = useState(true); //for crypto
    const [newsLoading, setNewsLoading] = useState(true); //for news
    const [error, setError] = useState(null); //for crypto
    const [newsError, setNewsError] = useState(null); //for news

    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true)
                const data = await getTopCoins();
                setCryptoData(data);
                setError(null)
            } catch (error) {
                setError(error.message)
                setTimeout(() => {
                    
                }, 5000);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // 30 seconds
        return () => clearInterval(interval);
    }, []);

    {/*news card*/}
      useEffect(() => {
        const fetchNews = async () => {
            try{
                setNewsLoading(true)
                const news = await fetchCryptoNews();
                setCryptoNews(news.slice(0, 3)); // Show 3 latest
                setNewsError(null)
            } catch (error) {
                setNewsError(error.message)
            } finally {
                setNewsLoading(false)
            }
        };
        fetchNews();
      }, []);

      const CoinCard = ({name, price, change, logo, symbol}) => (
        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-2 justify-center items-center">
                <img src={logo} alt={name} className="w-7 h-7" />
                <p className="text-sm font-semibold text-white">{symbol.toUpperCase()}</p>
                <p className="text-xs text-gray-400">{name}</p>
            </div>
            <div className="flex flex-row gap-10 justify-center items-center">
                <p className="text-base flex font-semibold justify-center items-center text-white">${price}</p>
                <div className={`flex items-center justify-center text-xs font-bold ${
                    change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                    {change >= 0 ? (
                        <IoTrendingUpSharp className="font-semibold mr-1"/>
                    ) : (
                        <IoTrendingDownSharp className="font-semibold mr-1"/>)}
                    {change?.toFixed(2)}% 
                </div>
            </div>
        </div>
      )
      // News Card
        const NewsCard = ({ title, source, image, url }) => (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex gap-3 hover:bg-white/5 p-2 transition-all duration-300"
        >
            <img src={image} alt={title} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium line-clamp-2">{title}</p>
            <p className="text-gray-400 text-xs mt-1">{source}</p>
            </div>
        </a>
        );

    return (
        <div className="gradient-bg-welcome w-full flex items-center justify-center pt-10">
            <div className="flex flex-col lg:flex-row justify-center py-12 px-5 md:p-20 items-center gap-8 lg:gap-11 xl:gap-20 2xl:gap-28 w-full">
                <div className="flex justify-center items-center  w-full flex-1 flex-col gap-4 max-w-[500px]">
                    <h1 className="text-gradient text-3xl w-full text-center">
                        Your Wallet :
                    </h1>
                    <div className="flex flex-col w-full items-center gap-2">
                        <ThreeDEthCard />
                        {/*If Account is connected, it will be hidden*/}
                        {!currentAccount && 
                        (
                        <button
                        type="button"
                        className={`flex flex-row  justify-center p-3 rounded-xl cursor-pointer w-full text-white font-bold mb-0 hover:bg-white hover:text-black transition-all duration-300 ease-in-out white-glassmorphism max-w-[370px]`}
                        onClick={connectWallet}
                        >
                        <p className="text-base">Connect Wallet</p>
                        </button>
                        )}
                    </div>
                    <h1 className=" text-3xl mt-2 text-gradientTwo w-full text-center">
                        Your Security
                    </h1>
                </div>

                <div className="flex flex-col w-full mt-8  lg:max-w-[460px]">
                    {/* crpyto card */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col p-4 bg-transparent lg:bg-gray-900  rounded-xl gap-5">
                            <div className="flex flex-row justify-between">
                               <p className="text-gradient text-sm">Most popular Coins</p>
                               <a href="./Analytics" className="flex flex-row justify-center items-center text-xs text-gray-400 hover:text-gray-300">View All coins <IoIosArrowForward /></a>
                            </div>
                            {/* Crypto Content - WITHIN THE BOX */}
                            <div className="flex flex-col gap-5 min-h-[150px]">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-32">
                                        <CryptoLoader />
                                    </div>
                                ) : error ? (
                                    <div className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg">
                                        Error: {error}
                                    </div>
                                ) : !cryptoData || cryptoData.length === 0 ? (
                                    <div className="text-gray-400 text-center p-4 bg-gray-400/10 rounded-lg">
                                        No data available
                                    </div>
                                ) : (
                                    cryptoData.map(coin =>(
                                        <CoinCard
                                            key={coin.id}
                                            name={coin.name}
                                            price={coin.current_price}
                                            change={coin.price_change_percentage_24h}
                                            logo={coin.image}
                                            symbol={coin.symbol}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                        {/* news card */}
                        <div className="flex flex-col w-full rounded-xl">
                            <div className="flex flex-col p-4 bg-transparent lg:bg-gray-900  text-white rounded-xl gap-3">
                                <div className="flex flex-row justify-between">
                                    <p className="text-gradient text-sm">Latest News</p>
                                    <p className="flex flex-row justify-center items-center text-xs text-gray-400 hover:text-gray-300 cursor-pointer">View All News<IoIosArrowForward /></p>
                                </div>
                                <div className="flex flex-col gap-3 min-h-[150px]">
                                    {newsLoading ? (
                                        <div className="flex items-center justify-center h-32">
                                            <CryptoLoader />
                                        </div>
                                    ) : newsError ? (
                                        <div className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg">
                                            Error: {newsError}
                                        </div>
                                    ) : !cryptoNews || cryptoNews.length === 0 ? (
                                        <div className="text-gray-400 text-center p-4 bg-gray-400/10 rounded-lg">
                                            No news available
                                        </div>
                                    ) : (
                                        cryptoNews.map(article => (
                                            <NewsCard
                                                key={article.id}
                                                title={article.title}
                                                source={article.news_site}
                                                image={article.thumb_2x}
                                                url={article.url}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeTwo
