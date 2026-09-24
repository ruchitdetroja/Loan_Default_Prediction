import { motion } from 'framer-motion';
import {
  Brain, Database, Code2, Cpu, Globe, ExternalLink, Mail,
  BookOpen, Target, BarChart3, Layers, GitBranch, Sparkles
} from 'lucide-react';
import '../styles/About.css';

const team = [
  { name: 'Alex Chen', role: 'ML Engineer & Lead', initials: 'AC', gradient: 'linear-gradient(135deg, #00d4ff, #7c3aed)' },
  { name: 'Sarah Kumar', role: 'Data Scientist', initials: 'SK', gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)' },
  { name: 'James Wilson', role: 'Full Stack Developer', initials: 'JW', gradient: 'linear-gradient(135deg, #10b981, #00d4ff)' },
];

const techStack = [
  { name: 'Python', category: 'Backend', icon: '🐍', color: 'var(--color-accent-green-dim)' },
  { name: 'Scikit-learn', category: 'ML Framework', icon: '🔬', color: 'var(--color-accent-cyan-dim)' },
  { name: 'XGBoost', category: 'Classifier', icon: '🚀', color: 'var(--color-accent-purple-dim)' },
  { name: 'Pandas', category: 'Data Processing', icon: '🐼', color: 'var(--color-accent-amber-dim)' },
  { name: 'NumPy', category: 'Computation', icon: '📐', color: 'var(--color-accent-cyan-dim)' },
  { name: 'React', category: 'Frontend', icon: '⚛️', color: 'var(--color-accent-cyan-dim)' },
  { name: 'Vite', category: 'Build Tool', icon: '⚡', color: 'var(--color-accent-purple-dim)' },
  { name: 'Recharts', category: 'Visualization', icon: '📊', color: 'var(--color-accent-green-dim)' },
];

const timeline = [
  { date: 'Phase 1 — Research', title: 'Problem Definition & Data Collection', desc: 'Identified credit risk prediction as the target problem. Collected 255K+ loan records with 28 features.' },
  { date: 'Phase 2 — Exploration', title: 'Exploratory Data Analysis', desc: 'Performed statistical analysis, correlation studies, and data visualization to understand feature distributions and relationships.' },
  { date: 'Phase 3 — Engineering', title: 'Feature Engineering & Preprocessing', desc: 'Handled missing values, encoded categoricals, normalized numerical features, and engineered new features for model performance.' },
  { date: 'Phase 4 — Modeling', title: 'Model Development & Training', desc: 'Trained and evaluated multiple ML models including XGBoost, Random Forest, LightGBM, and Neural Networks.' },
  { date: 'Phase 5 — Tuning', title: 'Hyperparameter Optimization', desc: 'Used Bayesian optimization and grid search to fine-tune the XGBoost classifier, achieving 95.8% accuracy.' },
  { date: 'Phase 6 — Deployment', title: 'Web Application & Deployment', desc: 'Built an interactive React dashboard for real-time predictions and data exploration.' },
];

const methodology = [
  { num: '01', title: 'Data Preprocessing', desc: 'Clean, transform, and normalize the raw dataset.', color: '#00d4ff' },
  { num: '02', title: 'Feature Selection', desc: 'Identify the most predictive features using statistical tests.', color: '#7c3aed' },
  { num: '03', title: 'Model Training', desc: 'Train XGBoost with 5-fold cross-validation.', color: '#10b981' },
  { num: '04', title: 'Evaluation', desc: 'Measure performance with accuracy, AUC-ROC, and F1.', color: '#f59e0b' },
  { num: '05', title: 'Optimization', desc: 'Hyperparameter tuning for optimal performance.', color: '#ec4899' },
  { num: '06', title: 'Deployment', desc: 'Serve predictions via web interface.', color: '#00d4ff' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="about-page container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-purple"><BookOpen size={12} /> About</span>
          <h1 className="section-title">About This Project</h1>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            An end-to-end machine learning project for predicting loan defaults using advanced classification techniques
          </p>
        </motion.div>

        {/* Overview */}
        <div className="about-overview">
          <motion.div
            className="about-overview-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-cyan"><Sparkles size={12} /> Overview</span>
            <h2>Predicting Credit Risk <span className="gradient-text">with Machine Learning</span></h2>
            <p>
              This project tackles the critical challenge of predicting loan defaults using machine learning.
              By analyzing borrower profiles, credit history, and loan characteristics, our model identifies
              high-risk loans before they default — helping lenders make informed decisions and reduce financial losses.
            </p>
            <p>
              Our XGBoost-based model achieves 95.8% accuracy on the test set, with an AUC-ROC of 0.94.
              The model was trained on 255,000+ real-world loan records with 28 carefully engineered features,
              using 5-fold stratified cross-validation for robust performance estimation.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent-green)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                <Target size={14} /> 95.8% Accuracy
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent-cyan)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                <BarChart3 size={14} /> 0.94 AUC-ROC
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent-purple)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                <Database size={14} /> 255K+ Records
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-overview-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Layers size={16} style={{ color: 'var(--color-accent-cyan)' }} />
              Methodology Pipeline
            </h3>
            {methodology.map((step, i) => (
              <motion.div
                key={step.num}
                className="about-methodology-step"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="about-methodology-num"
                  style={{
                    background: `${step.color}22`,
                    color: step.color,
                    border: `1px solid ${step.color}44`,
                  }}
                >
                  {step.num}
                </div>
                <div className="about-methodology-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team */}
        <div className="about-team-header">
          <span className="badge badge-green"><Cpu size={12} /> Team</span>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            The people behind the prediction engine
          </p>
        </div>

        <div className="about-team-grid">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="about-team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="about-team-avatar" style={{ background: member.gradient }}>
                {member.initials}
              </div>
              <h3 className="about-team-name">{member.name}</h3>
              <span className="about-team-role">{member.role}</span>
              <div className="about-team-links">
                <a href="#" className="about-team-link" aria-label="Website"><Globe size={14} /></a>
                <a href="#" className="about-team-link" aria-label="Portfolio"><ExternalLink size={14} /></a>
                <a href="#" className="about-team-link" aria-label="Email"><Mail size={14} /></a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="about-tech-header">
          <span className="badge badge-cyan"><Code2 size={12} /> Stack</span>
          <h2 className="section-title">Technology Stack</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Built with modern tools and frameworks
          </p>
        </div>

        <div className="about-tech-grid">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="about-tech-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="about-tech-icon" style={{ background: tech.color }}>
                {tech.icon}
              </div>
              <span className="about-tech-name">{tech.name}</span>
              <span className="about-tech-category">{tech.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span className="badge badge-purple"><GitBranch size={12} /> Timeline</span>
          <h2 className="section-title">Project Milestones</h2>
        </div>

        <div className="about-timeline" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.date}
              className="about-timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="about-timeline-date">{item.date}</div>
              <div className="about-timeline-title">{item.title}</div>
              <div className="about-timeline-desc">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
