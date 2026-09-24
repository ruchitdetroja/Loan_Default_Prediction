const API_BASE = '/api';

/**
 * Send loan data to the backend for prediction.
 * @param {Object} formData - The loan application form data
 * @returns {Promise<Object>} - The prediction response
 */
export async function predictLoan(formData) {
  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.error || `Server error (${response.status})`);
  }

  return data;
}
