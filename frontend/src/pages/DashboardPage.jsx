import Card from '../components/ui/Card';
import SummaryCards from '../components/SummaryCards';
import { DashboardCharts } from '../components/ChartPanels';

export default function DashboardPage({ metrics, moduleData, passFailData, activities }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h3>
        <p className="mt-1 text-sm text-slate-500">Overview of testing progress, outcomes, and open defects.</p>
      </div>
      <SummaryCards metrics={metrics} />
      <DashboardCharts passFail={passFailData} moduleData={moduleData} />
      <Card>
        <h4 className="mb-3 text-base font-semibold text-slate-900">Recent Activity</h4>
        <ul className="space-y-2 text-sm text-slate-600">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <span>{activity.text}</span>
              <span className="text-xs text-slate-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
