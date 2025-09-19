import React from 'react';

// PUBLIC_INTERFACE
export default function Metric({ label, value, color }) {
  return (
    <div className="card" style={{ borderLeft: `4px solid ${color || 'var(--primary)'}` }}>
      <div className="card-title">{label}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}
