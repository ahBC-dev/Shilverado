
import { RiEthFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";


const Services = () => {


  return (
    <div className="flex w-full justify-center items-center gradient-bg-welcome">
      <div className="flex flex-col lg:flex-row py-10 px-10 justify-center gap-12 lg:gap-16 xl:gap-28 items-center">
        <div className="flex flex-col justify-center items-center p-2 gap-10">
          <h1 className="text-gradientTwo text-3xl flex flex-wrap justify-center gap-1 lg:max-w-[400px] text-center">
            Transfer ETH 
             <RiEthFill className="text-blue-700 text-2xl ml-1 animate-bounce" />
            securely and efficiently through your MetaMask Wallet
          </h1>
          <div className="flex flex-col justify-center items-center">
            <a href="./Exchange" className="p-4 white-glassmorphism text-white flex items-center font-bold hover:text-gray-600 transition-colors group">
              Launch the Tool <IoIosArrowForward className="ml-1 group-hover:translate-x-1 transition-transform"/>
            </a>
          </div>

          <details className="blue-glassmorphism rounded-lg cursor-pointer group">
            <summary className="flex items-center justify-center  p-3 list-none">
              <IoIosWarning className="text-blue-700 text-3xl mr-1 font-bold"/>
              <span className="text-white text-sm font-medium">
                Important Testing Note
              </span>
              <IoIosArrowForward className="text-blue-600 text-lg transform group-open:rotate-90 transation-transform group-hover:translate-x-1"/>
            </summary>
            <div className="p-3 text-white text-sm max-w-[250px]">
              Use Sepolia Test ETH for testing only. Do not send real ETH to testnet addresses.
            </div>
          </details>

        </div>

        <div className="relative rounded-xl p-1">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-600 to-violet-500 rounded-xl blur opacity-75 animate-pulse">
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="../../images/Screenshot 2025-10-27 002228.png" 
              alt="tutorial1" 
              className="rounded-lg w-full max-w-md"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Services;