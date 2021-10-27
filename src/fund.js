import { createContext, useCallback, useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useWeb3 } from "./web3";
import FundAbi from "./abi/fund.abi.json";

const fundContext = createContext();

const FundProvider = (props) => {
  const { web3, account } = useWeb3();
  const [fundContract, setFundContract] = useState();
  const [owner, setOwner] = useState();
  const [donated, setDonated] = useState();
  const [donators, setDonators] = useState();

  const updateInfo = useCallback(() => {
    fundContract.methods.getDonations(account).call().then(setDonated);
    fundContract.methods.getDonators().call().then(setDonators);
  }, [account, fundContract]);

  useEffect(() => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(
        FundAbi,
        "0x9EF8E9A8A9a8041daC87C48A6FFDdaA2dFaeB143"
      );
      contract.setProvider(web3);

      contract.methods.getOwner().call().then(setOwner);
      setFundContract(contract);
    }
  }, [web3, account]);

  useEffect(() => {
    if (fundContract) {
      updateInfo();
    }
  }, [fundContract, updateInfo]);

  const contextValue = {
    fundContract,
    owner,
    donated,
    donators,
    updateInfo,
  };

  return <fundContext.Provider value={contextValue} {...props} />;
};

export default FundProvider;

export const useFund = () => useContext(fundContext);
