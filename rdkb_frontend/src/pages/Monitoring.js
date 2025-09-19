import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import Card from '../components/ui/Card';

// PUBLIC_INTERFACE
export default function Monitoring() {
  /** Monitoring charts and tables (basic placeholders fed from backend summary) */
  const [summary, setSummary] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.get(ENDPOINTS.metricsSummary());
        if (mounted) setSummary(data);
      } catch (e) {
        setErr(e.message || 'Failed to load metrics');
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 style={{ margin: '6px 0 16px' }}>Monitoring</h2>
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      <div className="grid cols-2">
        <Card title="Throughput (Gbps)">
          <p style={{ color: 'var(--muted)' }}>
            Average: {summary?.avgThroughputGbps ?? '—'}
          </p>
          <div style={{ height: 120, background: 'linear-gradient(90deg, rgba(37,99,235,0.10), rgba(243,244,246,0.6))', borderRadius: 10 }} />
        </Card>
        <Card title="Latency (ms)">
          <p style={{ color: 'var(--muted)' }}>
            95th percentile: {summary?.p95LatencyMs ?? '—'}
          </p>
          <div style={{ height: 120, background: 'linear-gradient(90deg, rgba(245,158,11,0.15), rgba(243,244,246,0.6))', borderRadius: 10 }} />
        </Card>
      </div>
      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <Card title="Top Talkers">
          <table className="table">
            <thead><tr><th>Device</th><th>Traffic</th></tr></thead>
            <tbody>
              {(summary?.topTalkers || []).map((t, i) => (
                <tr key={i}><td>{t.device}</td><td>{t.trafficGbps} Gbps</td></tr>
              ))}
              {(!summary?.topTalkers || summary.topTalkers.length === 0) && <tr><td colSpan={2} style={{ color: 'var(--muted)' }}>No data</td></tr>}
            </tbody>
          </table>
        </Card>
        <Card title="Alerts">
          <ul>
            {(summary?.alerts || []).map((a, i) => (
              <li key={i} style={{ padding: '6px 0', color: a.severity === 'high' ? 'var(--error)' : 'var(--muted)' }}>
                [{a.severity}] {a.message}
              </li>
            ))}
            {(!summary?.alerts || summary.alerts.length === 0) && <li style={{ color: 'var(--muted)' }}>No alerts</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
