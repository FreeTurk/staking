import React from "react";
import { useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";

export default function Home() {
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(0.001),
    receiver: "0x000000000000000000000000000000000000dEaD",
    type: "native",
  });

return (
    // Use your custom error component to show errors
    <div>
      {error && <ErrorMessage error={error} />}
      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer
      </button>
    </div>
  );


}