const { Counter } = require('../models/models')
const ApiError = require('../error/ApiError')

class CounterController {
  async create(req, res, next) {
    try {
      const {
        id,
        start_bill,
        end_bill,
        start_date,
        end_date,
        userId } = req.body;
      const counter = await Counter.create({
        id,
        start_bill,
        end_bill,
        start_date,
        end_date,
        userId
      });
      return res.json(counter);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    const counters = await Counter.findAll();
    return res.json(counters);
  }

  async getById(req, res) {
    const { id } = req.params;
    const counter = await Counter.findOne({ where: { id } });
    return res.json(counter);
  }

  async updateCounter(req, res) {
    const { id } = req.params;
    const {
      start_bill,
      end_bill,
      start_date,
      end_date,
      userId,
    } = req.body;
    try {
      const counter = await Counter.findByPk(id);
      Object.assign(counter, {
        start_bill,
        end_bill,
        start_date,
        end_date,
        userId,
      })
      counter.save();
      return res.json(await Counter.findByPk(id));
    } catch (error) {
      return (error);
    }
  }

  async deleteCounter(req, res) {
    const { id } = req.params;
    try {
      const counter = await Counter.findByPk(id);
      await counter.destroy();
      return res.json('Deleted');
    } catch (error) {
      return res.json(error);
    }
  }

}
module.exports = new CounterController();