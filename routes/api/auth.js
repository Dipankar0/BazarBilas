const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('phone', 'Mobile Number is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required ').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
      let user = await User.findOne({ phone });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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

router.post(
  '/passwordChange',
  [
    auth,
    [
      check('password', 'Password is required ').exists(),
      check('newPassword', 'New Password is required ').exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Old password is not correct' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const newPass = await bcrypt.hash(newPassword, salt);

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: newPass },
      { $new: true }
    );
    res.json(newUser);
  }
);

module.exports = router;
