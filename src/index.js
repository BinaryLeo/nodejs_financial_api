/*     ____________________________
      /                           /\
     /   BinaryLeo              _/ /\
    /       NodeJS FINAPI       / \/
   /                           /\
  /___________________________/ /
  \___________________________\/
   \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
*/

const StatusCodes = require("http-status-codes");
const express = require("express");
const { v4: uuidv4 } = require("uuid"); // V4 random
const app = express(); //a new instance of express
app.use(express.json());
const customers = [];

//* settings to Canadian timestamp
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
};

//*Middleware - Verify Account by ID 
function verifyIfAccountExists(request, response, next) {
  const { customerID } = request.headers; // get customerID from headers
  const customer = customers.find((currentCustomer) => currentCustomer.customerID === customerID);
  if (!customer) {
    return response
      .status(StatusCodes.StatusCodes.NOT_FOUND)
      .json({ error: "Customer not found!" });
  }
  request.customer = customer; // All middlewares that require verifyIfAccountExists
  // will to receive the customer object and  pass it to the next middlewares
  return next();
}

function GetBalance(statement){
  return statement.reduce((acc, operation) => {
      if (operation.type === "credit"){
          return acc + operation.amount
      } else {
          return acc - operation.amount; 
      }
  }, 0)
}

//*Post - Create a new customer Account
app.post("/account", (request, response) => {
  const { customerID, name } = request.body; // get the customerID and name from the request
  const customerAlredyExists = customers.some(
    (
      customer // exist/not exist
    ) => customer.customerID === customerID
  );
  if (customerAlredyExists) {
    response.status(StatusCodes.StatusCodes.NOT_FOUND).json({
      error: "Customer already exists!",
    });
  }
  customers.push({
    customerID,
    name,
    id: uuidv4(),
    statement: [],
  });
  return response.sendStatus(StatusCodes.StatusCodes.OK);
});

//*Get - Search Statement - All data available
//app.use(verifyIfAccountExists); // enables to everything below
app.get("/statement", verifyIfAccountExists, (request, response) => {
  // verifyIfAccountExists inside the route enablesjust to  the route itself

  const { customer } = request;
  return response.json(customer.statement);
});

//*Get - Statement by Date
app.get("/statement/date", verifyIfAccountExists, (request, response) => {
  const { customer } = request; 
  const { MonthDayYear } = request.query; // e.g. date = july 12, 2022
  const statementByDate = customer.statement.filter(
    (statement) =>
      statement.createdAt.substring(0, statement.createdAt.lastIndexOf(",")) ===
      MonthDayYear.toString()
  );

  return response.json(statementByDate);
});

//*Post - New Deposit 
app.post("/deposit", verifyIfAccountExists, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request; //customer from  request
  const statementOperation = {
    description,
    amount,
    createdAt: date.toLocaleString("en-CA", options),
    type: "credit",
  };
  customer.statement.push(statementOperation);
  return response.status(StatusCodes.StatusCodes.OK).send();
});

//* Post - A new withdraw 
app.post('/withdraw', verifyIfAccountExists, (request, response) =>{
  const {amount} = request.body; 
  const {customer} = request; 

  const balance = GetBalance(customer.statement); 

  if(balance < amount){
      return response.status(StatusCodes.StatusCodes.NOT_FOUND).json({error: "Insufficient funds!"})
  }

  const statementOperation = {
          amount, 
          createdAt:date.toLocaleString("en-CA", options), 
          type: "debit" 
  }
  customer.statement.push(statementOperation); 

  return response.sendStatus(StatusCodes.StatusCodes.OK);
})

//* Get - The balance from the account
app.get("/balance", verifyIfAccountExists, (request, response) => {
  const {customer} = request; 
  const balance = GetBalance(customer.statement) 
  return response.json(balance)
})

//* Put - Change Customer Information
app.put("/account", verifyIfAccountExists, (request, response) => {
  const {name} = request.body;
  const { customer } = request; //customer from request
  customer.name = name; 
  return response.status(StatusCodes.StatusCodes.OK).send();
})

//* Get Account information
app.get("/account", verifyIfAccountExists, (request, response) => {
  const { customer } = request; //customer from request
  return response.json(customer);
})
app.delete("/account", verifyIfAccountExists, (request, response) => {
  const { customer} = request; //customer from request
  customers.splice(customer, 1)
  return response.status(StatusCodes.StatusCodes.OK).json(customers)
})
app.listen(3333);
