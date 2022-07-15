# nodejs_financial_api
A Node JS application to manage financial data (Stored in memory)

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-business_rules">Business Rules</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 🧪 technologies

This project was built using the following technologies and features:

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Insomnia](https://insomnia.rest/)

## 🧪 requirements

* [NodeJs](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/package/npm)

- [x] It must be possible to create an account.
- [x] It must be possible to fetch the customer's bank statement.
- [x] It must be possible to make a deposit.
- [x] It must be possible to withdraw.
- [x] It must be possible to search for the customer's bank statement by date.
- [x] It should be possible to update customer account data.
- [x] It must be possible to obtain customer account data.
- [x] It should be possible to delete an account.
- [x] It must be possible to return the balance.

## 🧪 business_rules

- [x] It should not be possible to register an account with an existing SIN number (Social Insurance Number).
- [x] It should not be possible to fetch a statement from a non-existing account.
- [x] It should not be possible to deposit to a non-existing account.
- [x] It should not be possible to withdraw from a non-existing account.
- [x] It should not be possible to withdraw when the balance is insufficient.
- [x] It should not be possible to delete a non-existing account.

## 💡 how to use

 Clone the repository.
- Open the project from your IDE.

**Follow the steps below**

```bash
# Install the dependencies
$ yarn
$ npm i

# Start the app
$ yarn dev
$ npm run dev
```

## 💡 endpoints

- POST /account  </br>
```json
{
"sin": 1-123-456-7890, 
"name":"your name",
}
```
-----
- POST /deposit </br>
Header sin: 1-123-456-7890
```json
{
	"description":"Account Transfer In",
	"amount":4800.00
}
```
-----
- GET /statement </br>
Header sin: 1-123-456-7890
-----
- GET /statement/date </br>
Header sin: 1-123-456-7890 </br>
Query  MonthDayYear: July 15, 2022 e.g

-----
- POST /withdraw </br>
Header sin: 1-123-456-7890
```json
{
	"amount": 500
}
```
-----
- GET /balance</br>
Header sin: 1-123-456-7890
-----
- PUT /account</br>
Header sin: 1-123-456-7890
```json
{
	"name":"Luigi",
}
```
-----

- DELETE /account</br>
Header sin: 1-123-456-7890
-----
## 📄 License

This project was built under MIT. See the file [LICENSE](LICENSE) for more details.

---


