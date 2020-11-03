import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// // Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true, //once weve made the request set it to false in the reducer
  // transactions: [
  //   { id: 1, text: "Flower", amount: -20 },
  //   { id: 2, text: "Salary", amount: 300 },
  //   { id: 3, text: "Book", amount: -10 },
  //   { id: 4, text: "Camera", amount: 150 },
  // ],
};

// Create context
// We pull global state into each component by pulling in this GlobalContext
// Then pull anything out of global context by using the useContext hook
export const GlobalContext = createContext(initialState);

// GlobalProvider wrapper around app component
export const GlobalProvider = ({ children }) => {
  // whenever we want to call a reducer action we need to use the dispatch from useReducer
  //useReducer takes in the global state and the global reducer
  //gives us access to the reducer in the top component GlobalProvider which sits just under App
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions - we need to run a new action to fetch from the backend
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions"); //proxy added http://localhost:5000/api/v1/transactions
      //res.data will give back the entire object, so need to add another data to the end res.data.data to get the transactions

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data, //transactions from backend
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error, //gives us back the error we usually see in postman when error occurs
      });
    }
  }

  //takes in id to know which one to delete
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id, //any data we want to send to the reducer (sending the id)
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error, //gives us back the error we usually see in postman when error occurs
      });
    }
  }

  async function addTransaction(transaction) {
    //since were sending data we need a content type headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
        // payload: transaction, // (sending the entire object)
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error, //gives us back the error we usually see in postman when error occurs
      });
    }
  }

  // WITHOUT NODE
  // //takes in id to know which one to delete
  // function deleteTransaction(id) {
  //   dispatch({
  //     type: "DELETE_TRANSACTION",
  //     payload: id, //any data we want to send to the reducer (sending the id)
  //   });
  // }

  // function addTransaction(transaction) {
  //   dispatch({
  //     type: "ADD_TRANSACTION",
  //     payload: transaction, // (sending the entire object)
  //   });
  // }

  return (
    //allows access to state anywhere we use it in the app - wraps entire app
    //provider provides the state and actions to be used in the components its wrapped around
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
