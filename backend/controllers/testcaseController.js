const testCases = [
  {
    id: 'TC-001',
    title: 'Validate login with valid credentials',
    description: 'User should be able to login with valid email and password.',
    priority: 'High',
    status: 'Not Executed',
  },
  {
    id: 'TC-002',
    title: 'Reject invalid password',
    description: 'System should show an error for incorrect password.',
    priority: 'High',
    status: 'Not Executed',
  },
];

const getTestCases = (req, res) => {
  res.status(200).json(testCases);
};

const createTestCase = (req, res) => {
  const { title, description, priority, status } = req.body;

  if (!title || !description || !priority || !status) {
    return res.status(400).json({
      message: 'title, description, priority, and status are required',
    });
  }

  const newTestCase = {
    id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
    title,
    description,
    priority,
    status,
  };

  testCases.push(newTestCase);
  return res.status(201).json(newTestCase);
};

module.exports = {
  getTestCases,
  createTestCase,
};
