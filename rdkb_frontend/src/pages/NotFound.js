import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>404 - Not Found</h3>
        <p style={{ color: 'var(--muted)' }}>The page you requested does not exist.</p>
        <Link className="btn" to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
}
