var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    // Your password
    password: "Staples1",
    database: "ags_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    allProducts();
});

function allProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
    })
};
