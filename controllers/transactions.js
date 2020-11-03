const Transaction = require("../models/Transaction");
// //we can use mongoose methods on the model like find, create, remove
// //when we use a mongoose method it returns a promise - async/await on all methods

// ALL METHODS WHICH GET PASSED IN TO ROUTES
// // @desc    Get all transactions
// // @route   GET /api/v1/transactions
// // @access  Public

exports.getTransactions = async (req, res, next) => {
  //   res.send("GET transactions");

  try {
    const transactions = await Transaction.find(); //mongoose method for finding the data

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// // @desc    Add transaction
// // @route   POST /api/v1/transactions
// // @access  Public

exports.addTransaction = async (req, res, next) => {
  //   res.send("POST transaction");
  // add will only accept parameters thats in the model

  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body); //creates a transaction

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") {
      //adds an array of the error messages
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// // @desc    Delete transaction
// // @route   DELETE /api/v1/transaction/:id
// // @access  Public

exports.deleteTransaction = async (req, res, next) => {
  // res.send("DELETE transaction");
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//MVC - pattern splits application in to specific sections
//user request specific page from a server
//based on what url user is requesting the server will send all request info..
//to a specific controller
//controller tells server how to handle request - acts a middleman between model and view
//asks the model for information based on the request
//the model handels all the data logic of the request
//model interacts with the database and handles all saving, updating, deleting etc of data
//controller tells model what to do and responds based on what the model returns
//controller handles what to do on success or failure
//after model sends response back to controller - controller interacts with the view to render data to the user
//view handle data presentation based on what the controller sends it
//model and view never interfact
//the data and presentation are completely seperate to help create complex applications

//user send request to server to get a list of cats
//controller asks model to return a list of all cats
//model queries database for a list of all cats SELECT * FROM cats
//returns list back to the controller
//controller handle success/false logic flow - then asks the view to return presentation of the data
//or if false controlleer asks view to render error presentation

//MODEL HANDLES ALL DATA
//VIEW HANDLES ALL PRESENTATION
//CONTROLLER TELLS MODEL AND VIEW WHAT TO DO
