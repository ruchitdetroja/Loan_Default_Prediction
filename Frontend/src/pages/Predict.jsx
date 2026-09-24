import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, DollarSign, Percent, Briefcase, Home as HomeIcon,
  CreditCard, TrendingUp, AlertTriangle, CheckCircle, Target,
  Shield, Info, User, Clock, BookOpen, Heart, Users, FileText
} from 'lucide-react';
import GaugeChart from '../components/GaugeChart';
import { predictLoan } from '../api';
import '../styles/Predict.css';

const initialForm = {
  age: '',
  income: '',
  loanAmount: '',
  creditScore: '',
  monthsEmployed: '',
  numCreditLines: '',
  interestRate: '',
  loanTerm: '',
  dtiRatio: '',
  education: '',
  employmentType: '',
  maritalStatus: '',
  hasMortgage: '',
  hasDependents: '',
  loanPurpose: '',
  hasCosigner: '',
  model: 'both',
};

export default function Predict() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Build payload with backend-expected column names
      const payload = {
        age: parseFloat(form.age) || 0,
        income: parseFloat(form.income) || 0,
        loanamount: parseFloat(form.loanAmount) || 0,
        creditscore: parseFloat(form.creditScore) || 0,
        monthsemployed: parseFloat(form.monthsEmployed) || 0,
        numcreditlines: parseFloat(form.numCreditLines) || 0,
        interestrate: parseFloat(form.interestRate) || 0,
        loanterm: parseFloat(form.loanTerm) || 0,
        dtiratio: parseFloat(form.dtiRatio) || 0,
        education: form.education || 0,
        employmenttype: form.employmentType || 0,
        maritalstatus: form.maritalStatus || 0,
        hasmortgage: form.hasMortgage || 0,
        hasdependents: form.hasDependents || 0,
        loanpurpose: form.loanPurpose || 0,
        hascosigner: form.hasCosigner || 0,
        model: form.model,
      };

      const data = await predictLoan(payload);

      // Build result from real API response
      const models = [];
      if (data.logistic_regression) {
        models.push({
          name: data.logistic_regression.name,
          prediction: data.logistic_regression.prediction,
          probability: data.logistic_regression.probability,
          riskStatus: data.logistic_regression.risk_status,
        });
      }
      if (data.random_forest) {
        models.push({
          name: data.random_forest.name,
          prediction: data.random_forest.prediction,
          probability: data.random_forest.probability,
          riskStatus: data.random_forest.risk_status,
        });
      }

      // Use primary result for gauge
      const primaryProb = models.length > 0 ? (models[0].probability ?? 0) : 0;
      const riskScore = Math.round(primaryProb * 100);

      setResult({
        riskScore,
        defaultProb: primaryProb * 100,
        riskStatus: data.risk_status,
        prediction: data.prediction,
        selectedModel: data.selected_model,
        models,
        factors: buildFactors(form),
      });
    } catch (err) {
      setError(err.message || 'Failed to connect to the prediction server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  // Build display-friendly risk factors from form inputs
  function buildFactors(f) {
    const creditScore = parseFloat(f.creditScore) || 0;
    const dti = parseFloat(f.dtiRatio) || 0;
    const intRate = parseFloat(f.interestRate) || 0;
    const income = parseFloat(f.income) || 1;
    const loanAmt = parseFloat(f.loanAmount) || 0;
    const loanToIncome = loanAmt / income;

    return [
      {
        label: 'Credit Score Impact',
        value: creditScore > 700 ? 'Low' : creditScore > 600 ? 'Medium' : 'High',
        pct: creditScore > 700 ? 25 : creditScore > 600 ? 55 : 85,
        color: creditScore > 700 ? '#10b981' : creditScore > 600 ? '#f59e0b' : '#ef4444',
      },
      {
        label: 'Debt-to-Income',
        value: `${dti || '—'}%`,
        pct: Math.min(dti * 2, 100),
        color: dti > 40 ? '#ef4444' : '#10b981',
      },
      {
        label: 'Loan-to-Income',
        value: `${(loanToIncome * 100).toFixed(0)}%`,
        pct: Math.min(loanToIncome * 100, 100),
        color: loanToIncome > 0.4 ? '#ef4444' : '#10b981',
      },
      {
        label: 'Interest Rate Risk',
        value: `${intRate}%`,
        pct: Math.min(intRate * 3, 100),
        color: intRate > 15 ? '#ef4444' : intRate > 10 ? '#f59e0b' : '#10b981',
      },
    ];
  }

  return (
    <div className="page-wrapper">
      <div className="predict-page container">
        <motion.div
          className="predict-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-cyan"><Target size={12} /> Prediction Engine</span>
          <h1 className="section-title">Loan Default Prediction</h1>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Enter borrower details below to get an AI-powered risk assessment
          </p>
        </motion.div>

        <div className="predict-layout">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="predict-form-card" onSubmit={handleSubmit}>
              <h2 className="predict-form-title">Borrower Information</h2>
              <p className="predict-form-subtitle">Fill in the loan application details</p>

              <div className="predict-form-grid">
                {/* Numeric Fields */}
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Age</label>
                  <input className="form-input" type="number" name="age" value={form.age} onChange={handleChange} placeholder="e.g. 35" />
                </div>

                <div className="form-group">
                  <label className="form-label"><DollarSign size={14} /> Annual Income</label>
                  <input className="form-input" type="number" name="income" value={form.income} onChange={handleChange} placeholder="e.g. 75000" />
                </div>

                <div className="form-group">
                  <label className="form-label"><DollarSign size={14} /> Loan Amount</label>
                  <input className="form-input" type="number" name="loanAmount" value={form.loanAmount} onChange={handleChange} placeholder="e.g. 15000" />
                </div>

                <div className="form-group">
                  <label className="form-label"><CreditCard size={14} /> Credit Score</label>
                  <input className="form-input" type="number" name="creditScore" value={form.creditScore} onChange={handleChange} placeholder="e.g. 720" />
                </div>

                <div className="form-group">
                  <label className="form-label"><Briefcase size={14} /> Months Employed</label>
                  <input className="form-input" type="number" name="monthsEmployed" value={form.monthsEmployed} onChange={handleChange} placeholder="e.g. 60" />
                </div>

                <div className="form-group">
                  <label className="form-label"><CreditCard size={14} /> Number of Credit Lines</label>
                  <input className="form-input" type="number" name="numCreditLines" value={form.numCreditLines} onChange={handleChange} placeholder="e.g. 4" />
                </div>

                <div className="form-group">
                  <label className="form-label"><Percent size={14} /> Interest Rate (%)</label>
                  <input className="form-input" type="number" step="0.01" name="interestRate" value={form.interestRate} onChange={handleChange} placeholder="e.g. 11.5" />
                </div>

                <div className="form-group">
                  <label className="form-label"><Clock size={14} /> Loan Term (months)</label>
                  <input className="form-input" type="number" name="loanTerm" value={form.loanTerm} onChange={handleChange} placeholder="e.g. 36" />
                </div>

                <div className="form-group">
                  <label className="form-label"><Percent size={14} /> Debt-to-Income Ratio</label>
                  <input className="form-input" type="number" step="0.01" name="dtiRatio" value={form.dtiRatio} onChange={handleChange} placeholder="e.g. 18.5" />
                </div>

                {/* Categorical Fields */}
                <div className="form-group">
                  <label className="form-label"><BookOpen size={14} /> Education</label>
                  <select className="form-select" name="education" value={form.education} onChange={handleChange}>
                    <option value="">Select Education</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><Briefcase size={14} /> Employment Type</label>
                  <select className="form-select" name="employmentType" value={form.employmentType} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><Heart size={14} /> Marital Status</label>
                  <select className="form-select" name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><HomeIcon size={14} /> Has Mortgage</label>
                  <select className="form-select" name="hasMortgage" value={form.hasMortgage} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><Users size={14} /> Has Dependents</label>
                  <select className="form-select" name="hasDependents" value={form.hasDependents} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><Target size={14} /> Loan Purpose</label>
                  <select className="form-select" name="loanPurpose" value={form.loanPurpose} onChange={handleChange}>
                    <option value="">Select Purpose</option>
                    <option value="Home">Home</option>
                    <option value="Auto">Auto</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><Shield size={14} /> Has Co-Signer</label>
                  <select className="form-select" name="hasCosigner" value={form.hasCosigner} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Model Selector — full width */}
                <div className="form-group full-width">
                  <label className="form-label"><Zap size={14} /> Model Selection</label>
                  <select className="form-select" name="model" value={form.model} onChange={handleChange}>
                    <option value="both">Both Models</option>
                    <option value="logistic">Logistic Regression</option>
                    <option value="random_forest">Random Forest</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary predict-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Zap size={18} />
                    </motion.div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Predict Default Risk
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Result Panel */}
          <motion.div
            className="predict-result-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="predict-result-card">
              <h3 className="predict-result-title">
                {result ? 'Prediction Result' : error ? 'Error' : 'Awaiting Input'}
              </h3>

              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="predict-error"
                  >
                    <div className="predict-error-icon">
                      <AlertTriangle size={28} />
                    </div>
                    <p className="predict-error-text">{error}</p>
                    <p className="predict-error-hint">
                      Make sure the Flask backend is running:<br />
                      <code>cd backend && python app.py</code>
                    </p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)', width: '100%' }}
                  >
                    <GaugeChart value={result.riskScore} size={220} label="Default Risk Score" />

                    {/* Per-model results */}
                    <div className="predict-model-results">
                      {result.models.map((m) => (
                        <div key={m.name} className="predict-model-card glass-card">
                          <div className="predict-model-name">{m.name}</div>
                          <div className="predict-model-stats">
                            <div>
                              <div className="predict-model-stat-label">Prediction</div>
                              <div className={`predict-model-stat-value ${m.prediction === 1 ? 'risk-high' : 'risk-low'}`}>
                                {m.prediction === 1 ? 'Default' : 'No Default'}
                              </div>
                            </div>
                            {m.probability !== null && (
                              <div>
                                <div className="predict-model-stat-label">Probability</div>
                                <div className={`predict-model-stat-value ${m.probability > 0.5 ? 'risk-high' : 'risk-low'}`}>
                                  {(m.probability * 100).toFixed(1)}%
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={`predict-model-status ${m.prediction === 1 ? 'status-danger' : 'status-safe'}`}>
                            {m.prediction === 1 ? (
                              <><AlertTriangle size={14} /> {m.riskStatus}</>
                            ) : (
                              <><CheckCircle size={14} /> {m.riskStatus}</>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Risk Factors */}
                    <div className="predict-factors">
                      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>Risk Factors</div>
                      {result.factors.map((f) => (
                        <div key={f.label} className="predict-factor">
                          <span className="predict-factor-label">{f.label}</span>
                          <span className="predict-factor-value" style={{ color: f.color }}>{f.value}</span>
                          <div className="predict-factor-bar">
                            <motion.div
                              className="predict-factor-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(f.pct, 100)}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              style={{ background: f.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overall recommendation */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                      background: result.prediction === 0 ? 'var(--color-accent-green-dim)' : 'var(--color-accent-red-dim)',
                      fontSize: 'var(--font-size-sm)', fontWeight: 600, width: '100%', justifyContent: 'center'
                    }}>
                      {result.prediction === 0 ? (
                        <><CheckCircle size={16} style={{ color: 'var(--color-accent-green)' }} /> <span style={{ color: 'var(--color-accent-green)' }}>Recommend Approval</span></>
                      ) : (
                        <><AlertTriangle size={16} style={{ color: 'var(--color-accent-red)' }} /> <span style={{ color: 'var(--color-accent-red)' }}>High Risk — Caution</span></>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="predict-result-placeholder"
                  >
                    <div className="predict-result-placeholder-icon">
                      <Target size={28} />
                    </div>
                    <p>Fill in the borrower details and click predict to see the AI-powered risk assessment.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Card */}
            <div className="predict-info-card">
              <h4><Info size={14} style={{ color: 'var(--color-accent-cyan)' }} /> Model Information</h4>
              <div className="predict-info-list">
                <div className="predict-info-item">
                  <Shield size={14} style={{ color: 'var(--color-accent-green)' }} />
                  <span>Logistic Regression & Random Forest</span>
                </div>
                <div className="predict-info-item">
                  <TrendingUp size={14} style={{ color: 'var(--color-accent-purple)' }} />
                  <span>ML models with probability estimation</span>
                </div>
                <div className="predict-info-item">
                  <Target size={14} style={{ color: 'var(--color-accent-cyan)' }} />
                  <span>16 features analyzed per prediction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
