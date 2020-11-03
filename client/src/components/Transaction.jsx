import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}
      <span>
        {sign}£{numberWithCommas(Math.abs(transaction.amount))}
        {/* Math.abs makes it an absolute number so it will always be positive
        so it basically removes the + or - before the amount which we get from the data */}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)} //changed to _id when we get from the db not local state
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
