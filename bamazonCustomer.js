/** INSTRUCTION
 * Overview

In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this week. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.
Submission Guide

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku. This time, though, you need to include screenshots, a gif, 
and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a README.md file.
Include screenshots (or a video) of typical user flows through your application (for the customer and if relevant the manager/supervisor). This includes views of the 
prompts and the responses after their selection (for the different selection options).
Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is 
how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works.
Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.
If you haven't written a markdown file yet, click here for a rundown, or just take a look at the raw file of these instructions.
Instructions

Challenge #1: Customer View (Minimum Requirement)
    Create a MySQL Database called bamazon.
    Then create a Table inside of that database called products.
    The products table should have each of the following columns:
    - item_id (unique id for each product)
    - product_name (Name of product)
    - department_name
    - price (cost to customer)
    - stock_quantity (how much of the product is available in stores)
    Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

    Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
    The app should then prompt users with two messages.
    The first should ask them the ID of the product they would like to buy.
    The second message should ask how many units of the product they would like to buy.
    Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    However, if your store does have enough of the product, you should fulfill the customer's order.
    This means updating the SQL database to reflect the remaining quantity.
    Once the update goes through, show the customer the total cost of their purchase.
    If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.
 */
// Add dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

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
function startStore() {
    let query = `SELECT * FROM products`; // Declare a simple query

    // Execute the query
    connection.query(query, function (error, results, fields) {
        // Log error and stop further action
        if (error) {
            console.error(error);
            return;
        } else {
            var items = []; // Create and empty array to store the items in for Inquirer

            // Fill the items array with the available products
            for (var i = 0; i < results.length; i++) {
                items.push(results[i].product_name);
            }

            // Ask the user what they want to buy and how many
            inquirer.prompt([
                {
                    type: "list",
                    name: "items",
                    message: "What item would you like to buy?",
                    choices: items
                },
                {
                    type: "input",
                    name: "bid",
                    message: "How many units would you like?",
                    default: 1,
                    validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ]).then(function(answers) {
                // Once you know what the user wants to buy and how many, execute the statement
                let query = `SELECT stock_quantity, price FROM products WHERE ?`;

                connection.query(query, {'product_name': answers.items}, function (error, results, fields) {
                    // Check for errors and stop if there are any
                    if (error) {
                        console.error(error);
                        return;
                    }

                    // If the available stock is greater than the number the customer orders, the proceed.  Otherwise let them know.
                    if (results[0].stock_quantity > answers.bid) {
                        updateStock(answers.bid, answers.items);
                        console.log(`Your total price is: $${answers.bid * results[0].price}`);
                    } else {
                        console.log("Insufficient stock!");
                    }
                });

                //console.log(answers); 
                restart(); // Find out if the customer wants to do any more shopping
            });
        }
    });
}

function updateStock(qty, item) {
    // Query to update the stock and product sales columns
    var query = `UPDATE products SET stock_quantity = (stock_quantity - ${qty}), product_sales = (price * ${qty}) WHERE product_name = "${item}"`;

    // Check for errors and proceed if none
    connection.query(query, function(error, results, fields) {
        if (error) throw error;
    });
}

// Ask the user if they want another transaction.  If so, restart.  Otherwise shut 'er down
function restart() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "another",
            message: "Would you like to buy another item?",
            default: false
        }
    ]).then(function(answers) {
        if (answers.another) {
            startStore();
        } else {
            process.exit();
        }
    });
}

startStore(); // Initial starting of the store