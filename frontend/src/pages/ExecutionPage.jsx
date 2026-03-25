import { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

export default function ExecutionPage({ testCases, executionHistory, onExecute }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState('Pass');

  const historyPreview = useMemo(() => executionHistory.slice(0, 5), [executionHistory]);

  const columns = [
    { key: 'id', label: 'Test ID', cellClassName: 'font-semibold text-blue-700' },
    { key: 'title', label: 'Title' },
    { key: 'status', label: 'Current Status', render: (row) => <Badge value={row.status} /> },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <Button
          className="text-xs"
          onClick={() => {
            setSelected(row);
            setResult('Pass');
          }}
        >
          Execute
        </Button>
      ),
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="mb-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Test Execution</h3>
          <p className="mt-1 text-sm text-slate-500">Run test cases and capture pass/fail outcomes.</p>
        </div>
        <Table columns={columns} data={testCases} emptyState="No test cases available for execution." />
      </Card>

      <Card>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">Recent Executions</h3>
        <p className="mb-4 mt-1 text-sm text-slate-500">Latest execution events from your team.</p>
        <ul className="space-y-2 text-sm">
          {historyPreview.map((item) => (
            <li key={item.timestamp} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">{item.testId}</p>
              <p className="text-slate-500">Result: {item.result}</p>
              <p className="text-xs text-slate-400">{item.timestamp}</p>
            </li>
          ))}
          {!historyPreview.length && <p className="text-sm text-slate-500">No executions recorded yet.</p>}
        </ul>
      </Card>

      <Modal
        title={`Execute ${selected?.id ?? ''}`}
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              variant={result === 'Pass' ? 'success' : 'danger'}
              onClick={() => {
                onExecute(selected.id, result);
                setSelected(null);
              }}
            >
              Save Execution
            </Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-1 font-medium text-slate-700">Steps</p>
              <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">{selected.steps}</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-slate-700">Expected Result</p>
              <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">{selected.expectedResult}</p>
            </div>
            <div>
              <label className="mb-1 block font-medium text-slate-700">Mark Result</label>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={result} onChange={(e) => setResult(e.target.value)}>
                <option>Pass</option>
                <option>Fail</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
