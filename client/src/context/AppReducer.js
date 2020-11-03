export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload, //data we get from response of axios request
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload //id changed to _id as the transactions are now coming from the db
        ),
        //send down all the transactions except the one that was deleted (id is sent in the payload in the action)
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        //takes new transaction payload being added from the action and a copy of state
        transactions: [...state.transactions, action.payload],
        // transactions: [action.payload, ...state.transactions],
        //when we added from state when we added a new transaction the new one comes with a payload and gets put at the top
        //when we fetch from the api its the other way around (most current is at the end)
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
