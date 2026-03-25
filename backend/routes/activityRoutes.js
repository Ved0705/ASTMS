const express = require('express');
const { getActivities, createActivity } = require('../controllers/activityController');

const router = express.Router();

router.get('/activities', getActivities);
router.post('/activities', createActivity);

module.exports = router;
