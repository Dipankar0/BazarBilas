const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

require('dotenv').config();

mongoose.set('useFindAndModify', false);

const Product = require('../../models/Product');

const s3 = new aws.S3({
  accessKeyId: `${process.env.accessKeyId}`,
  secretAccessKey: `${process.env.secretAccessKey}`,
  Bucket: `${process.env.Bucket}`
});

//Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'rdbazarbilas',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/add', auth, upload.array('file'), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    name,
    quantity,
    originId,
    price,
    notPrice,
    description,
    code
  } = req.body;
  // Build product object
  const productFields = {};
  productFields.user = req.user.id;
  if (name) productFields.name = name;
  if (quantity) productFields.quantity = quantity;
  if (originId) productFields.originId = originId;
  if (notPrice) productFields.notPrice = notPrice;
  if (price) productFields.price = price;
  if (description) productFields.description = description;
  if (code) productFields.code = code;
  productFields.totalSold = 0;
  productFields.available = 'yes';

  productFields.files = [];
  if (req.file || req.files) {
    for (var i = 0; i < req.files.length; i++) {
      productFields.files.push(req.files[i].location);
    }
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let product = new Product(productFields);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/originId/:id', async (req, res) => {
  try {
    const products = await Product.find({ originId: req.params.id });
    if (!products) return res.status(400).json({ msg: 'Product not found' });
    res.json(products);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.get('/productId/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.get('/findHotSell', async (req, res) => {
  try {
    const products = await Product.find({ hotSell: 'yes' });
    if (products) {
      res.json(products);
    } else {
      return res.status(400).json({ msg: 'Product not found' });
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//Update Section

router.post('/update/:id', [
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('quantity', 'Quantity is required')
      .not()
      .isEmpty(),
    check('notPrice', 'Crossed price is required')
      .not()
      .isEmpty(),
    check('price', 'Price is required')
      .not()
      .isEmpty(),
    check('description', 'Product description is required')
      .not()
      .isEmpty(),
    check('code', 'Product Code is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, quantity, price, notPrice, description, code } = req.body;

      const productFields = {};
      //productFields.user = req.user.id;
      if (name) productFields.name = name;
      if (quantity) productFields.quantity = quantity;
      if (notPrice) productFields.notPrice = notPrice;
      if (price) productFields.price = price;
      if (description) productFields.description = description;
      if (code) productFields.code = code;
      productFields.available = 'yes';

      let product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: productFields },
        { new: true }
      );
      if (!product) return res.status(400).json({ msg: 'Product not found' });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
]);

router.post(
  '/updateFiles/:id',
  auth,
  upload.array('file'),
  async (req, res) => {
    try {
      let productFields = {};
      productFields.files = [];
      if (req.file || req.files) {
        for (var i = 0; i < req.files.length; i++) {
          productFields.files.push(req.files[i].location);
        }
      }
      let product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: productFields },
        { new: true }
      );
      if (!product) return res.status(400).json({ msg: 'Product not found' });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/addhotSell/:id', auth, async (req, res) => {
  try {
    let productFields = {};
    productFields.hotSell = 'yes';
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    if (!product) return res.status(400).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/removehotSell/:id', auth, async (req, res) => {
  try {
    let productFields = {};
    productFields.hotSell = 'no';
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    if (!product) return res.status(400).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/makeNotAvailable/:id', auth, async (req, res) => {
  try {
    let productFields = {};
    productFields.available = 'no';
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    if (!product) return res.status(400).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
