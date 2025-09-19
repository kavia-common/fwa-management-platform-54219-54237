import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/devices', label: 'Devices', icon: '🖧' },
  { to: '/config', label: 'Config', icon: '⚙️' },
  { to: '/monitoring', label: 'Monitoring', icon: '📈' },
  { to: '/admin', label: 'Admin', icon: '🔐' },
];

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar with navigation links */
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">R</div>
        <div>
          <div className="title">RDK-B FWA</div>
          <div className="subtitle">Ocean Professional</div>
        </div>
      </div>
      <nav>
        <ul>
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <span>{it.icon}</span>
                <span>{it.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
