// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

// Connect to server and database
connection.connect(function(err) {
    if (err) throw (err);
    start();
});

// Starting function
function start() {

};