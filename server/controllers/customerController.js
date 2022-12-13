const { Customer } = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { model } = require('../db');

const generateJwt = (id, email) => {
  return JWT.sign(
    { id, email },
    process.env.SECRET_KEY,
    { expiresIn: '24h' });
}

class CustomerController {
  async registration(req, res, next) {
    const {
      email,
      password,
      firstName,
      lastName,
      street,
      appartment,
      city,
      district
    } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Empty credentials not allowed.'))
    }
    const candidate = await Customer.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Customer already registered.'))
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const customer = await Customer.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      street,
      appartment,
      city,
      district
    });
    const token = generateJwt(customer.id, email);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } })
    if (!customer) {
      return next(ApiError.internal('Customer not found.'))
    }
    // let comparePassword = bcrypt.compareSync(password, Customer.password, (error, result) => {
    //   if (error) {
    //     return next(ApiError.badRequest('debix.'))
    //   }
    //   if (result) {
    //     const token = generateJwt(customer.id, customer.email);
    //     return res.json({ token });
    //   } else {
    // //     return res.json('bad');
    // }
    const validPass = await bcrypt.compare(password, customer.password);
    if (validPass) {
      const token = generateJwt(customer.id, customer.email);
      return res.json({ token });
    } else {
      return next(ApiError.badRequest('Wrong password.'))
    }
  };

  async check(req, res, next) {
    const { email } = req.body;
    const customerId = await Customer.findOne({ where: { email } });
    const token = generateJwt(customerId, email);
    return res.json({ token });
  }


  async getAllCustomers(req, res) {
    const customers = await Customer.findAll();
    return res.json(customers);
  }

  async getCustomer(req, res) {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    return res.json(customer);
  }

  async createCustomer(req, res) {
    const {
      firstName,
      lastName,
      street,
      appartment,
      city,
      district
    } = req.body;
    const customer = await Customer.create({
      firstName,
      lastName,
      street,
      appartment,
      city,
      district
    });
    return res.json(customer);
  }

  async updateCustomer(req, res) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      street,
      appartment,
      city,
      district
    } = req.body;
    try {
      const customer = await Customer.findByPk(id);
      Object.assign(customer, {
        firstName,
        lastName,
        street,
        appartment,
        city,
        district
      })
      customer.save();
      return res.json(await Customer.findByPk(id));
    } catch (error) {
      return (error);
    }
  }

  async deleteCustomer(req, res) {
    const { id } = req.params;
    try {
      const customer = await Customer.findByPk(id);
      await customer.destroy();
      return res.json('Deleted');
    } catch (error) {
      return res.json(error);
    }

  }
}

module.exports = new CustomerController();