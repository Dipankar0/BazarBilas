const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const pdf = require('html-pdf');
const path = require('path');

const Product = require('../../models/Product');
const Cart = require('../../models/Cart');
const Order = require('../../models/Order');

const pdfTemplate = require('../../documents');

router.post(
  '/new',
  [
    auth,
    [
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('district', 'District is required')
        .not()
        .isEmpty(),
      check('thana', 'Thana is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { location, district, thana, phone, type } = req.body;

      const cart = await Cart.findOne({ user: req.user.id });

      const order = {};
      order.user = req.user.id;
      order.type = type;
      if (type === 'express') {
        order.deliveryCost = 30;
      } else if (type === 'normal') {
        order.deliveryCost = 50;
      }
      order.cart = cart;
      order.location = location;
      order.district = district;
      order.thana = thana;
      order.phone = phone;
      order.state = 'processing';
      const newOrder = await new Order(order);
      await newOrder.save();
      await cart.remove();
      res.json(newOrder);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    })
      .populate('user', ['name', 'phone'])
      .sort({ date: 1 });
    if (orders) {
      res.json(orders);
    } else {
      res.status(400).json({ msg: 'No pending order' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/order/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(400).json({ msg: 'No order Found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/onDelivery/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.state = 'delivered';
      const newOrder = await order.save();
      res.json(newOrder);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/onSend/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.state = 'sent';
      const newOrder = await order.save();
      res.json(newOrder);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/onCancel/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.state = 'canceled';
      const newOrder = await order.save();
      res.json(newOrder);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/onReturn/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.state = 'returned';
      const newOrder = await order.save();
      res.json(newOrder);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/all/:state', auth, async (req, res) => {
  try {
    if (req.params.state === 'canceled') {
      const orders = await Order.find({ state: req.params.state })
        .populate('user', ['name', 'phone'])
        .sort({ date: 1 });

      let duration;
      let avOrders = [];
      orders.map(order => {
        duration = moment().diff(moment(order.date), 'days');
        if (duration <= 7) {
          avOrders.push(order);
        } else {
          order.remove();
        }
      });

      res.json(avOrders);
    } else {
      const orders = await Order.find({ state: req.params.state })
        .populate('user', ['name', 'phone'])
        .sort({ date: 1 });

      if (orders) {
        res.json(orders);
      } else {
        res.status(400).json({ msg: 'No pending order' });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/my/:state', auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      state: req.params.state
    })
      .populate('user', ['name', 'phone'])
      .sort({ date: 1 });
    if (orders) {
      res.json(orders);
    } else {
      res.status(400).json({ msg: 'No pending order' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/address/:type', auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      type: req.params.type
    });
    res.json(orders[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/print/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', [
      'name',
      'phone'
    ]);

    pdf.create(pdfTemplate(order), {}).toFile('result.pdf', err => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'result.pdf'));
});

module.exports = router;
