// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// Create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeTracker_DB"
});

// Connect to server and database
connection.connect(function (err) {
    if (err) throw (err);
    console.log("connected");
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
        .then(function (answer) {
            switch (answer.action) {
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
        .then(function (answer) {
            switch (answer.add) {
                case "Department":
                    inquirer.prompt({
                        name: "name",
                        type: "input",
                        message: "What is the name of the department?"
                    })
                        .then(function (answer) {
                            connection.query(
                                "INSERT INTO departments SET ?",
                                {
                                    name: answer.name
                                },
                                function (err) {
                                    if (err) throw (err);
                                    console.log("Department successfully added!");
                                    start();
                                }
                            )
                        })

                case "Role":
                    inquirer.prompt([{
                        name: "title",
                        type: "input",
                        message: "What is the title of the role?"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What is the salary for the role?"
                    },
                    {
                        name: "deptId",
                        type: "input",
                        message: "What is the department id for the role?"
                    }])
                        .then(function (answer) {
                            connection.query(
                                "INSERT INTO roles SET ?",
                                {
                                    title: answer.title,
                                    salary: answer.salary,
                                    departmentID: answer.deptId
                                },
                                function (err) {
                                    if (err) throw (err);
                                    console.log("Role successfully added!");
                                    start();
                                }
                            )
                        })

                case "Employee":

                case "Back":
                    start();
            }
        })
};

// Function for viewing current data
function viewData() { };

// Function for updating departments, roles, managers, and employees
function updateData() {
    inquirer.prompt({
        name: "update",
        type: "list",
        message: "What would you like to update?",
        choices: ["Department", "Role", "Employee", "Manager", "Back"]
    })
        .then(function (answer) {
            switch (answer.update) {
                case "Department":

                case "Role":

                case "Employee":

                case "Manager":

                case "Back":
                    start();
            }
        })
};