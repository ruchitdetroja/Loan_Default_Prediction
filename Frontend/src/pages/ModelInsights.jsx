import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  Brain, Target, Award, BarChart3, TrendingUp, Layers,
  Cpu, GitBranch, CheckCircle
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import '../styles/ModelInsights.css';

const perfMetrics = [
  { label: 'Accuracy', value: 95.8, color: '#00d4ff' },
  { label: 'Precision', value: 93.2, color: '#7c3aed' },
  { label: 'Recall', value: 91.5, color: '#10b981' },
  { label: 'F1 Score', value: 92.3, color: '#f59e0b' },
  { label: 'AUC-ROC', value: 94.0, color: '#ec4899' },
  { label: 'Specificity', value: 96.1, color: '#00d4ff' },
];

const rocData = Array.from({ length: 50 }, (_, i) => {
  const fpr = i / 49;
  const tpr = Math.min(1, Math.pow(fpr, 0.3) * 1.05);
  return { fpr: +(fpr * 100).toFixed(1), tpr: +(tpr * 100).toFixed(1), random: +(fpr * 100).toFixed(1) };
});

const lossData = Array.from({ length: 30 }, (_, i) => ({
  epoch: i + 1,
  trainLoss: 0.7 * Math.exp(-i / 8) + 0.05 + Math.random() * 0.01,
  valLoss: 0.75 * Math.exp(-i / 9) + 0.08 + Math.random() * 0.015,
}));

const modelComparison = [
  { name: 'XGBoost', accuracy: 95.8, precision: 93.2, recall: 91.5, f1: 92.3, auc: 94.0, winner: true },
  { name: 'Random Forest', accuracy: 93.4, precision: 90.8, recall: 89.2, f1: 90.0, auc: 91.5, winner: false },
  { name: 'LightGBM', accuracy: 95.1, precision: 92.5, recall: 90.8, f1: 91.6, auc: 93.2, winner: false },
  { name: 'Logistic Regression', accuracy: 87.2, precision: 84.5, recall: 82.1, f1: 83.3, auc: 86.8, winner: false },
  { name: 'Neural Network', accuracy: 94.6, precision: 91.9, recall: 90.1, f1: 91.0, auc: 93.0, winner: false },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="value" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
        </p>
      ))}
    </div>
  );
};

export default function ModelInsights() {
  return (
    <div className="page-wrapper">
      <div className="model-page container">
        <motion.div
          className="model-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-cyan"><Brain size={12} /> Machine Learning</span>
          <h1 className="section-title">Model Insights</h1>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Deep dive into model performance, metrics, and architecture details
          </p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <div className="model-perf-grid">
          {perfMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="model-perf-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="model-perf-value" style={{ color: m.color }}>
                <AnimatedCounter end={m.value} suffix="%" decimals={1} />
              </span>
              <span className="model-perf-label">{m.label}</span>
              <div className="model-perf-bar">
                <motion.div
                  className="model-perf-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                  style={{ background: m.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Details */}
        <div className="model-sections">
          {/* ROC Curve */}
          <motion.div
            className="model-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="model-section-title">
              <TrendingUp size={18} style={{ color: 'var(--color-accent-cyan)' }} />
              ROC Curve
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="fpr" label={{ value: 'False Positive Rate (%)', position: 'bottom', fill: '#64748b', fontSize: 11 }} stroke="rgba(255,255,255,0.1)" />
                <YAxis label={{ value: 'True Positive Rate (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} stroke="rgba(255,255,255,0.1)" />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="tpr" name="Model (AUC=0.94)" stroke="#00d4ff" fill="url(#rocGradient)" strokeWidth={2.5} />
                <Line type="linear" dataKey="random" name="Random" stroke="#475569" strokeDasharray="5 5" strokeWidth={1} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Confusion Matrix */}
          <motion.div
            className="model-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="model-section-title">
              <Layers size={18} style={{ color: 'var(--color-accent-purple)' }} />
              Confusion Matrix
            </h3>
            <div className="confusion-matrix">
              <div className="cm-header"></div>
              <div className="cm-header">Pred: No Default</div>
              <div className="cm-header">Pred: Default</div>

              <div className="cm-header" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>Actual: No Default</div>
              <div className="cm-cell" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <span className="cm-cell-value" style={{ color: '#10b981' }}>48,250</span>
                <span className="cm-cell-label">True Negative</span>
              </div>
              <div className="cm-cell" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <span className="cm-cell-value" style={{ color: '#ef4444' }}>1,960</span>
                <span className="cm-cell-label">False Positive</span>
              </div>

              <div className="cm-header" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>Actual: Default</div>
              <div className="cm-cell" style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <span className="cm-cell-value" style={{ color: '#f59e0b' }}>1,120</span>
                <span className="cm-cell-label">False Negative</span>
              </div>
              <div className="cm-cell" style={{ background: 'rgba(0, 212, 255, 0.12)', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                <span className="cm-cell-value" style={{ color: '#00d4ff' }}>12,170</span>
                <span className="cm-cell-label">True Positive</span>
              </div>
            </div>
          </motion.div>

          {/* Training Loss */}
          <motion.div
            className="model-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="model-section-title">
              <GitBranch size={18} style={{ color: 'var(--color-accent-green)' }} />
              Training & Validation Loss
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="epoch" stroke="rgba(255,255,255,0.1)" label={{ value: 'Epoch', position: 'bottom', fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="rgba(255,255,255,0.1)" label={{ value: 'Loss', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="trainLoss" name="Train Loss" stroke="#00d4ff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Model Architecture */}
          <motion.div
            className="model-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="model-section-title">
              <Cpu size={18} style={{ color: 'var(--color-accent-amber)' }} />
              Model Architecture
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { label: 'Algorithm', value: 'XGBoost (Gradient Boosting)', icon: Brain },
                { label: 'Estimators', value: '500 trees', icon: GitBranch },
                { label: 'Max Depth', value: '8 levels', icon: Layers },
                { label: 'Learning Rate', value: '0.05', icon: TrendingUp },
                { label: 'Features', value: '28 input features', icon: BarChart3 },
                { label: 'Training Samples', value: '204,000', icon: Target },
                { label: 'Validation Split', value: '20% holdout', icon: Award },
                { label: 'Cross Validation', value: '5-fold stratified', icon: CheckCircle },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--color-bg-glass)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  <item.icon size={14} style={{ color: 'var(--color-accent-cyan)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-text-tertiary)', minWidth: '130px' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Model Comparison Table */}
          <motion.div
            className="model-section-card full-width"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="model-section-title">
              <Award size={18} style={{ color: 'var(--color-accent-green)' }} />
              Model Comparison
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="model-comparison">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Accuracy</th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1 Score</th>
                    <th>AUC-ROC</th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map((m) => (
                    <tr key={m.name}>
                      <td>
                        <div className="model-name">
                          {m.name}
                          {m.winner && <span className="winner-badge">Best</span>}
                        </div>
                      </td>
                      <td className={m.winner ? 'best' : ''}>{m.accuracy}%</td>
                      <td className={m.winner ? 'best' : ''}>{m.precision}%</td>
                      <td className={m.winner ? 'best' : ''}>{m.recall}%</td>
                      <td className={m.winner ? 'best' : ''}>{m.f1}%</td>
                      <td className={m.winner ? 'best' : ''}>{m.auc}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
