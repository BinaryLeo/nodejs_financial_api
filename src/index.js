const StatusCodes = require('http-status-codes');
const express = require('express');
const {v4 : uuidv4} = require('uuid'); // V4 random
const app = express(); //a new instance of express
app.use(express.json())
const customers = [];

//Middleware
function verifyIfAccountExists(request, response, next) {
  const {cpf} = request.headers; // get cpf from headers
  const customer = customers.find((customer)=> customer.cpf === cpf);  
  if(!customer) {
    return response.status(StatusCodes.StatusCodes.NOT_FOUND).json({error: 'Customer not found!'});
  }
  request.customer = customer // All middlewares that require verifyIfAccountExists
  // will to receive the customer object and  pass it to the next middlewares
  return next();
}
app.post("/account",(request,response)=>{   
  const {cpf,name}=  request.body;  // get the cpf and name from the request
  const customerAlredyExists = customers.some((customer)=> // exist/not exist
    customer.cpf === cpf);
  if (customerAlredyExists) {
    response.status(StatusCodes.StatusCodes.NOT_FOUND).json({
        error: 'Customer already exists!'})
  }
  customers.push( 
    {
     cpf,
     name,
     id:uuidv4(),
     statement:[] ,
    });
    return response.sendStatus(StatusCodes.StatusCodes.OK);
}) 
//app.use(verifyIfAccountExists); // enables to everything below
app.get("/statement", verifyIfAccountExists,(request,response)=>{
// verifyIfAccountExists inside the route enablesjust to  the route itself
  
  const {customer} = request;
  return response.json(customer.statement);

} 
);
app.listen(3333)