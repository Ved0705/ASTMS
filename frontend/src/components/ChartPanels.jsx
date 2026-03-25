import Card from './ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#16a34a', '#e11d48', '#f59e0b', '#3b82f6', '#9333ea'];

export function DashboardCharts({ passFail, moduleData }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-4 text-base font-semibold">Pass vs Fail</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={passFail} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                {passFail.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-base font-semibold">Tests by Module</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

export function ReportCharts({ passFail, bugsBySeverity, trendData }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card>
        <h3 className="mb-3 font-semibold">Pass vs Fail</h3>
        <div className="h-60">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={passFail} dataKey="value" nameKey="name" outerRadius={80}>
                {passFail.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">Bugs by Severity</h3>
        <div className="h-60">
          <ResponsiveContainer>
            <BarChart data={bugsBySeverity}>
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">Execution Trends</h3>
        <div className="h-60">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="passed" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#e11d48" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
