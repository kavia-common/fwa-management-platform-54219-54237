import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import Modal from '../components/ui/Modal';

// PUBLIC_INTERFACE
export default function Devices() {
  /** List and manage devices */
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [openDiscover, setOpenDiscover] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const items = await api.get(ENDPOINTS.devices());
        if (mounted) setDevices(items || []);
      } catch (e) {
        setErr(e.message || 'Failed to load devices');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ margin: '6px 0 16px' }}>Devices</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn secondary" onClick={() => setOpenDiscover(true)}>Discover</button>
          <button className="btn">Add Device</button>
        </div>
      </div>
      {loading && <div className="card">Loading...</div>}
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      {!loading && !err && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>IP</th>
                <th>RSSI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>
                    <span className={`status-dot ${d.status === 'online' ? 'status-online' : d.status === 'degraded' ? 'status-degraded' : 'status-offline'}`} />
                    {d.status}
                  </td>
                  <td>{d.ip}</td>
                  <td>{d.rssi ?? '—'}</td>
                  <td><Link className="btn ghost" to={`/devices/${encodeURIComponent(d.id)}`}>View</Link></td>
                </tr>
              ))}
              {devices.length === 0 && (
                <tr><td colSpan={6} style={{ color: 'var(--muted)' }}>No devices found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={openDiscover} title="Discover Devices" onClose={() => setOpenDiscover(false)} actions={
        <>
          <button className="btn ghost" onClick={() => setOpenDiscover(false)}>Cancel</button>
          <button className="btn" onClick={() => setOpenDiscover(false)}>Run Discovery</button>
        </>
      }>
        <p>Trigger a network scan to discover RDK-B FWA devices in your environment.</p>
      </Modal>
    </div>
  );
}
