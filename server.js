const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); // allows us to use dotenv files
const colors = require("colors"); // adds colors to logger middleware
const morgan = require("morgan"); // logging middleware
const connectDB = require("./config/db"); // connect to monogdb

dotenv.config({ path: "./config/config.env" }); // lets dotenv know where the config file is
connectDB();

const transactions = require("./routes/transactions"); // brings route file in and mounts router below

const app = express();

app.use(express.json()); // allows us to use body parser

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions); // mounts router - route put here that we want to connect to transactions route

//check for production - npm start, localhost:5000
if (process.env.NODE_ENV === "production") {
  //set a static folder which is the build folder
  app.use(express.static("client/build"));

  //route to anything aside from api routes - if its hit load index.html file - entry point
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// app.get("/", (req, res) => res.send("Hello")); //test

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
