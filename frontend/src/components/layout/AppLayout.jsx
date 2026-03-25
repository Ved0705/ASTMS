import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ user, activePage, onNavigate, onLogout, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      <Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="flex flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 space-y-6 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
