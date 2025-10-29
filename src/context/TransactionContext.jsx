/* eslint-disable react-refresh/only-export-components */
import React, {  useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants.js';

export const TransactionContext = React.createContext();

const { ethereum } = typeof window !== 'undefined' ? window: {};

//Web3Provider
const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum); // ✅ v6 syntax
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
         addressTo: '', amount: '', keyword: '', message: '' });
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  //all interactions with inputs      
   const handleChange = (e, name) => {
          setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
        };

  //function for checking if account is connected
  const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert('Please install MetaMask.');

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
        if (accounts.length) {
          setCurrentAccount(accounts[0]);

          //getAllTransactions();
        } else {
          console.log('No accounts found');
        }
      } catch (error) {
          console.log(error);

          throw new Error('No ethereum object');
      }
      
  }

  //IF function for connecting the account
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts', });
      setCurrentAccount(accounts[0]);

    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  //send transaction
  const sendTransaction = async () => {
    console.log('🎯 1. Function started');
    try {
      console.log('🎯 2. Inside try block');
      if (!ethereum) return alert('Please install MetaMask.');
      console.log('🎯 3. Ethereum detected');

      //get the data from the form...
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = await getEthereumContract();
      //ethers calls the utils
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: ethers.toQuantity(parsedAmount),
        }],
      });
      
      //add to blockchain - review the transaction.sol from smart_contrac
      //if loading is delaying
      setIsLoading(true);
       console.log('🔄 Loading started - about to send transaction')

      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
       console.log(`📤 Transaction sent - ${transactionHash.hash}`)

       await transactionHash.wait();
       //if loading is sent
       setIsLoading(false);
       console.log(`Success - ${transactionHash.hash}`)
       //reset the form data post succcessful transaction
       setFormData({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
      });
      //transactions counting
      const transactionCount = await transactionsContract.getTransactionCount()
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log('❌ Transaction failed:', error);
      setIsLoading(false); // Reset Loading on error too!
    }
  };

  useEffect(() => {
  checkIfWalletIsConnect(); // Check on initial load
  
  if (ethereum) {
    // Listen for account changes
    ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount(""); // Clear account when disconnected
      }
    });

    // Listen for chain changes (optional)
    ethereum.on('chainChanged', (newChainId) => {
    console.log('Network changed to:', newChainId);
    window.location.reload();
    });
  }

  // Cleanup function
  return () => {
    if (ethereum) {
      ethereum.removeListener('accountsChanged', () => {});
      ethereum.removeListener('chainChanged', () => {});
    }
  };
}, []); // Empty dependency array = run once on mount

  return (
    <TransactionContext.Provider value={{
        connectWallet, 
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        getEthereumContract,
        isLoading,
        transactionCount
    }}
    >
      {children}
    </TransactionContext.Provider>
  );
}; 