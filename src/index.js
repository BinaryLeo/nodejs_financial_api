const StatusCodes = require('http-status-codes');
const express = require('express');
const {v4 : uuidv4} = require('uuid'); // V4 random
const app = express(); //a new instance of express
app.use(express.json())
const customers = [];
app.post("/account",(request,response)=>{   
  const {cpf,name}=  request.body;  // get the cpf and name from the request
  const customerAlredyExists = customers.some((customer)=>
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
app.get("/statement/:cpf",(request,response)=>{
  const {cpf} = request.params; 
  const customer = customers.find((customer)=> customer.cpf === cpf);
  if(!customer) {
    return response.status(StatusCodes.StatusCodes.NOT_FOUND).json({error: 'Customer not found!'});
  }
  return response.json(customer.statement)

}
);
app.listen(3333)  