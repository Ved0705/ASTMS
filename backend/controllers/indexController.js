const { getApiStatus } = require('../models/statusModel');

const getRootStatus = (req, res) => {
  res.status(200).json(getApiStatus());
};

module.exports = {
  getRootStatus,
};
