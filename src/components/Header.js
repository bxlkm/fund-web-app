import { utils } from "web3";
import { useWeb3 } from "../web3";

const Header = () => {
  const { active, account, balance, connect } = useWeb3();
  const shortAccount = account.slice(0, 4) + "..." + account.slice(-4);

  return (
    <header>
      <h1>Donate</h1>
      {active ? (
        <div>
          <p>{shortAccount}</p>
          <p>{utils.fromWei(balance)}</p>
        </div>
      ) : (
        <button onClick={connect}>Connect wallet</button>
      )}
    </header>
  );
};

export default Header;
