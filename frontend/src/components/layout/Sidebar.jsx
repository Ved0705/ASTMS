import Button from '../ui/Button';

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'testCases', label: 'Test Cases' },
  { key: 'execution', label: 'Execution' },
  { key: 'bugs', label: 'Bugs' },
  { key: 'reports', label: 'Reports' },
];

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="w-full border-r border-slate-200 bg-secondary text-slate-100 md:w-72 md:min-h-screen">
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-xl font-bold tracking-tight">ASTMS</h1>
        <p className="mt-1 text-xs text-slate-400">Automated Software Testing Management System</p>
      </div>
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
              activePage === item.key ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4">
        <Button variant="danger" className="w-full" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </aside>
  );
}
