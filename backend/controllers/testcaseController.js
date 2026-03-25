const testCases = [
  {
    id: 'TC-001',
    title: 'Validate login with valid credentials',
    module: 'Authentication',
    description: 'User should be able to login with valid email and password.',
    priority: 'High',
    status: 'Not Executed',
  },
  {
    id: 'TC-002',
    title: 'Reject invalid password',
    module: 'Authentication',
    description: 'System should show an error for incorrect password.',
    priority: 'High',
    status: 'Not Executed',
  },
];

const getTestCases = (req, res) => {
  res.status(200).json(testCases);
};

const createTestCase = (req, res) => {
  const { title, description, priority, status, module: mod, steps, expectedResult } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const newTestCase = {
    id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
    title,
    module: mod || 'General',
    description: description || '',
    steps: steps || '',
    expectedResult: expectedResult || '',
    priority: priority || 'Medium',
    status: status || 'Not Executed',
  };

  testCases.push(newTestCase);
  return res.status(201).json(newTestCase);
};

module.exports = {
  getTestCases,
  createTestCase,
};
