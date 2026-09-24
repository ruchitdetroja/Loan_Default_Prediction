import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle,
  CheckCircle, BarChart3, PieChart as PieIcon
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import '../styles/Dashboard.css';

// Mock Data
const defaultByGrade = [
  { grade: 'A', defaultRate: 5.2, total: 42000, color: '#10b981' },
  { grade: 'B', defaultRate: 11.8, total: 38000, color: '#00d4ff' },
  { grade: 'C', defaultRate: 18.4, total: 35000, color: '#7c3aed' },
  { grade: 'D', defaultRate: 27.6, total: 28000, color: '#f59e0b' },
  { grade: 'E', defaultRate: 35.2, total: 18000, color: '#ef4444' },
  { grade: 'F', defaultRate: 43.8, total: 8000, color: '#ec4899' },
  { grade: 'G', defaultRate: 52.1, total: 3000, color: '#ef4444' },
];

const monthlyTrend = [
  { month: 'Jan', defaults: 320, approvals: 4200, volume: 12.5 },
  { month: 'Feb', defaults: 290, approvals: 4500, volume: 13.2 },
  { month: 'Mar', defaults: 380, approvals: 4100, volume: 11.8 },
  { month: 'Apr', defaults: 310, approvals: 4800, volume: 14.1 },
  { month: 'May', defaults: 270, approvals: 5100, volume: 15.3 },
  { month: 'Jun', defaults: 340, approvals: 4700, volume: 14.5 },
  { month: 'Jul', defaults: 250, approvals: 5300, volume: 16.2 },
  { month: 'Aug', defaults: 300, approvals: 5000, volume: 15.8 },
  { month: 'Sep', defaults: 280, approvals: 5200, volume: 16.5 },
  { month: 'Oct', defaults: 260, approvals: 5500, volume: 17.1 },
  { month: 'Nov', defaults: 310, approvals: 5100, volume: 15.9 },
  { month: 'Dec', defaults: 240, approvals: 5800, volume: 18.0 },
];

const loanPurpose = [
  { name: 'Debt Consolidation', value: 45, color: '#00d4ff' },
  { name: 'Credit Card', value: 20, color: '#7c3aed' },
  { name: 'Home Improvement', value: 12, color: '#10b981' },
  { name: 'Major Purchase', value: 8, color: '#f59e0b' },
  { name: 'Medical', value: 6, color: '#ef4444' },
  { name: 'Other', value: 9, color: '#64748b' },
];

const featureImportance = [
  { feature: 'Interest Rate', importance: 0.23 },
  { feature: 'Credit Score', importance: 0.19 },
  { feature: 'Loan Grade', importance: 0.16 },
  { feature: 'DTI Ratio', importance: 0.12 },
  { feature: 'Annual Income', importance: 0.09 },
  { feature: 'Loan Amount', importance: 0.07 },
  { feature: 'Employment Length', importance: 0.05 },
  { feature: 'Home Ownership', importance: 0.04 },
  { feature: 'Delinquencies', importance: 0.03 },
  { feature: 'Num Accounts', importance: 0.02 },
];

const modelMetrics = [
  { metric: 'Accuracy', value: 95.8 },
  { metric: 'Precision', value: 93.2 },
  { metric: 'Recall', value: 91.5 },
  { metric: 'F1 Score', value: 92.3 },
  { metric: 'AUC-ROC', value: 94.0 },
  { metric: 'Specificity', value: 96.1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="value" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          {entry.name.includes('Rate') || entry.name.includes('rate') ? '%' : ''}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard-page container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-purple"><BarChart3 size={12} /> Analytics</span>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Comprehensive analytics and insights from loan performance data
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="dashboard-metrics">
          {[
            { icon: Users, label: 'Total Loans', value: 255000, suffix: '', color: '#00d4ff', bg: 'var(--color-accent-cyan-dim)', change: '+12.5%', up: true },
            { icon: AlertTriangle, label: 'Default Rate', value: 21.3, suffix: '%', color: '#ef4444', bg: 'var(--color-accent-red-dim)', change: '-2.1%', up: false },
            { icon: DollarSign, label: 'Avg Loan Amount', value: 15250, suffix: '', prefix: '$', color: '#10b981', bg: 'var(--color-accent-green-dim)', change: '+5.8%', up: true },
            { icon: CheckCircle, label: 'Approval Rate', value: 78.7, suffix: '%', color: '#7c3aed', bg: 'var(--color-accent-purple-dim)', change: '+3.2%', up: true },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="metric-card"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="metric-icon" style={{ background: m.bg, color: m.color }}>
                <m.icon size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">{m.label}</span>
                <span className="metric-value" style={{ color: m.color }}>
                  <AnimatedCounter end={m.value} prefix={m.prefix || ''} suffix={m.suffix} decimals={m.suffix === '%' ? 1 : 0} />
                </span>
                <span className="metric-change" style={{ color: m.up ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                  {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {m.change} vs last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="dashboard-charts">
          {/* Default Rate by Grade */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Default Rate by Loan Grade</h3>
              <span className="chart-badge">Bar Chart</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={defaultByGrade} barRadius={[6, 6, 0, 0]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="grade" stroke="rgba(255,255,255,0.1)" />
                <YAxis stroke="rgba(255,255,255,0.1)" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="defaultRate" name="Default Rate" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Loan Purpose Distribution */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Loan Purpose Distribution</h3>
              <span className="chart-badge">Donut Chart</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanPurpose}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {loanPurpose.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            className="chart-card full-width"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Monthly Loan Performance</h3>
              <span className="chart-badge">Trend Line</span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.1)" />
                <YAxis stroke="rgba(255,255,255,0.1)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <defs>
                  <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="approvals" name="Approvals" stroke="#10b981" fill="url(#areaGreen)" strokeWidth={2} />
                <Area type="monotone" dataKey="defaults" name="Defaults" stroke="#ef4444" fill="url(#areaRed)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Feature Importance */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Feature Importance</h3>
              <span className="chart-badge">Horizontal Bar</span>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.1)" domain={[0, 0.25]} />
                <YAxis type="category" dataKey="feature" stroke="rgba(255,255,255,0.1)" width={120} tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="importance" name="Importance" fill="url(#featureGradient)" radius={[0, 6, 6, 0]} barSize={18} />
                <defs>
                  <linearGradient id="featureGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Model Performance Radar */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Model Performance Metrics</h3>
              <span className="chart-badge">Radar Chart</span>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart data={modelMetrics} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#00d4ff"
                  fill="#00d4ff"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
