import { useEffect, useMemo, useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TestCasesPage from './pages/TestCasesPage';
import ExecutionPage from './pages/ExecutionPage';
import BugsPage from './pages/BugsPage';
import ReportsPage from './pages/ReportsPage';
import { authService, dataService, testCaseService } from './services/mockApi';
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
      const normalizedTestCases = testCases.map((item) => ({

  // Load initial data
  useEffect(() => {
    dataService.getSeedData().then(({ testCases, bugs, activities }) => {
      const normalized = testCases.map((item) => ({
        ...item,
        description: item.description || 'No description provided.',
        steps: item.steps || 'No steps available.',
        expectedResult: item.expectedResult || 'No expected result specified.',
      }));
      setTestCases(normalizedTestCases);

      setTestCases(normalized);
      setBugs(bugs);
      setActivities(activities);
    });
  }, []);
  const metrics = useMemo(() => {
    const passed = testCases.filter((test) => test.status === 'Pass').length;
    const failed = testCases.filter((test) => test.status === 'Fail').length;
    const executedTests = passed + failed;
    const openBugs = bugs.filter((bug) => bug.status !== 'Closed').length;

  // Metrics
  const metrics = useMemo(() => {
    const passed = testCases.filter((t) => t.status === 'Pass').length;
    const failed = testCases.filter((t) => t.status === 'Fail').length;
    const executedTests = passed + failed;
    const openBugs = bugs.filter((b) => b.status !== 'Closed').length;


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
  const passFailData = useMemo(() => [
    { name: 'Pass', value: metrics.passed || 1 },
    { name: 'Fail', value: metrics.failed || 1 },
  ], [metrics]);

  const moduleData = useMemo(() => {
    const counts = {};
    testCases.forEach((t) => {
      counts[t.module] = (counts[t.module] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [testCases]);

  const bugsBySeverity = useMemo(() => {

    const counts = bugs.reduce((acc, item) => {
      acc[item.severity] = (acc[item.severity] ?? 0) + 1;
      return acc;
    }, {});

    const counts = {};
    bugs.forEach((b) => {
      counts[b.severity] = (counts[b.severity] || 0) + 1;
    });

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


  const createTestCase = async (form) => {
    const created = await testCaseService.create(form);
    const next = {
      ...form,
      ...created,
      description: created.description || form.description || 'No description provided.',
      steps: created.steps || form.steps || 'No steps available.',
      expectedResult: created.expectedResult || form.expectedResult || 'No expected result specified.',
      status: created.status || 'Not Executed',
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

  const createTestCase = async (form) => {
    const created = await testCaseService.create(form);

    const next = {
      ...form,
      ...created,
      status: 'Not Executed',
    };

    setTestCases((prev) => [next, ...prev]);
    setActivities((prev) => [
      { id: Date.now(), text: `${next.id} created`, time: 'Just now' },
      ...prev,
    ]);
  };

  const executeTestCase = (id, result) => {
    setTestCases((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: result } : t))
    );

    setExecutionHistory((prev) => [
      { testId: id, result, timestamp: new Date().toLocaleString() },
      ...prev,
    ]);

    setActivities((prev) => [
      { id: Date.now(), text: `${id} executed with ${result}`, time: 'Just now' },
      ...prev,
    ]);
  };


  const createBug = (form) => {
    const newBug = {
      id: `BUG-${bugs.length + 1}`,

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

    setBugs((prev) => [newBug, ...prev]);
    setActivities((prev) => [
      { id: Date.now(), text: `${newBug.id} created`, time: 'Just now' },
      ...prev,
    ]);
  };

  const updateBug = (id, patch) => {
    setBugs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b))
    );
  };

  // Pages
  const pageContent = {
    dashboard: (
      <DashboardPage
        metrics={metrics}
        moduleData={moduleData}
        passFailData={passFailData}
        activities={activities}
      />
    ),
    testCases: (
      <TestCasesPage testCases={testCases} onCreate={createTestCase} />
    ),
    execution: (
      <ExecutionPage
        testCases={testCases}
        executionHistory={executionHistory}
        onExecute={executeTestCase}
      />
    ),
    bugs: (
      <BugsPage
        bugs={bugs}
        developers={developers}
        onCreateBug={createBug}
        onUpdateBug={updateBug}
      />
    ),
    reports: (
      <ReportsPage
        passFailData={passFailData}
        bugsBySeverity={bugsBySeverity}
        trendData={trendData}
      />
    ),

  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <AppLayout user={user} activePage={activePage} onNavigate={setActivePage} onLogout={() => setUser(null)}>
      {pageContent[activePage]}
    </AppLayout>
  );
}
    <AppLayout
      user={user}
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={() => setUser(null)}
    >
      {pageContent[activePage]}
    </AppLayout>
  );
}

