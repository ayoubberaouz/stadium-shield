import { useState, useEffect, useCallback } from 'react';
import { fetchAlerts } from './api';
import { io } from 'socket.io-client';

/**
 * Custom hook: uses WebSockets to receive new alerts in real-time.
 * Provides live data to any component that needs it (Dashboard, LiveAlerts, Alertes, etc.)
 *
 * @returns {{ alerts: Array, loading: boolean, error: string|null, refetch: Function }}
 */
export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      const data = await fetchAlerts();
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch to load historical alerts
    refetch();

    // Connect to WebSocket server
    const socket = io(`http://${window.location.hostname}:5000`);

    socket.on('new_alert', (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    socket.on('update_alert', (updatedFields) => {
      setAlerts((prev) => prev.map(a => 
        a._id === updatedFields._id ? { ...a, ...updatedFields } : a
      ));
    });

    socket.on('delete_alert', ({ _id }) => {
      setAlerts((prev) => prev.filter(a => a._id !== _id));
    });

    socket.on('clear_all_alerts', () => {
      setAlerts([]);
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  return { alerts, loading, error, refetch };
}

/**
 * Derive summary statistics from the full alerts array.
 * Used by Dashboard and Header components.
 */
export function useAlertStats(alerts) {
  const totalAlerts = alerts.length;
  const newAlerts = alerts.filter(a => a.status === 'new').length;
  const inProgressAlerts = alerts.filter(a => a.status === 'in_progress').length;
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved').length;

  const gunAlerts = alerts.filter(a => a.weapon_type === 'gun').length;
  const knifeAlerts = alerts.filter(a => a.weapon_type === 'knife').length;
  const violenceAlerts = alerts.filter(a => a.weapon_type === 'violence').length;

  return {
    totalAlerts,
    newAlerts,
    inProgressAlerts,
    resolvedAlerts,
    gunAlerts,
    knifeAlerts,
    violenceAlerts,
  };
}
