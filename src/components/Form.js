import { useFund } from "../fund";
import { shortenAddress } from "../utils";
import { useWeb3 } from "../web3";
import "./form.css";

const Form = () => {
  const { active } = useWeb3();
  const { owner } = useFund();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      {active ? (
        <form onSubmit={handleSubmit}>
          <p>Donate to {shortenAddress(owner)}</p>
          <input type='text' autoComplete='off' />
          <input type='submit' value='Donate' />
        </form>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </main>
  );
};

export default Form;
