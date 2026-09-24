import { motion } from 'framer-motion';

export default function GaugeChart({ value = 0, size = 200, label = 'Risk Score' }) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfCircumference = circumference / 2;
  const progress = (value / 100) * halfCircumference;

  const getColor = (val) => {
    if (val <= 30) return '#10b981';
    if (val <= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getRiskLabel = (val) => {
    if (val <= 30) return 'Low Risk';
    if (val <= 60) return 'Medium Risk';
    return 'High Risk';
  };

  const color = getColor(value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={halfCircumference}
          initial={{ strokeDashoffset: halfCircumference }}
          animate={{ strokeDashoffset: halfCircumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        {/* Value text */}
        <text
          x={size / 2}
          y={size / 2 - 10}
          textAnchor="middle"
          fill={color}
          fontSize="32"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
        >
          {Math.round(value)}%
        </text>
        {/* Label */}
        <text
          x={size / 2}
          y={size / 2 + 16}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="12"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
        >
          {getRiskLabel(value)}
        </text>
      </svg>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}
