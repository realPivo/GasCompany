const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: 'gas_db.db'
});