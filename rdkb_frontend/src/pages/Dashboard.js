import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import Card from '../components/ui/Card';
import Metric from '../components/ui/Metric';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Overview metrics for the system */
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        // Try monitoring summary if available
        const data = await api.get(ENDPOINTS.metricsSummary());
        if (mounted) setSummary(data);
      } catch (e) {
        setErr(e.message || 'Failed to load summary');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 style={{ margin: '6px 0 16px' }}>Dashboard</h2>
      {loading && <div className="card">Loading...</div>}
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      {!loading && !err && (
        <>
          <div className="grid cols-4">
            <Metric label="Online Devices" value={summary?.onlineDevices ?? '-'} color="#10B981" />
            <Metric label="Offline Devices" value={summary?.offlineDevices ?? '-'} color="#EF4444" />
            <Metric label="Active Alerts" value={summary?.activeAlerts ?? '-'} color="#F59E0B" />
            <Metric label="Avg Throughput" value={summary?.avgThroughputGbps ?? '-'} />
          </div>
          <div className="grid cols-2" style={{ marginTop: 16 }}>
            <Card title="Network Health" value={summary?.networkHealth ?? '—'} />
            <Card title="Recent Activity">
              <ul>
                {(summary?.recentActivity || []).map((item, i) => (
                  <li key={i} style={{ padding: '6px 0', color: 'var(--muted)' }}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
