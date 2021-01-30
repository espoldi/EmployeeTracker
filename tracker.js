// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_trackerDB"
});

// Connect to server and database
connection.connect(function(err) {
    if (err) throw (err);
    start();
});

// Starting function
function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add New Data", "View Current Data", "Update Data", "Exit Program"]
    })
    .then(function(answer) {
        switch(answer.action) {
            case "Add New Data":
                addData();
                break;
            case "View Current Data":
                viewData();
                break;
            case "Update Data":
                updateData();
                break;
            case "Exit Program":
                console.log("Have a good day!");
                connection.end();
        }
    })
};

// Function for adding departments, roles, and employees
function addData() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["Department", "Role", "Employee", "Back"]
    })
    .then(function(answer) {
        switch(answer.add) {
            case "Department":

            case "Role":

            case "Employee":

            case "Back":
                start();
        }
    })
};

// Function for viewing current data
function viewData() {};

// Function for updating departments, roles, managers, and employees
function updateData() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "What would you like to update?",
        choices: ["Department", "Role", "Employee", "Manager", "Back"]
    })
    .then(function(answer) {
        switch(answer.add) {
            case "Department":

            case "Role":

            case "Employee":

            case "Manager":
                
            case "Back":
                start();
        }
    })
};