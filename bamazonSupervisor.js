/** INSTRUCTIONS
 * Challenge #3: Supervisor View (Final Level)
    Create a new MySQL table called departments. Your table should include the following columns:
        department_id
        department_name
        over_head_costs (A dummy number you set for each department)

    Modify the products table so that there's a product_sales column and modify the bamazonCustomer.js app so that this value is updated with each individual products 
    total revenue from each sale.

    Modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is 
    added to the product's product_sales column.

    Make sure your app still updates the inventory listed in the products column.

    Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
        View Product Sales by Department
        Create New Department

    When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
    department_id	department_name	over_head_costs	product_sales	total_profit
    01	Electronics	10000	20000	10000
    02	Clothing	60000	100000	40000
    The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. 
    You should use a custom alias.
    If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.
    Hint: You may need to look into aliases in MySQL.
    Hint: You may need to look into GROUP BYs.
    Hint: You may need to look into JOINS.
    HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)
 */

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
function startSupe() {
    // Ask the user what they want to do
    inquirer.prompt([
        {
            type: "list",
            name: "actions",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        }
    ]).then(function(answers) {
        // Based on the user's selection, execute the appropriate function
        switch(answers.actions) {
            case "View Product Sales by Department":
                //list every available item: the item IDs, names, prices, and quantities
                viewSales();
                break;
            case "Create New Department":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "dept",
                        message: "What department would you like to add?"
                    },
                    {
                        type: "input",
                        name: "overhead",
                        message: "What is the overhead of the department?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                ]).then(function(answers) {
                    createDepartment(answers.dept, answers.overhead);
                });
                break;
            default:
                break;
        }
    });
}

// View all sales to date
function viewSales() {
    // Get sales from all departments (only list each department once)
    let query = `SELECT 
                D.department_id, 
                D.department_name, 
                D.overhead_costs, 
                SUM(P.product_sales) AS product_sales, 
                SUM(P.product_sales - D.overhead_costs) AS total_profit 
            FROM products AS P 
            RIGHT JOIN departments AS D 
                ON P.department_name = D.department_name 
            GROUP BY department_name;`;
                
    connection.query(query, function (error, results, fields) {
        // Check for errors
            if (error) {
                console.error(error);
                return;
            }

            // Declare an array variable to store the data in for the console.table package to display in a table
            let salesArr = [['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']];

            // Loop through the data and add it to the salesArr variable
            for(let i in results) {
                salesArr.push([results[i].department_id, results[i].department_name, results[i].overhead_costs, results[i].product_sales, results[i].total_profit]);
            }

            // Display the results in a table
            console.table('\r\nDepartment Sales', salesArr);
        }
    );

    restart(); // Restart the app
}

// Add a new department to the departments table
function createDepartment(dept, cost) {
    // Insert a new department using the parameters passed into the function
    let query = `INSERT INTO departments (department_name, overhead_costs) VALUES ("${dept}", ${cost})`;

    connection.query(query, function (error, results, fields) {
        // Check for errors
        if (error) {
            console.error(error);
            return;
        }
    });

    // Let the user know that the department was created
    console.log(`${dept} department created.`);

    restart(); // Restart the app
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
            startSupe();
        } else {
            process.exit();
        }
    });
}

startSupe(); // Initial starting of the supervisor interface