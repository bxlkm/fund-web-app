import { createContext, useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useWeb3 } from "./web3";
import FundAbi from "./abi/fund.abi.json";

const fundContext = createContext();

const FundProvider = (props) => {
  const { web3 } = useWeb3();
  const [fundContract, setFundContract] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (web3) {
      const contract = new web3.eth.Contract(
        FundAbi,
        "0x23F9598cE9562f9B2D1414619CFEb105210DcdC7"
      );
      contract.setProvider(web3);
      setFundContract(contract);
    }
  }, [web3]);

  useEffect(() => {
    if (fundContract) {
      fundContract.methods.getOwner().call().then(setOwner); // request owner of the contract to whom donations will be sent
    }
  }, [fundContract]);

  const contextValue = {
    fundContract,
    owner,
  };

  return <fundContext.Provider value={contextValue} {...props} />;
};

export default FundProvider;

export const useFund = () => useContext(fundContext);
