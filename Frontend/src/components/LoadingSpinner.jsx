import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-16)',
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader size={32} style={{ color: 'var(--color-accent-cyan)' }} />
      </motion.div>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
        {text}
      </span>
    </div>
  );
}
