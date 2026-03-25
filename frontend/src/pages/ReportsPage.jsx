import { ReportCharts } from '../components/ChartPanels';

export default function ReportsPage({ passFailData, bugsBySeverity, trendData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Reports & Analytics</h3>
        <p className="mt-1 text-sm text-slate-500">Visualize quality trends, defect severity, and execution performance.</p>
      </div>
      <ReportCharts passFail={passFailData} bugsBySeverity={bugsBySeverity} trendData={trendData} />
    </div>
  );
}
