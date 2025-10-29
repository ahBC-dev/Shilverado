import React, { useContext } from 'react';

import { TransactionContext } from "../context/TransactionContext";

import CryptoLoader from './CryptoLoader';

import ThreeDEthCard from "./3DEthCard"; // Import the 3D card



const Input = ({placeholder, name, type, value, handleChange}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" 
  />
);

const Welcome = () => {
  const { 
    connectWallet, 
    currentAccount, 
    handleChange, 
    formData, 
    sendTransaction, 
    isLoading
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    console.log('📝 Form Data:', formData);

    e.preventDefault();
    console.log('form Submitted');
    if (!addressTo || !amount || !keyword || !message) {
      console.log('🚨 Missing form data');
      return;
    } 

    sendTransaction();
  };

  return (
   <div className="flex justify-center items-center pt-10">
    <div className="flex lg:flex-row flex-col md:p-20 py-12 px-4 lg:gap-20 lg:w-max-[1000px]">
      <div className="flex justify-center items-center w-full flex-1 flex-col">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 font-light">
          Send Crypto <br /> across the world
        </h1>
        <p className="mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          Explore the crypto world. 
        </p>
        {/*If Account is connected, it will be hidden*/}
        {!currentAccount && 
        (
          <button
           type="button"
           className={`flex flex-row justify-center items-center my-5 p-3 rounded-full cursor-pointer w-full text-white font-bold mt-10 mb-0  hover:bg-white hover:text-black transition-all duration-300 ease-in-out white-glassmorphism`}
           onClick={connectWallet}
          >
          <p className="text-base ">Connect Walllet</p>
        </button>
        )}


      </div>

         {/* Replace the original card with the 3D version */}
        <div className="flex flex-col flex-1 w-full justify-start items-center sm:gap-5 lg:gap-2 sm:max-w-xs lg:max-w-full mt-10 lg:mt-0">
          <ThreeDEthCard />

          {/* Input form section */}
          <div className="p-5 w-full flex flex-col justify-start items-center white-glassmorphism mt-5 lg:max-w-xs">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className=" w-full my-2 overflow-y-auto h-full" >
              {isLoading ? (
                  <div className=" text-center py-4">
                    <CryptoLoader />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white p-2 w-full rounded-full cursor-pointer mt-2 blue-glassmorphism font-bold hover:bg-white hover:text-black transition-all duration-300 ease-in-out overflow-hidden"
                  >
                    Send Now
                  </button>
                )}
              </div>
          </div>
        </div>
    </div>
   </div>
  );
};

export default Welcome;