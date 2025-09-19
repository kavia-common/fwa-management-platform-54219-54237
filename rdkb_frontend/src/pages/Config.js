import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

// PUBLIC_INTERFACE
export default function Config() {
  /** Configuration view for system-level settings */
  const [cfg, setCfg] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const c = await api.get(ENDPOINTS.config());
        if (mounted) setCfg(c || {});
      } catch (e) {
        setErr(e.message || 'Failed to load config');
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  function setField(key, value) {
    setCfg((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMsg(''); setErr('');
    try {
      await api.put(ENDPOINTS.config(), cfg);
      setMsg('Configuration saved.');
    } catch (e) {
      setErr(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function apply() {
    setSaving(true);
    setMsg(''); setErr('');
    try {
      await api.post(ENDPOINTS.configApply(), {});
      setMsg('Configuration apply triggered.');
    } catch (e) {
      setErr(e.message || 'Apply failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 style={{ margin: '6px 0 16px' }}>Configuration</h2>
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      <div className="card">
        <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
          <div>
            <div className="card-title">SSID</div>
            <input className="input" value={cfg.ssid || ''} onChange={(e) => setField('ssid', e.target.value)} />
          </div>
          <div>
            <div className="card-title">Channel</div>
            <input className="input" value={cfg.channel || ''} onChange={(e) => setField('channel', e.target.value)} />
          </div>
          <div>
            <div className="card-title">Bandwidth</div>
            <input className="input" value={cfg.bandwidth || ''} onChange={(e) => setField('bandwidth', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={save} disabled={saving}>Save</button>
            <button className="btn secondary" onClick={apply} disabled={saving}>Apply</button>
          </div>
          {msg && <div style={{ color: 'var(--muted)' }}>{msg}</div>}
        </div>
      </div>
    </div>
  );
}
