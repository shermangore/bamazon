# Bamazon
An Amazon-like storefront with a MySQL database.  The app will take in orders from customers and deplete stock from the store's inventory.  Provide a summary of the highest-grossing departments in the store.
## Installation
1) git clone the repository to your local computer
2) git bash into the directory created by the clone
3) run npm install

## Usage
### The application has three user levels: Customer, Manager, Supervisor.  Each level is accessed separately
#### Customer:
1) Start the customer application

![alt text](https://s3.amazonaws.com/bamazon-screenshots/Customer_1.PNG "Starting the customer app")

2) Select the item you'd like to purchase

![alt text](https://s3.amazonaws.com/bamazon-screenshots/Customer_2.PNG "Select an item")

3) Input the number of units you'd like to buy

![alt text](https://s3.amazonaws.com/bamazon-screenshots/Customer_3.PNG "Select the quantity")

4) Indicate whether you'd like to buy another item

![alt text](https://s3.amazonaws.com/bamazon-screenshots/Customer_4.PNG "Buy another?")

#### Manager:
1) Start the manager application
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_1a.PNG "Starting the manager app")
2) Select a function to start (View Products)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_1.PNG "Select a function (view products)")
3) View Products
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_2.PNG "View products")
4) Select a function to start (View Low Inventory)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_3.png "Select a function (view low inventory)")
5) View Low Inventory
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_4.png "View low inventory")
6) Select a function to start (Add To Inventory)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_5.png "Select a function (add to inventory)")
7) Select an item to increase the available inventory
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_6.png "Select an item")
8) Enter the amount to increase the inventory by
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_7.png "Enter an amount")
9) Select a function to start (Add New Product)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_8.png "Select a function (add new product)")
10) Enter the name of the new product you're adding
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_9.png "Enter product name")
11) Enter the name of the department the new product belongs in
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_10.png "Enter department name")
12) Enter the price of the new product
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_11.png "Enter the price")
13) Enter the quantity of new product for sale
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_12.png "Enter the quantity")
14) Restart the process or quit the app
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Manager_13.png "Restart or quit")

#### Supervisor
1) Start the manager application
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_1.PNG "Starting the supervisor app")
2) Select a function to start (View Product Sales by Department)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_2.PNG "View product sales")
3) View Product Sales
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_3.PNG "View results")
4) Select a function to start (Create New Department)
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_4.PNG "Create new department")
5) Enter the new department name
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_6.PNG "Enter name")
6) Enter the overhead of the department
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_7.PNG "Enter overhead amount")
7) Restart the process or quit the app
![alt text](https://s3.amazonaws.com/bamazon-screenshots/Supervisor_8.png "Restart or quit")





## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History
Created 7/30/2017

## Credits
Sherman Gore

## License
MIT