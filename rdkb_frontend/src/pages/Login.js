import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

// PUBLIC_INTERFACE
export default function Login() {
  /** Simple login form */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '80vh', padding: 16 }}>
      <form onSubmit={submit} className="card" style={{ width: '100%', maxWidth: 420 }}>
        <h2 style={{ marginTop: 0, marginBottom: 4 }}>Welcome</h2>
        <div style={{ color: 'var(--muted)', marginBottom: 12 }}>
          Sign in to manage your RDK-B FWA devices.
        </div>
        {err && <div style={{ color: 'var(--error)', marginBottom: 8 }}>{err}</div>}
        <div style={{ display: 'grid', gap: 10 }}>
          <div>
            <div className="card-title">Username</div>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </div>
          <div>
            <div className="card-title">Password</div>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
