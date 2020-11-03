import React, { useEffect, useContext } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  // const context = useContext(GlobalContext);
  const { transactions, getTransactions } = useContext(GlobalContext);

  //fires axios get request to backend to fetch all transactions - adds the data payload to state
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
        {/* <li className="minus">
          {transaction.text} <span>-$400</span>
         <button className="delete-btn">x</button>
          {" "}
        </li> */}
        {/* <li className="minus">
          Cash <span>-$400</span>
          <button className="delete-btn">x</button>
        </li> */}
      </ul>
    </>
  );
};

export default TransactionList;
