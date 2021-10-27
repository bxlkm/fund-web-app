import Header from "./components/Header";
import { useWeb3 } from "./web3";

function App() {
  const { account, web3 } = useWeb3();
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
