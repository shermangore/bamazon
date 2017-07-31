/** INSTRUCTIONS
 * Challenge #2: Manager View (Next Level)
    Create a new Node application called bamazonManager.js. Running this application will:
    List a set of menu options:
    View Products for Sale
    View Low Inventory
    Add to Inventory
    Add New Product
    If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
    If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
    If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.
 */
// Add dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');

// Specify the port.
var PORT = 3000;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  //console.log("connected as id " + connection.threadId);
});

// Initial function that starts the process
function startAdmin() {
    // Ask the user what they want to do
    inquirer.prompt([
        {
            type: "list",
            name: "actions",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function(answers) {
        // Based on the user's selection, execute the appropriate function
        switch(answers.actions) {
            case "View Products for Sale":
                //list every available item: the item IDs, names, prices, and quantities
                listProducts();
                break;
            case "View Low Inventory":
                //list all items with an inventory count lower than five
                listLowInventory();
                break;
            case "Add to Inventory":
                //display a prompt that will let the manager "add more" of any item currently in the store
                addInventory();
                break;
            case "Add New Product":
                //allow the manager to add a completely new product to the store
                addNewProduct();
                break;
            default:
                break;
        }
    });
}

// List all products
function listProducts() {
    // Get everything from the products table
    let query = `SELECT item_id, product_name, department_name, price, stock_quantity FROM products`;

    connection.query(query, function (error, results, fields) {
        // Check for errors
        if (error) {
            console.error(error);
            return;
        }

        // Declare an array variable to store the products in for the console.table package to display in a table
        let prodArr = ['\r\nProduct List', ['Product ID', 'Product Name', 'Department', 'Price', "Stock Quantity"]];

        // Loop through the data and add it to the prodArr variable
        for(let i in results) {
            prodArr.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }

        // Show the results in a table
        console.table(prodArr);
    });

    restart(); // Restart the app
}

// Lists all products that have a stock_quantity less than fifty (50) **** I know it says 5 in the homework, but my quantities were higher and I felt like the result is the same
function listLowInventory() {
    // Get all items in the products table that have a stock_quantity less than fifty (50)
    let query = `SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 50`;
    // Declare an array variable to store the products in for the console.table package to display in a table
    let prodArr = ['\r\nLow Inventory', ['Product ID', 'Product Name', 'Department', 'Price', "Stock Quantity"]];

    connection.query(query, function (error, results, fields) {
        // Check for errors
        if (error) {
            console.error(error);
            return;
        }

        // Loop through the data and add it to the prodArr variable
        for(let i in results) {
            prodArr.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }

        // Show the results in a table
        console.table(prodArr);
    });

    restart(); // Restart the app
}

// Update the stock_quantity in the products table for a specific product
function addInventory() {
    // Get all the products to use in the Inquirer prompt
    let query = `SELECT * FROM products`;

    connection.query(query, function (error, results, fields) {
        // Check for errors
        if (error) {
            console.error(error);
            return;
        } else {
            var items = []; // Create and empty array to store the items in for Inquirer

            // Fill the items array with the available products
            for (var i = 0; i < results.length; i++) {
                items.push(results[i].product_name);
            }

            // Ask the user what product they want to update and how many
            inquirer.prompt([
                {
                    type: "list",
                    name: "items",
                    message: "What item would you like to add inventory to?",
                    choices: items
                },
                {
                    type: "input",
                    name: "qty",
                    message: "How many would you like to add?",
                    default: 0,
                    validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ]).then(function(answers) {
                // Update the products table to increase the stock quantity
                let query = `UPDATE products SET stock_quantity = (stock_quantity + ${answers.qty}) WHERE ?`;

                connection.query(query, { 'product_name': answers.items}, function (error, results, fields) {
                    // Check for errors
                    if (error) {
                        console.error(error);
                        return;
                    }
                });

                //console.log(answers);
                restart(); // Restart the app
            });
        }
    });
}

function addNewProduct() {
    // Ask the user what products they want to add, the price, the department and how many
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What item would you like to add to the inventory?"
        },
        {
            type: "input",
            name: "department",
            message: "What department does the item belong in?",
            validate: function(value) {
                if (value !== ""  && value !== null) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "price",
            message: "What is the unit price of the item?",
            default: 0.00,
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }        
        },
        {
            type: "input",
            name: "qty",
            message: "How many would you like to add?",
            default: 0,
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function(answers) {
        let query = `INSERT INTO products (product_name, department_name, price, stock_quantity) 
                     VALUES ("${answers.item}", "${answers.department}", ${answers.price}, ${answers.qty})`;

        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error(error);
                return;
            }
        });

        //console.log(answers);
        restart(); // Restart the app
    });
}

// Ask the user if they want another transaction.  If so, restart.  Otherwise shut 'er down
function restart() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "another",
            message: "Would you like to do another function?",
            default: false
        }
    ]).then(function(answers) {
        if (answers.another) {
            startAdmin();
        } else {
            process.exit();
        }
    });
}

startAdmin(); // Initial starting of the manager interface