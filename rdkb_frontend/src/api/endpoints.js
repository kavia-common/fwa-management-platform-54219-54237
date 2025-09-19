export const ENDPOINTS = {
  // Auth
  login: () => '/auth/login',
  logout: () => '/auth/logout',
  me: () => '/auth/me',

  // Devices
  devices: () => '/devices',
  deviceById: (id) => `/devices/${encodeURIComponent(id)}`,
  deviceActions: (id) => `/devices/${encodeURIComponent(id)}/actions`,

  // Config
  config: () => '/config',
  configApply: () => '/config/apply',

  // Monitoring
  metricsSummary: () => '/monitoring/summary',
  metricsDevice: (id) => `/monitoring/devices/${encodeURIComponent(id)}`,

  // Admin
  adminUsers: () => '/admin/users',
  adminSystem: () => '/admin/system',
};

// Note: Adjust above to match your backend routes.
// For convenience in early development if backend lacks endpoints,
// you can temporarily point to a mock server or adjust features.
