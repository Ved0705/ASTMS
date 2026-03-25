const API_BASE_URL = 'http://localhost:5000';

export const authService = {
  async login(payload) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
};

export const testCaseService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/testcases`);
    if (!res.ok) throw new Error('Failed to fetch test cases');
    return res.json();
  },

  async create(payload) {
    const res = await fetch(`${API_BASE_URL}/testcases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create test case');
    return res.json();
  },

  async update(id, payload) {
    const res = await fetch(`${API_BASE_URL}/testcases/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update test case');
    return res.json();
  },
};

export const bugService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/bugs`);
    if (!res.ok) throw new Error('Failed to fetch bugs');
    return res.json();
  },

  async create(payload) {
    const res = await fetch(`${API_BASE_URL}/bugs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create bug');
    return res.json();
  },

  async update(id, payload) {
    const res = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update bug');
    return res.json();
  },
};

export const activityService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/activities`);
    if (!res.ok) throw new Error('Failed to fetch activities');
    return res.json();
  },

  async create(payload) {
    const res = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to log activity');
    return res.json();
  },
};

export const dataService = {
  async getInitialData() {
    const [testCases, bugs, activities] = await Promise.all([
      testCaseService.getAll(),
      bugService.getAll(),
      activityService.getAll(),
    ]);

    return { testCases, bugs, activities };
  },
};
