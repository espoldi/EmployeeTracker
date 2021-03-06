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
        choices: ["Add New Data", "View Current Data", "Update Data", "Delete Data", "Exit Program"]
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
                case "Delete Data":
                    deleteData();
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
                        message: "What is the name of the department?",
                    })
                        .then(function (response) {
                            connection.query(
                                "INSERT INTO departments SET ?",
                                {
                                    name: response.name
                                },
                                function (err) {
                                    if (err) throw (err);
                                    console.log("Department successfully added!");
                                    addData();
                                }
                            )
                        })
                    break;

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
                                    department_id: answer.deptId
                                },
                                function (err) {
                                    if (err) throw (err);
                                    console.log("Role successfully added!");
                                    addData();
                                }
                            )
                        })
                    break;

                case "Employee":
                    inquirer.prompt([{
                        name: "first_name",
                        type: "input",
                        message: "What is the first name of the employee?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the last name of the employee?"
                    },
                    {
                        name: "roleId",
                        type: "input",
                        message: "What is the role id for the employee?"
                    },
                    {
                        name: "managerId",
                        type: "input",
                        message: "What is the manager id for the employee?"
                    }])
                        .then(function (answer) {
                            connection.query(
                                "INSERT INTO employees SET ?",
                                {
                                    first_name: answer.first_name,
                                    last_name: answer.last_name,
                                    role_id: answer.roleId,
                                    manager_id: answer.managerId
                                },
                                function (err) {
                                    if (err) throw (err);
                                    console.log("Employee successfully added!");
                                    addData();
                                }
                            )
                        })
                    break;

                case "Back":
                    start();
            }
        })
};

// Function for viewing current data
function viewData() {
    inquirer.prompt([{
        name: "view",
        type: "list",
        message: "What data would you like to view?",
        choices: ["Departments", "Roles", "Employees", "Back"]
    }])
        .then(function (answer) {
            switch (answer.view) {
                case "Departments":
                    connection.query(
                        "SELECT * FROM departments",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            viewData();
                        })
                    break;

                case "Roles":
                    connection.query(
                        "SELECT * FROM roles",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            viewData();
                        })
                    break;

                case "Employees":
                    connection.query(
                        "SELECT * FROM employees ORDER BY manager_id",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            viewData();
                        })
                    break;

                case "Back":
                    start();
            }
        })
};

// Function for updating departments, roles, managers, and employees
function updateData() {
    inquirer.prompt({
        name: "update",
        type: "list",
        message: "What would you like to update?",
        choices: ["Department", "Role", "Employee", "Back"]
    })
        .then(function (answer) {
            switch (answer.update) {
                case "Department":
                    connection.query(
                        "SELECT * FROM departments",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "changeDept",
                                type: "input",
                                message: "What is the id of the department you would like to change?"
                            })
                                .then(function (answer) {
                                    inquirer.prompt({
                                        name: "newName",
                                        type: "input",
                                        message: "What would you like to rename this department?"
                                    })
                                        .then(function (response) {
                                            connection.query(
                                                "UPDATE departments SET ? WHERE ?",
                                                [{ name: response.newName },
                                                { id: answer.changeDept }],
                                                function (err) {
                                                    if (err) throw (err);
                                                    updateData();
                                                }
                                            )
                                        })
                                })
                        })
                    break;

                case "Role":
                    connection.query(
                        "SELECT * FROM roles",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "changeRole",
                                type: "input",
                                message: "What is the id of the role you would like to change?"
                            })
                                .then(function (answer) {
                                    inquirer.prompt([{
                                        name: "newTitle",
                                        type: "input",
                                        message: "What would you like to rename this role's title?"
                                    },
                                    {
                                        name: "newSalary",
                                        type: "input",
                                        message: "What would you like to reset this role's salary?"
                                    },
                                    {
                                        name: "newDeptID",
                                        type: "input",
                                        message: "What would you like to set this role's department id?"
                                    }])
                                        .then(function (response) {
                                            connection.query(
                                                "UPDATE roles SET ? WHERE ?",
                                                [{
                                                    title: response.newTitle,
                                                    salary: response.newSalary,
                                                    department_id: response.newDeptID
                                                },
                                                { id: answer.changeRole }],
                                                function (err) {
                                                    if (err) throw (err);
                                                    updateData();
                                                }
                                            )
                                        })
                                })
                        })
                    break;

                case "Employee":
                    connection.query(
                        "SELECT * FROM employees",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "changeEmployee",
                                type: "input",
                                message: "What is the id of the employee you would like to change?"
                            })
                                .then(function (answer) {
                                    inquirer.prompt({
                                        name: "edit",
                                        type: "list",
                                        message: "What would you like to edit for this employee?",
                                        choices: ["Name", "Role", "Manager", "Back"]
                                    })
                                        .then(function (response) {
                                            switch (response.edit) {
                                                case "Name":
                                                    inquirer.prompt([
                                                        {
                                                            name: "first",
                                                            type: "input",
                                                            message: "What is the first name of the employee?"
                                                        },
                                                        {
                                                            name: "last",
                                                            type: "input",
                                                            message: "What is the last name of the employee?"
                                                        }])
                                                        .then(function (ans) {
                                                            connection.query(
                                                                "UPDATE employees SET ? WHERE ?",
                                                                [{
                                                                    first_name: ans.first,
                                                                    last_name: ans.last
                                                                },
                                                                { id: answer.changeEmployee }],
                                                                function (err) {
                                                                    if (err) throw (err);
                                                                    updateData();
                                                                }
                                                            )
                                                        })
                                                    break;

                                                case "Role":
                                                    inquirer.prompt({
                                                        name: "role",
                                                        type: "input",
                                                        message: "What is the new role id of the employee?"
                                                    })
                                                        .then(function (ans) {
                                                            connection.query(
                                                                "UPDATE employees SET ? WHERE ?",
                                                                [{ role_id: ans.role },
                                                                { id: answer.changeEmployee }],
                                                                function (err) {
                                                                    if (err) throw (err);
                                                                    updateData();
                                                                }
                                                            )
                                                        })
                                                    break;

                                                case "Manager":
                                                    inquirer.prompt({
                                                        name: "manager",
                                                        type: "input",
                                                        message: "What is the new manager id of the employee?"
                                                    })
                                                        .then(function (ans) {
                                                            connection.query(
                                                                "UPDATE employees SET ? WHERE ?",
                                                                [{ manager_id: ans.manager },
                                                                { id: answer.changeEmployee }],
                                                                function (err) {
                                                                    if (err) throw (err);
                                                                    updateData();
                                                                }
                                                            )
                                                        })
                                                    break;

                                                case "Back":
                                                    start();
                                                    break;
                                            }
                                        })
                                })
                        })
                    break;

                case "Back":
                    start();
            }
        })
};

function deleteData() {
    inquirer.prompt({
        name: "delete",
        type: "list",
        message: "What would you like to delete?",
        choices: ["Departments", "Roles", "Employees", "Back"]
    })
        .then(function (answer) {
            switch (answer.delete) {
                case "Departments":
                    connection.query(
                        "SELECT * FROM departments",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "choice",
                                type: "input",
                                message: "What is the id of the department you wish to delete?",
                            })
                                .then(function (response) {
                                    connection.query(
                                        "DELETE FROM departments WHERE ?",
                                        {
                                            id: response.choice
                                        },
                                        function (err) {
                                            if (err) throw (err);
                                            console.log("Department successfully deleted!");
                                            deleteData();
                                        }
                                    )
                                })
                        })
                    break;
                case "Roles":
                    connection.query(
                        "SELECT * FROM roles",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "choice",
                                type: "input",
                                message: "What is the id of the role you wish to delete?",
                            })
                                .then(function (response) {
                                    connection.query(
                                        "DELETE FROM roles WHERE ?",
                                        {
                                            id: response.choice
                                        },
                                        function (err) {
                                            if (err) throw (err);
                                            console.log("Role successfully deleted!");
                                            deleteData();
                                        }
                                    )
                                })
                        })
                    break;
                case "Employees":
                    connection.query(
                        "SELECT * FROM employees",
                        function (err, result) {
                            if (err) throw (err);
                            console.table(result);
                            inquirer.prompt({
                                name: "choice",
                                type: "input",
                                message: "What is the id of the employee you wish to delete?",
                            })
                                .then(function (response) {
                                    connection.query(
                                        "DELETE FROM employees WHERE ?",
                                        {
                                            id: response.choice
                                        },
                                        function (err) {
                                            if (err) throw (err);
                                            console.log("Employee successfully deleted!");
                                            deleteData();
                                        }
                                    )
                                })
                        })
                    break;
                case "Back":
                    start();
                    break;
            }
        })
};