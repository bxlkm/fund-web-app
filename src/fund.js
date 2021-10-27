import { createContext, useContext, useEffect } from "react";
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

  useEffect(() => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(
        FundAbi,
        "0x9EF8E9A8A9a8041daC87C48A6FFDdaA2dFaeB143"
      );
      contract.setProvider(web3);

      contract.methods.getOwner().call().then(setOwner);
      contract.methods.getDonations(account).call().then(setDonated);
      contract.methods.getDonators().call().then(setDonators);
      setFundContract(contract);
    }
  }, [web3, account]);

  const contextValue = {
    fundContract,
    owner,
    donated,
    donators,
  };

  return <fundContext.Provider value={contextValue} {...props} />;
};

export default FundProvider;

export const useFund = () => useContext(fundContext);
