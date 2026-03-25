const express = require('express');
const { getTestCases, addTestCase } = require('../controllers/testCaseController');

const router = express.Router();

router.get('/testcases', getTestCases);
router.post('/testcases', addTestCase);

module.exports = router;
