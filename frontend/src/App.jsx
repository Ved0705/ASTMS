import { useEffect, useMemo, useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TestCasesPage from './pages/TestCasesPage';
import ExecutionPage from './pages/ExecutionPage';
import BugsPage from './pages/BugsPage';
import ReportsPage from './pages/ReportsPage';
import { authService, dataService } from './services/mockApi';
import { developers } from './data/mockData';

export default function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [testCases, setTestCases] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [executionHistory, setExecutionHistory] = useState([]);

  useEffect(() => {
    dataService.getSeedData().then(({ testCases, bugs, activities }) => {
      setTestCases(testCases);
      setBugs(bugs);
      setActivities(activities);
    });
  }, []);

  const metrics = useMemo(() => {
    const passed = testCases.filter((test) => test.status === 'Pass').length;
    const failed = testCases.filter((test) => test.status === 'Fail').length;
    const executedTests = passed + failed;
    const openBugs = bugs.filter((bug) => bug.status !== 'Closed').length;
    return {
      totalTestCases: testCases.length,
      executedTests,
      passed,
      failed,
      openBugs,
    };
  }, [testCases, bugs]);

  const passFailData = useMemo(
    () => [
      { name: 'Pass', value: metrics.passed || 1 },
      { name: 'Fail', value: metrics.failed || 1 },
    ],
    [metrics]
  );

  const moduleData = useMemo(() => {
    const counts = testCases.reduce((acc, item) => {
      acc[item.module] = (acc[item.module] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [testCases]);

  const bugsBySeverity = useMemo(() => {
    const counts = bugs.reduce((acc, item) => {
      acc[item.severity] = (acc[item.severity] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([severity, count]) => ({ severity, count }));
  }, [bugs]);

  const trendData = [
    { day: 'Mon', passed: 8, failed: 2 },
    { day: 'Tue', passed: 6, failed: 3 },
    { day: 'Wed', passed: 10, failed: 1 },
    { day: 'Thu', passed: 9, failed: 2 },
    { day: 'Fri', passed: 12, failed: 1 },
  ];

  const handleLogin = async (payload) => {
    const loggedIn = await authService.login(payload);
    setUser(loggedIn);
  };

  const createTestCase = (form) => {
    const next = {
      id: `TC-${100 + testCases.length + 1}`,
      ...form,
      status: 'Not Executed',
    };
    setTestCases((prev) => [next, ...prev]);
    setActivities((prev) => [{ id: Date.now(), text: `${next.id} created`, time: 'Just now' }, ...prev]);
  };

  const executeTestCase = (id, result) => {
    setTestCases((prev) => prev.map((item) => (item.id === id ? { ...item, status: result } : item)));
    setExecutionHistory((prev) => [{ testId: id, result, timestamp: new Date().toLocaleString() }, ...prev]);
    setActivities((prev) => [{ id: Date.now(), text: `${id} executed with result ${result}`, time: 'Just now' }, ...prev]);
  };

  const createBug = (form) => {
    const newBug = {
      id: `BUG-${bugs.length + 58}`,
      title: form.title,
      severity: form.severity,
      status: 'Open',
      assignedTo: form.assignedTo || developers[0],
    };
    setBugs((prev) => [newBug, ...prev]);
    setActivities((prev) => [{ id: Date.now(), text: `${newBug.id} created`, time: 'Just now' }, ...prev]);
  };

  const updateBug = (id, patch) => {
    setBugs((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const pageContent = {
    dashboard: <DashboardPage metrics={metrics} moduleData={moduleData} passFailData={passFailData} activities={activities} />,
    testCases: <TestCasesPage testCases={testCases} onCreate={createTestCase} />,
    execution: <ExecutionPage testCases={testCases} executionHistory={executionHistory} onExecute={executeTestCase} />,
    bugs: <BugsPage bugs={bugs} developers={developers} onCreateBug={createBug} onUpdateBug={updateBug} />,
    reports: <ReportsPage passFailData={passFailData} bugsBySeverity={bugsBySeverity} trendData={trendData} />,
  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <AppLayout user={user} activePage={activePage} onNavigate={setActivePage} onLogout={() => setUser(null)}>
      {pageContent[activePage]}
    </AppLayout>
  );
}
