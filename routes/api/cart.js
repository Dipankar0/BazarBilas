const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const User = require('../../models/User');

router.get('/my', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id
    });
    if (!cart) {
      res
        .status(400)
        .json({ msg: 'You have not added any product to your cart' });
    } else {
      const newCart = [];
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/addProduct/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      let exitItem = cart.products.find(
        product => product.product._id.toString() === req.params.id
      );
      //console.log(exitItem);
      if (exitItem) {
        exitItem.count = exitItem.count + 1;
        cart.quantity = cart.quantity + 1;
        cart.total = cart.total + exitItem.product.price;
        const newCart = await cart.save();
        res.json(newCart);
      } else {
        const product = await Product.findById(req.params.id);
        cart.products.unshift({ product: product, count: 1 });
        cart.quantity = cart.quantity + 1;
        cart.total = cart.total + product.price;
        const newCart = await cart.save();
        res.json(newCart);
      }
    } else {
      const cart = {};
      cart.user = req.user.id;
      cart.products = [];
      const product = await Product.findById(req.params.id);
      cart.products.unshift({ product: product, count: 1 });
      cart.quantity = 1;
      cart.total = product.price;

      const newCart = new Cart(cart);
      await newCart.save();
      res.json(newCart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/minus/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const item = cart.products.find(
      product => product.product._id.toString() === req.params.id
    );
    if (item.count > 1) {
      item.count = item.count - 1;
      cart.total = cart.total - item.product.price;
      const newCart = await cart.save();
      res.json(newCart);
    } else {
      res.json(cart);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/plus/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const item = cart.products.find(
      product => product.product._id.toString() === req.params.id
    );
    item.count = item.count + 1;
    cart.total = cart.total + item.product.price;
    const newCart = await cart.save();
    res.json(newCart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/remove/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const item = cart.products.find(
      product => product.product._id.toString() === req.params.id
    );
    cart.quantity = cart.quantity - 1;
    cart.total = cart.total - item.product.price * item.count;
    await item.remove();
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
