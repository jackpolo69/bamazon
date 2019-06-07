var mySql = require("mysql")
var inquirer = require("inquirer")

var connection = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) {
        throw err
    }
    console.log("connected as id " + connection.threadId)
    showProducts()
})

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err

        }
        console.log("Welcome To My Store\n type in an id to buy the item(s)")
        for (var i = 0; i < res.length; i++) {
            console.log(`
            products name: ${res[i].product_name}
            product id: ${res[i].item_id}
            department: ${res[i].department_name}
            price: $${res[i].price}`)
        }
        askCustomer()

    })



}

function askCustomer() {
    inquirer.prompt([
        {
            message: "Please enter the id of what you want to buy",
            name: "id",
        },
        {
            message: "Please enter the quantity",
            name: "quantity",
        }
    ]).then(function (res) {
        handleTransaction(res.id, res.quantity)
    })
}

function handleTransaction(id, quantity) {
    connection.query("SELECT * FROM products WHERE ?", { item_id: id }, function (err, res) {
        if (err) {
            throw err
        }
        var productObject = res[0]
        // This if statement will run if we can not fill the request.
        if (productObject.stock_quantity - quantity < 0) {
            console.log(`Sorry we don't have enough of ${productObject.product_name} in stock.`)
            if (productObject.stock_quantity <= 0) {
                console.log(`We're completely out of ${productObject.product_name}.`)
            }
            askForAnotherTransaction()
        } else {
            var updatedStockQuantity = productObject.stock_quantity - quantity;
            var productId = productObject.item_id;
            var query = "UPDATE products SET ? WHERE ?";

            connection.query(query, [{ stock_quantity: updatedStockQuantity }, { item_id: productId }], function (err, res, fields) {
                if (err) {
                    throw err
                }
                console.log(`
                _
                ------------------------------------------receipt-----------------------------------
                        product name: ${productObject.product_name}
                        product id: ${productObject.item_id}
                        price: ${productObject.price}
                        quantity bought: ${quantity}
                            total: ${productObject.price * quantity} 
                `)
                askForAnotherTransaction()
            })
            
        }
    })
}

function askForAnotherTransaction (){
    inquirer.prompt([
        {
            message: "Would you like to make another purchase",
            name: "makePurchase",
        },

    ]).then(function (res) {
       if (res.makePurchase === "yes"){
           showProducts()
       }else (
           process.exit (1)
       )
    })
}