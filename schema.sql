DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE departments (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees ();