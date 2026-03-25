const express = require('express');
const { getAllTestCases } = require('../controllers/testcaseController');

const router = express.Router();

router.get('/testcases', getAllTestCases);

module.exports = router;
