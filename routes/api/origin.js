const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('useFindAndModify', false);

const Origin = require('../../models/Origin');

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

router.post('/add', auth, upload.array('file'), async (req, res) => {
  try {
    const { name, section } = req.body;

    let originFields = {};
    if (name) originFields.name = name;
    if (section) originFields.section = section;
    originFields.files = [];
    if (req.file || req.files) {
      for (var i = 0; i < req.files.length; i++) {
        originFields.files.push(req.files[i].location);
      }
    }
    let origin = await Origin.findOneAndUpdate(
      { name, section },
      { $set: originFields },
      { new: true, upsert: true }
    );
    res.json(origin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const origins = await Origin.find();
    if (origins) {
      res.json(origins);
    } else {
      return res.status(400).json({ msg: 'No origins' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/section/:section', async (req, res) => {
  try {
    const origins = await Origin.find({ section: req.params.section });
    if (origins) {
      res.json(origins);
    } else {
      return res.status(400).json({ msg: 'No origins' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/originId/:id', async (req, res) => {
  try {
    const origin = await Origin.findById(req.params.id);
    res.json(origin);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.get('/findLanding', async (req, res) => {
  try {
    const origins = await Origin.find({ landing: 'yes' });
    if (origins) {
      res.json(origins);
    } else {
      return res.status(400).json({ msg: 'Origin not found' });
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
    check('section', 'Section is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, section } = req.body;

      const originFields = {};
      //originFields.user = req.user.id;
      if (name) originFields.name = name;
      if (section) originFields.section = section;
      originFields.available = 'yes';

      let origin = await Origin.findByIdAndUpdate(
        req.params.id,
        { $set: originFields },
        { new: true }
      );
      if (!origin) return res.status(400).json({ msg: 'Origin not found' });
      res.json(origin);
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
      let originFields = {};
      originFields.files = [];
      if (req.file || req.files) {
        for (var i = 0; i < req.files.length; i++) {
          originFields.files.push(req.files[i].location);
        }
      }
      let origin = await Origin.findByIdAndUpdate(
        req.params.id,
        { $set: originFields },
        { new: true }
      );
      if (!origin) return res.status(400).json({ msg: 'Origin not found' });
      res.json(origin);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/addLanding/:id', auth, async (req, res) => {
  try {
    let originFields = {};
    originFields.landing = 'yes';
    let origin = await Origin.findByIdAndUpdate(
      req.params.id,
      { $set: originFields },
      { new: true }
    );
    if (!origin) return res.status(400).json({ msg: 'Origin not found' });
    res.json(origin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/removeLanding/:id', auth, async (req, res) => {
  try {
    let originFields = {};
    originFields.landing = 'no';
    let origin = await Origin.findByIdAndUpdate(
      req.params.id,
      { $set: originFields },
      { new: true }
    );
    if (!origin) return res.status(400).json({ msg: 'Origin not found' });
    res.json(origin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/makeNotAvailable/:id', auth, async (req, res) => {
  try {
    let originFields = {};
    originFields.available = 'no';
    let origin = await Origin.findByIdAndUpdate(
      req.params.id,
      { $set: originFields },
      { new: true }
    );
    if (!origin) return res.status(400).json({ msg: 'Origin not found' });
    res.json(origin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
