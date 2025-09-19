import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import Card from '../components/ui/Card';
import KeyValueList from '../components/ui/KeyValueList';

// PUBLIC_INTERFACE
export default function DeviceDetail() {
  /** Device details and actions */
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const d = await api.get(ENDPOINTS.deviceById(id));
        if (mounted) setDevice(d);
      } catch (e) {
        setErr(e.message || 'Failed to load device');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  async function runAction(action) {
    setActionMsg('');
    try {
      await api.post(ENDPOINTS.deviceActions(id), { action });
      setActionMsg(`Action '${action}' invoked successfully.`);
    } catch (e) {
      setActionMsg(`Failed: ${e.message}`);
    }
  }

  return (
    <div>
      <h2 style={{ margin: '6px 0 16px' }}>Device {id}</h2>
      {loading && <div className="card">Loading...</div>}
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      {!loading && device && (
        <>
          <div className="grid cols-3">
            <Card title="Status" value={device.status} />
            <Card title="IP Address" value={device.ip} />
            <Card title="Last Seen" value={device.lastSeen || '—'} />
          </div>
          <div style={{ marginTop: 16 }} className="grid cols-2">
            <KeyValueList data={{
              Name: device.name,
              Model: device.model,
              Firmware: device.firmware,
              RSSI: device.rssi,
              SNR: device.snr,
              MAC: device.mac,
            }} />
            <div className="card">
              <div className="card-title">Actions</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn" onClick={() => runAction('reboot')}>Reboot</button>
                <button className="btn secondary" onClick={() => runAction('factory_reset')}>Factory Reset</button>
                <button className="btn ghost" onClick={() => runAction('refresh_status')}>Refresh Status</button>
              </div>
              {actionMsg && <div style={{ marginTop: 10, color: 'var(--muted)' }}>{actionMsg}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
