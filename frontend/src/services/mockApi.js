import { activitySeed, bugsSeed, testCasesSeed, users } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000';
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

// AUTH SERVICE
export const authService = {
  async login({ email, role }) {
    await delay();

    const match = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.role === role
    );

    return match ?? { name: `${role} User`, email, role };
  },
};

// TEST CASE SERVICE
export const testCaseService = {
  async getAll() {
    try {
      const res = await fetch(`${API_BASE_URL}/testcases`);
      if (!res.ok) throw new Error('Failed to fetch');

      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable → using mock test cases');
      return testCasesSeed;
    }
  },

  async create(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/testcases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create');

      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable → creating local mock');

      return {
        id: `TC-${100 + Math.floor(Math.random() * 900)}`,
        title: payload.title,
        module: payload.module || 'General',
        priority: payload.priority || 'Medium',
        status: 'Not Executed',
        description: payload.description,
        steps: payload.steps,
        expectedResult: payload.expectedResult,
      };
    }
  },
};

// DATA SERVICE
export const dataService = {
  async getSeedData() {
    await delay();

    const testCases = await testCaseService.getAll();
    return {
      testCases,
      bugs: bugsSeed,
      activities: activitySeed,
    };
  },
};
