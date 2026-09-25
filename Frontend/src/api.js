/**
 * API layer for Loan Default Prediction
 *
 * Production requests go directly to the deployed Render backend.
 * In Vite dev mode (`npm run dev`), requests fall through to the
 * proxy defined in vite.config.js so you can still test against a
 * local Flask server if you like.
 */

const LIVE_BACKEND = 'https://loan-default-prediction-srjx.onrender.com';

/**
 * Pick the right base URL:
 *   – Production build  → always use the live Render URL
 *   – Dev server (Vite) → use the live Render URL directly (CORS is enabled on the backend)
 */
const API_BASE = LIVE_BACKEND;

/**
 * Send loan data to the backend for prediction.
 * @param {Object} formData - The loan application form data
 * @returns {Promise<Object>} - The prediction response
 */
export async function predictLoan(formData) {
  let response;
  try {
    response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  } catch (networkErr) {
    throw new Error(
      'Unable to reach the prediction server. The Render backend may be waking up — please wait 30-60 seconds and try again.'
    );
  }

  // Render returns an HTML error page when the service is down/crashed.
  // Check response.ok BEFORE attempting JSON parse to avoid confusing
  // "Unexpected token" errors.
  if (!response.ok) {
    // Try to extract a JSON error body; fall back to a clear message.
    let serverMsg = '';
    try {
      const errBody = await response.json();
      serverMsg = errBody.error || '';
    } catch {
      // Response was HTML or otherwise not JSON — ignore parse failure.
    }
    throw new Error(
      serverMsg ||
        `Server returned ${response.status}. The backend on Render may still be starting — please wait a moment and retry.`
    );
  }

  const data = await response.json();

  if (data.success === false) {
    throw new Error(data.error || 'Prediction failed.');
  }

  return data;
}

/**
 * Quick health-check — hits the root endpoint to see if the
 * backend is awake (Render free-tier spins down after inactivity).
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
