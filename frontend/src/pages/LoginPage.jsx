import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: 'admin@astms.com', password: '', role: 'Admin' });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(form);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">ASTMS</h1>
          <p className="mt-2 text-sm text-slate-500">Automated Software Testing Management System</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Role</label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            >
              <option>Admin</option>
              <option>Tester</option>
              <option>Developer</option>
            </select>
          </div>

          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
