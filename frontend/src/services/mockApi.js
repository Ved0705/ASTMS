import { activitySeed, bugsSeed, testCasesSeed, users } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000';
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login({ email, role }) {
    await delay();
    const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.role === role);
    return match ?? { name: `${role} User`, email, role };
  },
};

export const testCaseService = {
  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/testcases`);
      if (!response.ok) throw new Error('Failed to fetch test cases');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable. Falling back to local mock test cases.', error.message);
      return testCasesSeed;
    }
  },

  async create(payload) {
    try {
      const response = await fetch(`${API_BASE_URL}/testcases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create test case');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable. Creating local mock test case.', error.message);
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
