const express = require('express');
const router = express.Router();
const db = require('../lib/database');

const { Op } = require('sequelize');

router.get('/', function (req, res, next) {
  const sort = req.query.sort || 'id';
  const by = req.query.by === 'DESC' ? 'DESC' : 'ASC';
  const where = {};

  if (req.query.filter) {
    const filters = req.query.filter.split(';');
    filters.map((filter) => {
      const pairs = filter.split(':');
      if (pairs.length !== 2) {
        res.status(500).send({ errMsg: 'Wrong filter' });
        return;
      }
      where[pairs[0]] = pairs[1];
    });
  }

  db.Customer.findAll({
    order: [[sort, by]],
    where,
  })
    .then((customers) => {
      res.status(200).send(customers);
    })
    .catch((err) => {
      // TO-DO: Don't expose the whole error payload
      res.status(500).send(err);
    });
});

router.post('/create', async (req, res) => {
  try {
  const customer = await db.Customer.create({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
  })
  res.status(200).send(customer);
} catch (err) {
  res.status(500).send(err);
}
    
});

router.patch('/:customerId/status/:status', async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.customerId);
    const updated = await customer.update({ status: req.params.status });
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:customerId', async (req, res, next) => {
  try {
    const customer = await db.Customer.findByPk(req.params.customerId);
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
