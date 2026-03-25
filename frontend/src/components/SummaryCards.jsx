import Card from './ui/Card';

export default function SummaryCards({ metrics }) {
  const cardData = [
    { label: 'Total Test Cases', value: metrics.totalTestCases, color: 'text-blue-600' },
    { label: 'Executed Tests', value: metrics.executedTests, color: 'text-indigo-600' },
    { label: 'Passed / Failed', value: `${metrics.passed} / ${metrics.failed}`, color: 'text-emerald-600' },
    { label: 'Open Bugs', value: metrics.openBugs, color: 'text-rose-600' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cardData.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
          <p className={`mt-3 text-3xl font-bold tracking-tight ${item.color}`}>{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
