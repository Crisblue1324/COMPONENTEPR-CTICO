const { DataTypes } = require("sequelize");
const sqlite = require("../db/sqlite");

const Audit = sqlite.define("Audit", {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userDni: {
    type: DataTypes.STRING,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Audit;
