export default function Topbar({ user }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:px-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Welcome back, {user.name}</h2>
        <p className="text-sm text-slate-500">{user.role} • ASTMS Workspace</p>
      </div>
      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">{user.email}</div>
    </header>
  );
}
