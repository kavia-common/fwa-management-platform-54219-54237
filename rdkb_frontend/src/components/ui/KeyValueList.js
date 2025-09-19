import React from 'react';

// PUBLIC_INTERFACE
export default function KeyValueList({ data }) {
  return (
    <div className="card">
      <table className="table">
        <tbody>
          {Object.entries(data || {}).map(([key, val]) => (
            <tr key={key}>
              <th style={{ width: 220, color: 'var(--muted)', fontWeight: 500 }}>{key}</th>
              <td>{String(val)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
