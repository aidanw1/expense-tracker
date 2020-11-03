import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  //income - filters through and gets anything greater than 0 (all positive numbers)
  //expense - works the same. Anything less than 0 we add up
  //and adds them all together using reduce and adds 2 decimals

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">£{numberWithCommas(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">£{numberWithCommas(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
