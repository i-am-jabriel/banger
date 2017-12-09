'use strict'
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

console.log(chalk.yellow("Opening database connection"));

// create the database instance that can be used in other database files
module.exports = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false, // so we don't see all the SQL query made
});

// don't forget to run our models files and make all associations for our Sequelize objects (if you do it here consider circular references)