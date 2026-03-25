const styles = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
  Pass: 'bg-emerald-100 text-emerald-700',
  Fail: 'bg-rose-100 text-rose-700',
  Open: 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Closed: 'bg-slate-200 text-slate-700',
  Critical: 'bg-purple-100 text-purple-700',
  'Not Executed': 'bg-slate-100 text-slate-600',
};

export default function Badge({ value }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[value] ?? 'bg-slate-100 text-slate-700'}`}>{value}</span>;
}
