import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

// PUBLIC_INTERFACE
export default function Admin() {
  /** Admin operations: users (placeholder) and system info */
  const [users, setUsers] = useState([]);
  const [sys, setSys] = useState({});
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [u, s] = await Promise.all([
          api.get(ENDPOINTS.adminUsers()).catch(() => []),
          api.get('/').catch(() => ({ status: 'ok' })), // fallback to FastAPI health root if nothing else is available
        ]);
        if (mounted) {
          setUsers(u || []);
          setSys(s || {});
        }
      } catch (e) {
        setErr(e.message || 'Failed to load admin data');
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2 style={{ margin: '6px 0 16px' }}>Admin</h2>
      {err && <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>{err}</div>}
      <div className="grid cols-2">
        <div className="card">
          <div className="card-title">Users</div>
          <table className="table">
            <thead><tr><th>Username</th><th>Role</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={2} style={{ color: 'var(--muted)' }}>No users</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">System</div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(sys, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
