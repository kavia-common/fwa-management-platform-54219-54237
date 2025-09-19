import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, value, suffix, children, footer }) {
  return (
    <div className="card">
      {title && <div className="card-title">{title}</div>}
      {value !== undefined && (
        <div className="card-value">
          {value} {suffix || ''}
        </div>
      )}
      {children}
      {footer}
    </div>
  );
}
