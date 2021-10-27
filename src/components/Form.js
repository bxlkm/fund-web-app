import { useState } from "react";
import { useFund } from "../fund";
import { shortenAddress } from "../utils";
import { useWeb3 } from "../web3";
import { utils } from "web3";
import "./form.css";

const Form = () => {
  const { active, account } = useWeb3();
  const { owner, fundContract } = useFund();

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
          <p>Donate to {shortenAddress(owner)}</p>
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
        </form>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </main>
  );
};

export default Form;
