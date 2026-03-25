const express = require('express');
const { getRootStatus } = require('../controllers/indexController');

const router = express.Router();

router.get('/', getRootStatus);

module.exports = router;
