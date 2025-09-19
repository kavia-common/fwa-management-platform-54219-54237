import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './theme/ThemeProvider';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';
import Config from './pages/Config';
import Monitoring from './pages/Monitoring';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { AuthGuard } from './routes/AuthGuard';

// PUBLIC_INTERFACE
function App() {
  /** App shell with Ocean Professional theme and main routes */
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <div className="app-main">
            <Topbar />
            <div className="app-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/devices"
                  element={
                    <AuthGuard>
                      <Devices />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/devices/:id"
                  element={
                    <AuthGuard>
                      <DeviceDetail />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/config"
                  element={
                    <AuthGuard>
                      <Config />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/monitoring"
                  element={
                    <AuthGuard>
                      <Monitoring />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AuthGuard>
                      <Admin />
                    </AuthGuard>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
