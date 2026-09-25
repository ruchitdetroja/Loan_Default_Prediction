import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  Database, Search, Table, BarChart3, Hash, Filter,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import '../styles/DataExplorer.css';

// Generate mock dataset matching backend features
const generateData = () => {
  const educations = ['High School', "Bachelor's", "Master's", 'PhD'];
  const employments = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed'];
  const maritalStatuses = ['Single', 'Married', 'Divorced'];
  const purposes = ['Home', 'Auto', 'Education', 'Business', 'Other'];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    age: Math.round(20 + Math.random() * 45),
    income: Math.round(25000 + Math.random() * 175000),
    loanAmount: Math.round(1000 + Math.random() * 49000),
    creditScore: Math.round(450 + Math.random() * 400),
    monthsEmployed: Math.round(Math.random() * 180),
    numCreditLines: Math.round(1 + Math.random() * 8),
    interestRate: +(3 + Math.random() * 22).toFixed(2),
    loanTerm: [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)],
    dtiRatio: +(2 + Math.random() * 48).toFixed(1),
    education: educations[Math.floor(Math.random() * educations.length)],
    employmentType: employments[Math.floor(Math.random() * employments.length)],
    maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
    hasMortgage: Math.random() > 0.5 ? 'Yes' : 'No',
    loanPurpose: purposes[Math.floor(Math.random() * purposes.length)],
    status: Math.random() > 0.79 ? 'Default' : 'Paid',
  }));
};

const mockData = generateData();

const incomeDistribution = [
  { range: '20k-40k', count: 35 }, { range: '40k-60k', count: 62 },
  { range: '60k-80k', count: 78 }, { range: '80k-100k', count: 55 },
  { range: '100k-120k', count: 38 }, { range: '120k-150k', count: 22 },
  { range: '150k+', count: 10 },
];

const creditScoreDistribution = [
  { range: '500-550', count: 8 }, { range: '550-600', count: 18 },
  { range: '600-650', count: 32 }, { range: '650-700', count: 45 },
  { range: '700-750', count: 52 }, { range: '750-800', count: 30 },
  { range: '800-850', count: 15 },
];

const featureStats = [
  { name: 'Age', min: '18', mean: '42', max: '65', pct: 65 },
  { name: 'Annual Income', min: '$25K', mean: '$76K', max: '$200K', pct: 76 },
  { name: 'Loan Amount', min: '$1K', mean: '$15K', max: '$50K', pct: 38 },
  { name: 'Credit Score', min: '450', mean: '698', max: '850', pct: 82 },
  { name: 'Months Employed', min: '0', mean: '60', max: '180', pct: 33 },
  { name: 'Credit Lines', min: '1', mean: '4', max: '9', pct: 44 },
  { name: 'Interest Rate', min: '3.0%', mean: '12.8%', max: '25.0%', pct: 51 },
  { name: 'Loan Term', min: '12 mo', mean: '36 mo', max: '60 mo', pct: 60 },
  { name: 'DTI Ratio', min: '2.0%', mean: '18.5%', max: '50.0%', pct: 37 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="value" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const ITEMS_PER_PAGE = 15;

export default function DataExplorer() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return mockData;
    const q = search.toLowerCase();
    return mockData.filter(
      (r) =>
        r.education.toLowerCase().includes(q) ||
        r.employmentType.toLowerCase().includes(q) ||
        r.loanPurpose.toLowerCase().includes(q) ||
        r.maritalStatus.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        String(r.income).includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="page-wrapper">
      <div className="data-page container">
        <motion.div
          className="data-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-green"><Database size={12} /> Dataset</span>
          <h1 className="section-title">Data Explorer</h1>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Browse, search, and analyze the loan default prediction dataset
          </p>
        </motion.div>

        {/* Summary Stats */}
        <div className="data-summary-grid">
          {[
            { label: 'Total Records', value: 255000, color: '#00d4ff' },
            { label: 'Features', value: 16, color: '#7c3aed' },
            { label: 'Default Rate', value: 21.3, suffix: '%', color: '#ef4444', decimals: 1 },
            { label: 'Missing Values', value: 0.2, suffix: '%', color: '#10b981', decimals: 1 },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="data-summary-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="data-summary-label">{s.label}</div>
              <div className="data-summary-value" style={{ color: s.color }}>
                <AnimatedCounter end={s.value} suffix={s.suffix || ''} decimals={s.decimals || 0} />
              </div>
              <div className="data-summary-sub">Loan_default.csv</div>
            </motion.div>
          ))}
        </div>

        {/* Data Table */}
        <motion.div
          className="data-table-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="data-table-toolbar">
            <h3><Table size={16} /> Sample Data</h3>
            <div className="data-search-wrapper">
              <Search size={14} className="data-search-icon" />
              <input
                className="data-search"
                type="text"
                placeholder="Search by education, employment, purpose..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>

          <div className="data-table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age</th>
                  <th>Income</th>
                  <th>Loan Amt</th>
                  <th>Credit Score</th>
                  <th>Int. Rate</th>
                  <th>DTI</th>
                  <th>Education</th>
                  <th>Emp. Type</th>
                  <th>Purpose</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.age}</td>
                    <td>${row.income.toLocaleString()}</td>
                    <td>${row.loanAmount.toLocaleString()}</td>
                    <td>{row.creditScore}</td>
                    <td>{row.interestRate}%</td>
                    <td>{row.dtiRatio}%</td>
                    <td>{row.education}</td>
                    <td>{row.employmentType}</td>
                    <td>{row.loanPurpose}</td>
                    <td className={row.status === 'Default' ? 'status-default' : 'status-paid'}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data-pagination">
            <span>Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
            <div className="data-pagination-btns">
              <button className="data-pagination-btn" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`data-pagination-btn ${page === p ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button className="data-pagination-btn" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Distribution Charts */}
        <div className="data-charts-grid">
          <motion.div
            className="data-chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="data-chart-title">
              <BarChart3 size={16} style={{ color: 'var(--color-accent-cyan)' }} />
              Income Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={incomeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="range" stroke="rgba(255,255,255,0.1)" />
                <YAxis stroke="rgba(255,255,255,0.1)" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Count" fill="url(#incomeGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="data-chart-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="data-chart-title">
              <Hash size={16} style={{ color: 'var(--color-accent-purple)' }} />
              Credit Score Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={creditScoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="range" stroke="rgba(255,255,255,0.1)" />
                <YAxis stroke="rgba(255,255,255,0.1)" />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="creditGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="count" name="Count" stroke="#10b981" fill="url(#creditGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Feature Statistics */}
          <motion.div
            className="data-chart-card"
            style={{ gridColumn: '1 / -1' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="data-chart-title">
              <Filter size={16} style={{ color: 'var(--color-accent-amber)' }} />
              Feature Statistics
            </h3>
            <div className="feature-stats-list">
              <div className="feature-stat-row" style={{ fontWeight: 700, color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span>Feature</span>
                <span>Distribution</span>
                <span style={{ textAlign: 'right' }}>Min</span>
                <span style={{ textAlign: 'right' }}>Mean</span>
                <span style={{ textAlign: 'right' }}>Max</span>
              </div>
              {featureStats.map((f, i) => (
                <motion.div
                  key={f.name}
                  className="feature-stat-row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <span className="feature-stat-name">{f.name}</span>
                  <div className="feature-stat-bar">
                    <motion.div
                      className="feature-stat-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${f.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                      style={{ background: 'var(--gradient-primary)' }}
                    />
                  </div>
                  <span className="feature-stat-val">{f.min}</span>
                  <span className="feature-stat-val" style={{ fontWeight: 600, color: 'var(--color-accent-cyan)' }}>{f.mean}</span>
                  <span className="feature-stat-val">{f.max}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
