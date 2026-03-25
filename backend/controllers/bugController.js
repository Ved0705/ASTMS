const bugs = [
  { id: 'BUG-54', title: 'Login button overlaps on mobile', severity: 'Medium', status: 'Open', assignedTo: 'Devon Developer' },
  { id: 'BUG-55', title: 'Dashboard chart tooltips not readable', severity: 'Low', status: 'In Progress', assignedTo: 'Jordan Lee' },
  { id: 'BUG-56', title: 'Execution save fails for long steps', severity: 'High', status: 'Open', assignedTo: 'Chris Nolan' },
  { id: 'BUG-57', title: 'Incorrect pass/fail totals in reports', severity: 'Critical', status: 'Closed', assignedTo: 'Devon Developer' },
];

const developers = ['Devon Developer', 'Jordan Lee', 'Chris Nolan', 'Morgan Patel'];

const getBugs = (req, res) => {
  res.status(200).json(bugs);
};

const createBug = (req, res) => {
  const { title, severity, assignedTo } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const newBug = {
    id: `BUG-${bugs.length + 54}`,
    title,
    severity: severity || 'Medium',
    status: 'Open',
    assignedTo: assignedTo || developers[0],
  };

  bugs.unshift(newBug);
  return res.status(201).json(newBug);
};

const updateBug = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const bugIndex = bugs.findIndex((b) => b.id === id);

  if (bugIndex === -1) {
    return res.status(404).json({ message: 'Bug not found' });
  }

  bugs[bugIndex] = { ...bugs[bugIndex], ...updates };
  return res.status(200).json(bugs[bugIndex]);
};

module.exports = {
  getBugs,
  createBug,
  updateBug,
};
