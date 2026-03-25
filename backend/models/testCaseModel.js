const testCases = [
  {
    id: 'TC-101',
    title: 'Validate login with valid credentials',
    module: 'Authentication',
    priority: 'High',
    status: 'Pass',
  },
  {
    id: 'TC-102',
    title: 'Reject invalid password',
    module: 'Authentication',
    priority: 'High',
    status: 'Fail',
  },
  {
    id: 'TC-205',
    title: 'Create bug from failed test',
    module: 'Bug Tracking',
    priority: 'Medium',
    status: 'Not Executed',
  },
];

const getAllTestCases = () => testCases;

const createTestCase = (payload) => {
  const next = {
    id: `TC-${100 + testCases.length + 1}`,
    title: payload.title,
    module: payload.module || 'General',
    priority: payload.priority || 'Medium',
    status: payload.status || 'Not Executed',
  };

  testCases.push(next);
  return next;
};

module.exports = {
  getAllTestCases,
  createTestCase,
};
