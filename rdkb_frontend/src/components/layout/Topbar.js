import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { logout } from '../../api/auth';

// PUBLIC_INTERFACE
export default function Topbar() {
  /** Top bar with search and quick actions */
  const { theme, setTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="search">
        <input
          className="input"
          placeholder="Search devices, configs, users..."
          aria-label="Search"
        />
        <button className="btn">Search</button>
      </div>
      <div className="badges">
        <div className="badge">Status: Healthy</div>
        <div className="badge">Env: {process.env.NODE_ENV}</div>
        <button
          className="btn ghost"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="btn secondary" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </header>
  );
}
