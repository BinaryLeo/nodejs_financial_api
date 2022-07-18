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
![create](https://user-images.githubusercontent.com/72607039/179602602-e092ee6e-dd3c-408e-80bb-0910e218731b.JPG)


```json
{
"sin": 1-123-456-7890, 
"name":"your name",
}
```
-----
- POST /deposit </br>
![deposit](https://user-images.githubusercontent.com/72607039/179602679-107e6209-1640-4d45-8b60-f3234024bc6f.JPG)</br>
Header sin: 1-123-456-7890
```json
{
	"description":"Account Transfer In",
	"amount":4800.00
}
```
-----
- GET /statement </br>
![statement](https://user-images.githubusercontent.com/72607039/179602824-209dbd72-da57-426c-bbeb-809dc76802b9.JPG)</br>
Header sin: 1-123-456-7890
-----
- GET /statement/date </br>
![bydate](https://user-images.githubusercontent.com/72607039/179602872-71c865f1-ff94-40a5-bcdf-c1236b99ad6e.gif)</br>
Header sin: 1-123-456-7890 </br>
Query  MonthDayYear: July 15, 2022 e.g

-----
- POST /withdraw </br>
![withdraw](https://user-images.githubusercontent.com/72607039/179602923-5b611b17-04a9-4f3c-b6c1-e4318d3cf4ff.JPG)</br>
Header sin: 1-123-456-7890
```json
{
	"amount": 500
}
```
-----
- GET /balance</br>
![balance](https://user-images.githubusercontent.com/72607039/179602948-48041616-3d1a-4854-88a2-3868bc5de5d9.JPG)</br>
Header sin: 1-123-456-7890
-----
- PUT /account</br>
![putdata](https://user-images.githubusercontent.com/72607039/179602964-28511584-d4d5-462a-b22c-00b716cdda2a.JPG)</br>
Header sin: 1-123-456-7890
```json
{
	"name":"Luigi",
}
```
-----

- DELETE /account</br>
![delete](https://user-images.githubusercontent.com/72607039/179603016-16214939-85d0-410e-b1ce-9b309d03613b.JPG)</br>
Header sin: 1-123-456-7890
-----
## 📄 License

This project was built under MIT. See the file [LICENSE](LICENSE) for more details.

---


