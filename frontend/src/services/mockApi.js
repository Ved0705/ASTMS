import { activitySeed, bugsSeed, testCasesSeed, users } from '../data/mockData';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login({ email, role }) {
    await delay();
    const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.role === role);
    return match ?? { name: role + ' User', email, role };
  },
};

export const dataService = {
  async getSeedData() {
    await delay();
    return {
      testCases: testCasesSeed,
      bugs: bugsSeed,
      activities: activitySeed,
    };
  },
};
