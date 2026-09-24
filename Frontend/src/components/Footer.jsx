import { Link } from 'react-router-dom';
import { Brain, Globe, ExternalLink, Mail, Heart } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="navbar-logo-icon">
                <Brain size={18} />
              </div>
              <span className="gradient-text" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800 }}>
                LoanSense AI
              </span>
            </Link>
            <p className="footer-desc">
              Predicting loan defaults with cutting-edge machine learning. 
              Making credit risk assessment smarter, faster, and more accurate.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Website"><Globe size={18} /></a>
              <a href="#" className="footer-social" aria-label="Portfolio"><ExternalLink size={18} /></a>
              <a href="#" className="footer-social" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <Link to="/predict" className="footer-link">Prediction</Link>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
            <Link to="/model" className="footer-link">Model Insights</Link>
            <Link to="/data" className="footer-link">Data Explorer</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <Link to="/about" className="footer-link">About</Link>
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">API Reference</a>
            <a href="#" className="footer-link">Research Paper</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Technology</h4>
            <span className="footer-link">Python / Scikit-learn</span>
            <span className="footer-link">React / Vite</span>
            <span className="footer-link">XGBoost</span>
            <span className="footer-link">Pandas / NumPy</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 LoanSense AI. All rights reserved.</p>
          <p className="footer-made-with">
            Made with <Heart size={14} className="footer-heart" /> for ML Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
