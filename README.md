# bamazon
This a store that runs in  the terminal,
it allows you to purchase items and updates the stores stock quantity for the items.

This is using Node, JS, and Mysql.

To install the dependencies for this application, after you would clone the repo in your terminal and type in the following command:

```npm install```

---
To see the products available in the store type in the following command in the terminal:

```node bamazonCustomer.js```

You should get something that looks like this:

```products name: grapes
            product id: 8
            department: produce
            price: $8

            products name: chickenBrest
            product id: 9
            department: poultry
            price: $7

            products name: chickenWings
            product id: 10
            department: poultry
            price: $5
? Please enter the id of what you want to buy
```

At the bottom of all the items available fort sale, you will be asked for the id of the product you want to buy. 
Enter the id number and press enter.

```
? Please enter the id of what you want to buy 7
? Please enter the quantity 
```

Enter the amount of the item you would like to buy, and press enter.
If the quantity is available you will get a receipt for your purchase:

```
------------------------------------------receipt-----------------------------------
                    product name: cucumbers
                    product id: 7
                    price: 3
                    quantity bought: 5
                        total: 15
```




