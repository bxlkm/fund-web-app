import { formatWei, shortenAddress } from "../utils";
import { useWeb3 } from "../web3";

import "./header.css";

const Header = () => {
  const { active, account, balance, connect } = useWeb3();
  const shortAccount = shortenAddress(account);
  const readableBalance = formatWei(balance);

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
