import { utils } from "web3";
import { useWeb3 } from "../web3";

import "./header.css";

const Header = () => {
  const { active, account, balance, connect } = useWeb3();
  const shortAccount = account.slice(0, 4) + "..." + account.slice(-4);
  const readableBalance = parseFloat(utils.fromWei(balance)).toFixed(3);

  return (
    <header>
      <div className='content'>
        <h1>Fund</h1>
        {active ? (
          <div>
            <p>{shortAccount}</p>
            <p>{readableBalance} ETH</p>
          </div>
        ) : (
          <button onClick={connect}>Connect wallet</button>
        )}
      </div>
    </header>
  );
};

export default Header;
