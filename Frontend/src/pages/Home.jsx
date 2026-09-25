import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Shield, BarChart3, Brain, Database, TrendingUp,
  ArrowRight, Sparkles, Target, Clock
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedCounter from '../components/AnimatedCounter';
import FeatureCard from '../components/FeatureCard';
import '../styles/Home.css';

const features = [
  {
    icon: Brain,
    title: 'Advanced ML Models',
    description: 'Powered by 5 classifiers — Logistic Regression, Random Forest, Decision Tree, AdaBoost & Bagging — for robust default prediction.',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Comprehensive risk scoring that evaluates multiple financial factors to provide accurate default probability.',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Interactive Analytics',
    description: 'Explore rich visualizations and dashboards that reveal patterns in loan performance and borrower behavior.',
    color: 'green',
  },
  {
    icon: Target,
    title: 'High Precision',
    description: 'Optimized for minimal false positives, ensuring reliable predictions that financial institutions can trust.',
    color: 'amber',
  },
  {
    icon: Database,
    title: 'Data-Driven Insights',
    description: 'Analyze 16 features from borrower profiles, credit history, and loan characteristics for comprehensive evaluation.',
    color: 'red',
  },
  {
    icon: Clock,
    title: 'Real-Time Predictions',
    description: 'Get instant loan default risk scores with our optimized inference pipeline. Fast, accurate, and reliable.',
    color: 'pink',
  },
];

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="home-hero">
        <ParticleBackground />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className="home-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="home-hero-badge">
              <div className="glow-dot"></div>
              <span>Machine Learning Project</span>
              <Sparkles size={14} style={{ color: 'var(--color-accent-amber)' }} />
            </div>

            <h1 className="home-hero-title">
              <span>Predict Loan</span>
              <span className="gradient-text">Defaults with AI</span>
            </h1>

            <p className="home-hero-desc">
              Leverage cutting-edge machine learning to assess credit risk and predict
              loan defaults with unprecedented accuracy. Make smarter lending decisions.
            </p>

            <div className="home-hero-actions">
              <Link to="/predict" className="btn btn-primary btn-lg">
                <Zap size={18} />
                Start Predicting
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                <BarChart3 size={18} />
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Orbs */}
        <div className="home-hero-visual">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="home-stats">
          <div className="stat-card">
            <span className="stat-value gradient-text">
              <AnimatedCounter end={95.8} suffix="%" decimals={1} />
            </span>
            <span className="stat-label">Model Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--color-accent-purple)' }}>
              <AnimatedCounter end={255000} suffix="+" />
            </span>
            <span className="stat-label">Predictions Made</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--color-accent-green)' }}>
              <AnimatedCounter end={16} />
            </span>
            <span className="stat-label">Features Analyzed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--color-accent-amber)' }}>
              <AnimatedCounter end={5} />
            </span>
            <span className="stat-label">ML Models</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <div className="home-features-header">
            <span className="badge badge-cyan">Features</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              A complete machine learning pipeline for loan default prediction,
              from data exploration to real-time inference.
            </p>
          </div>

          <div className="home-features-grid">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="home-how">
        <div className="container">
          <div className="home-how-header">
            <span className="badge badge-purple">How It Works</span>
            <h2 className="section-title">Three Simple Steps</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              From data input to risk assessment in seconds
            </p>
          </div>

          <div className="home-how-steps">
            {[
              {
                num: 1,
                title: 'Input Loan Data',
                desc: 'Enter borrower details including income, credit score, loan amount, and employment information.',
                cls: 'step-1',
              },
              {
                num: 2,
                title: 'AI Analysis',
                desc: 'Our ensemble of 5 ML models analyzes 16 features using classification and boosting techniques.',
                cls: 'step-2',
              },
              {
                num: 3,
                title: 'Get Results',
                desc: 'Receive an instant risk score with confidence levels and detailed factor breakdown.',
                cls: 'step-3',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="how-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className={`how-step-number ${step.cls}`}>{step.num}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <motion.div
            className="home-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-green">
              <TrendingUp size={12} />
              Ready to Start
            </span>
            <h2 className="home-cta-title">
              Make Smarter <span className="gradient-text">Lending Decisions</span>
            </h2>
            <p className="home-cta-desc">
              Try our prediction model now and see how AI can transform credit risk assessment.
            </p>
            <Link to="/predict" className="btn btn-primary btn-lg">
              <Zap size={18} />
              Start Free Prediction
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
