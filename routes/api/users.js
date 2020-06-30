const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number must be atleast 10 characters').isLength({
      min: 10
    }),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, password } = req.body;

    try {
      let user = await User.findOne({ phone });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        phone,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/edit', [
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number must be atleast 10 characters').isLength({
      min: 10
    }),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, phone, email } = req.body;

      const userFields = {};
      userFields.name = name;
      userFields.phone = phone;
      userFields.email = email;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
]);

module.exports = router;
