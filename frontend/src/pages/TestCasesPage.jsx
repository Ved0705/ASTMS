import { useEffect, useMemo, useState } from 'react';
import Table from '../components/ui/Table';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

const initialForm = {
  title: '',
  description: '',
  steps: '',
  expectedResult: '',
  priority: 'Medium',
  module: 'General',
};

export default function TestCasesPage({ testCases, onCreate }) {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [apiTestCases, setApiTestCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestCases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/testcases');
      if (!response.ok) throw new Error('Failed to fetch test cases');
      const data = await response.json();
      setApiTestCases(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      setApiTestCases(testCases);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, []);

  useEffect(() => {
    if (!apiTestCases.length && testCases.length) {
      setApiTestCases(testCases);
    }
  }, [testCases, apiTestCases.length]);

  const filtered = useMemo(
    () =>
      apiTestCases.filter((item) =>
        `${item.id} ${item.title} ${item.module || ''}`.toLowerCase().includes(query.toLowerCase())
      ),
    [apiTestCases, query]
  );

  const columns = [
    { key: 'id', label: 'Test ID', cellClassName: 'font-semibold text-blue-700' },
    { key: 'title', label: 'Title' },
    { key: 'module', label: 'Module', render: (row) => row.module || 'General' },
    { key: 'priority', label: 'Priority', render: (row) => <Badge value={row.priority} /> },
    { key: 'status', label: 'Status', render: (row) => <Badge value={row.status} /> },
  ];

  const handleCreate = async () => {
    await onCreate(form);
    setForm(initialForm);
    setShowModal(false);
    fetchTestCases();
  };

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Test Case Management</h3>
          <p className="mt-1 text-sm text-slate-500">Search, review, and create test cases in one place.</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <input
            placeholder="Search by ID, title, module"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none md:w-72"
          />
          <Button onClick={() => setShowModal(true)}>Create Test Case</Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={filtered}
        emptyState={isLoading ? 'Loading test cases...' : 'No test cases matched your search.'}
      />

      <Modal
        title="Create Test Case"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Save Test Case</Button>
          </>
        }
      >
        <div className="grid gap-4">
          {[
            ['title', 'Title'],
            ['module', 'Module'],
            ['description', 'Description'],
            ['steps', 'Steps'],
            ['expectedResult', 'Expected Result'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium text-slate-600">{label}</label>
              {['description', 'steps', 'expectedResult'].includes(key) ? (
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={form[key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                />
              ) : (
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={form[key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                />
              )}
            </div>
          ))}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Priority</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.priority}
              onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </Modal>
    </Card>
  );
}