import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, index = 0, color = 'cyan' }) {
  const colorMap = {
    cyan: { bg: 'var(--color-accent-cyan-dim)', text: 'var(--color-accent-cyan)', glow: 'rgba(0, 212, 255, 0.2)' },
    purple: { bg: 'var(--color-accent-purple-dim)', text: 'var(--color-accent-purple)', glow: 'rgba(124, 58, 237, 0.2)' },
    green: { bg: 'var(--color-accent-green-dim)', text: 'var(--color-accent-green)', glow: 'rgba(16, 185, 129, 0.2)' },
    amber: { bg: 'var(--color-accent-amber-dim)', text: 'var(--color-accent-amber)', glow: 'rgba(245, 158, 11, 0.2)' },
    red: { bg: 'var(--color-accent-red-dim)', text: 'var(--color-accent-red)', glow: 'rgba(239, 68, 68, 0.2)' },
    pink: { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899', glow: 'rgba(236, 72, 153, 0.2)' },
  };

  const c = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: `0 8px 40px ${c.glow}` }}
      style={{ cursor: 'default' }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-md)',
          background: c.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-5)',
          color: c.text,
        }}
      >
        <Icon size={22} />
      </div>
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.7 }}>
        {description}
      </p>
    </motion.div>
  );
}
