const getAllTestCases = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 'TC-001',
        title: 'Sample test case',
        module: 'Authentication',
        priority: 'High',
        status: 'Not Executed',
      },
    ],
  });
};

module.exports = {
  getAllTestCases,
};
