const sequelize = require('../db')
const { DataTypes } = require('sequelize');
const { model } = require('../db');

const Customer = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
  firstName: { type: DataTypes.TEXT },
  lastName: { type: DataTypes.TEXT },
  street: { type: DataTypes.TEXT },
  appartment: { type: DataTypes.INTEGER },
  city: { type: DataTypes.TEXT },
  district: { type: DataTypes.TEXT },

  email: { type: DataTypes.TEXT, unique: true },
  password: { type: DataTypes.TEXT },
  role: { type: DataTypes.TEXT, defaultValue: 'USER' }
});

const Counter = sequelize.define('counter', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  start_bill: { type: DataTypes.INTEGER, },
  end_bill: { type: DataTypes.INTEGER, },
  start_date: { type: DataTypes.DATE, },
  end_date: { type: DataTypes.DATE, },
})

Customer.hasMany(Counter);
Counter.belongsTo(Customer);

module.exports = {
  Customer,
  Counter
}