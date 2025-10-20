// db/sqlite.js
const { Sequelize } = require("sequelize");

const sqlite = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  logging: false,
});

module.exports = sqlite;
