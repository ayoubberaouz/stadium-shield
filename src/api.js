// ============================================================
// Central API configuration for StadiumShield Dashboard
// Connects the React frontend to the Flask + MongoDB backend
// ============================================================

const API_BASE = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5000`;

/**
 * Fetch all alerts from the backend (sorted newest-first by the server).
 * @returns {Promise<Array>} Array of alert objects from MongoDB
 */
export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/api/alerts`);
  if (!res.ok) throw new Error(`Failed to fetch alerts: ${res.status}`);
  return res.json();
}

/**
 * Build the full URL for an evidence screenshot served by Flask.
 * @param {string} filename - The image filename (e.g. "incident_knife_20260419-142300.jpg")
 * @returns {string} Full URL to the evidence image
 */
export function getEvidenceUrl(filename) {
  return `${API_BASE}/evidence/${filename}`;
}

/**
 * Acknowledge / update the status of an alert
 * (Placeholder — extend server.py to support PATCH when ready)
 */
export async function updateAlertStatus(alertId, status) {
  const res = await fetch(`${API_BASE}/api/alerts/${alertId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed to update alert: ${res.status}`);
  return res.json();
}

/**
 * Delete a specific alert
 */
export async function deleteAlert(alertId) {
  const res = await fetch(`${API_BASE}/api/alerts/${alertId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete alert: ${res.status}`);
  return res.json();
}

/**
 * Clear all alerts from the database
 */
export async function clearAllAlerts() {
  const res = await fetch(`${API_BASE}/api/alerts`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to clear alerts: ${res.status}`);
  return res.json();
}

/**
 * Toggle camera inspection status
 */
export async function toggleCameraInspection(cameraId, active) {
  const res = await fetch(`${API_BASE}/api/inspection_status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ camera_id: cameraId, active }),
  });
  if (!res.ok) throw new Error(`Failed to toggle camera: ${res.status}`);
  return res.json();
}

export default API_BASE;
