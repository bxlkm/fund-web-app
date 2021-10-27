import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import { ZERO_WEI } from "./constants";

const web3Context = createContext();

const Web3Provider = (props) => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(ZERO_WEI); // store balance in big number

  // connect to Ethereum provider exposed by MetaMask extension
  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      const web3 = new Web3(window.ethereum);

      const chainId = await web3.eth.getChainId();

      if (chainId !== 5) {
        alert("Please switch to Goerli in MetaMask");
        return;
      }

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const balance = await web3.eth.getBalance(account);

      setWeb3(web3);
      setAccount(account);
      setBalance(balance);
    } else {
      alert("Please install Metamask browser extension");
    }
  };

  const contextValue = {
    active: !!web3,
    account,
    balance,
    web3,
    connect,
  };
  return <web3Context.Provider value={contextValue} {...props} />;
};

export default Web3Provider;

export const useWeb3 = () => useContext(web3Context);
