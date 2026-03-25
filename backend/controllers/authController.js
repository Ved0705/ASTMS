const users = [
  { id: 1, name: 'Avery Admin', email: 'admin@astms.com', role: 'Admin' },
  { id: 2, name: 'Taylor Tester', email: 'tester@astms.com', role: 'Tester' },
  { id: 3, name: 'Devon Developer', email: 'developer@astms.com', role: 'Developer' },
];

const login = (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: 'Email and role are required' });
  }

  const match = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.role === role
  );

  return res.status(200).json(match ?? { name: `${role} User`, email, role });
};

module.exports = {
  login,
};
