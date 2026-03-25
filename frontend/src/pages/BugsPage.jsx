import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';

const initialForm = { title: '', severity: 'Medium', status: 'Open', assignedTo: '' };

export default function BugsPage({ bugs, developers, onCreateBug, onUpdateBug }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  const columns = [
    { key: 'id', label: 'Bug ID', cellClassName: 'font-semibold text-blue-700' },
    { key: 'title', label: 'Title' },
    { key: 'severity', label: 'Severity', render: (bug) => <Badge value={bug.severity} /> },
    {
      key: 'status',
      label: 'Status',
      render: (bug) => (
        <select
          className="rounded-md border border-slate-300 px-2 py-1 text-xs"
          value={bug.status}
          onChange={(e) => onUpdateBug(bug.id, { status: e.target.value })}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      ),
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      render: (bug) => (
        <select
          className="rounded-md border border-slate-300 px-2 py-1 text-xs"
          value={bug.assignedTo}
          onChange={(e) => onUpdateBug(bug.id, { assignedTo: e.target.value })}
        >
          {developers.map((dev) => (
            <option key={dev}>{dev}</option>
          ))}
        </select>
      ),
    },
    { key: 'actions', label: 'Actions', render: () => <span className="text-xs text-slate-500">Editable</span> },
  ];

  const createBug = () => {
    onCreateBug(form);
    setForm(initialForm);
    setShowModal(false);
  };

  return (
    <Card>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Bug Tracking</h3>
          <p className="mt-1 text-sm text-slate-500">Monitor, assign, and update defect lifecycle status.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>Create Bug</Button>
      </div>

      <Table columns={columns} data={bugs} emptyState="No bugs logged yet." />

      <Modal
        title="Create Bug"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={createBug}>Save Bug</Button>
          </>
        }
      >
        <div className="grid gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Severity</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.severity} onChange={(e) => setForm((prev) => ({ ...prev, severity: e.target.value }))}>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Assign Developer</label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={form.assignedTo} onChange={(e) => setForm((prev) => ({ ...prev, assignedTo: e.target.value }))}>
              <option value="">Select developer</option>
              {developers.map((dev) => (
                <option key={dev}>{dev}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
