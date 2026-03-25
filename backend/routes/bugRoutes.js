const express = require('express');
const { getBugs, createBug, updateBug } = require('../controllers/bugController');

const router = express.Router();

router.get('/bugs', getBugs);
router.post('/bugs', createBug);
router.patch('/bugs/:id', updateBug);

module.exports = router;
