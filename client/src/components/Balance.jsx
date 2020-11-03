import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  //To get total balance
  const amounts = transactions.map((transaction) => transaction.amount); //gets all the amounts into an array
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2); //adds all amounts together and adds toFixed to get 2 decimal places

  return (
    <div>
      <h4>Your Balance</h4>
      <h1 id="balance">£{numberWithCommas(total)}</h1>
    </div>
  );
};

export default Balance;
