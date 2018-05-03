var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",


    user: "root",

    // Your password
    password: "Staples1",
    database: "ags_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showProductsAndAskConsumer();
});

function showProductsAndAskConsumer() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results)

        inquirer.prompt([
            {
                name: "Q1",
                type: "input",
                message: "What is the id of the item you wish to purchase?"
            },
            {
                name: "Q2",
                type: "input",
                message: "How many items do you wish to purchase?"
            }
        ]).then(function(answer){



            //id which product we are going to use
                for (var i = 0; i < results.length; i++) {
                    if (results[i].id == answer.Q1) {


                        if (results[i].quantity >= answer.Q2){

                            //subtract the amount wished to purchase from the quantity & store in database

                            var newQuantity = results[i].quantity - answer.Q2;

                            //setting quantity where itemID = answer.q1
                            var userSpecifiedID = answer.Q1;

                            var product = results[i].product_name;

                            var total = answer.Q2 * results[i].price;

                            connection.query("UPDATE products SET ? WHERE ?",[{quantity:newQuantity},{id:userSpecifiedID}], function(err,response){
                                if (err) throw err

                                console.log("You successfully purchased " + product + " and we charged your account " + total)

                                connection.end();
                            })
                            
                            //colon is equal in OBJECT way above


                            //THEN we're going to tell the user they made a purchase of X

                            //& tell them the price
                        }

                        else {

                            console.log("You're out of luck. There are not enough in stock.")
                            connection.end();
                        }
                    }

                }
            //extract it from the ARRAY of objects so we;re only working with one object (not all)

            //now we know the quantity the product has. ONLY allow purchase if there is enough

            //otherwise give an error message saying there is not enough quantity
        })
        

    })
};
