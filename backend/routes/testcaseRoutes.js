const express = require('express');
const { getTestCases, createTestCase } = require('../controllers/testcaseController');

const router = express.Router();

router.get('/testcases', getTestCases);
router.post('/testcases', createTestCase);

module.exports = router;
