const express = require("express");
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require("../controllers/transactions");
// const {
//   getTransactions,
//   addTransactions,
//   deleteTransaction,
// } = require("../controllers/transactions");

router
    .route("/") //methods connected to the specific routes (get, post)
    .get(getTransactions)
    .post(addTransaction);

router
    .route("/:id")
    .delete(deleteTransaction);

module.exports = router;
