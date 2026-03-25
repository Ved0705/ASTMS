const { getAllTestCases, createTestCase } = require('../models/testCaseModel');

const getTestCases = (req, res) => {
  res.status(200).json(getAllTestCases());
};

const addTestCase = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'title is required' });
  }

  const created = createTestCase(req.body);
  return res.status(201).json(created);
};

module.exports = {
  getTestCases,
  addTestCase,
};
