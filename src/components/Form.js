import { useState } from "react";
import { useFund } from "../fund";
import { formatWei, shortenAddress } from "../utils";
import { useWeb3 } from "../web3";
import { utils } from "web3";
import "./form.css";

const Form = () => {
  const { active, account } = useWeb3();
  const { owner, fundContract, donated, donators } = useFund();

  const [sending, setSending] = useState(false);
  const [amount, setAmount] = useState("");

  const handleChange = (event) => {
    setAmount(event.currentTarget.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);

    let wei;
    try {
      wei = utils.toWei(amount);
    } catch {
      alert("Invalid amount");
      setAmount("");
      setSending(false);
      return;
    }

    try {
      await fundContract.methods.donate().send({
        value: wei,
        from: account,
      });
    } catch (e) {
      alert(e.message);
    }

    setAmount("");
    setSending(false);
  };

  return (
    <main>
      {active ? (
        <form onSubmit={handleSubmit}>
          <p>
            Donate to{" "}
            <a
              href={`https://goerli.etherscan.io/address/${owner}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {shortenAddress(owner)}
            </a>
          </p>
          <input
            type='text'
            autoComplete='off'
            placeholder='0.000'
            value={amount}
            onChange={handleChange}
          />
          <input
            type='submit'
            value={sending ? "Donating..." : "Donate"}
            disabled={sending}
          />
          <p>Your total donations: {donated ? formatWei(donated) : 0} ETH</p>
          <p>People donated: {donators}</p>
        </form>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </main>
  );
};

export default Form;
