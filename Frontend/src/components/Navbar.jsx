import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/predict', label: 'Predict' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/model', label: 'Model Insights' },
  { path: '/data', label: 'Data Explorer' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Brain size={20} />
            </div>
            <span className="gradient-text">LoanSense</span>
            <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400, fontSize: 'var(--font-size-sm)' }}>AI</span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link to="/predict" className="btn btn-primary navbar-cta">
            <Zap size={16} />
            Try Prediction
          </Link>

          <button
            className={`navbar-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/predict" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
          <Zap size={16} />
          Try Prediction
        </Link>
      </div>
    </>
  );
}
