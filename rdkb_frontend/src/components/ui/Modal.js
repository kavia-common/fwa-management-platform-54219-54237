import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, actions }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong>{title}</strong>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <div style={{ marginBottom: 12 }}>{children}</div>
        {actions && <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>{actions}</div>}
      </div>
    </div>
  );
}
