const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

/** PUBLIC_INTERFACE
 * getApiBase - returns the configured API base URL.
 */
export function getApiBase() {
  if (!API_BASE) {
    // Important runtime guidance in console to ensure .env is set.
    // eslint-disable-next-line no-console
    console.warn('REACT_APP_API_BASE_URL is not set. API calls will likely fail.');
  }
  return API_BASE;
}

function getAuthToken() {
  try {
    return localStorage.getItem('auth_token') || '';
  } catch {
    return '';
  }
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = getAuthToken();

  const merged = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  const res = await fetch(`${getApiBase()}${path}`, merged);
  const contentType = res.headers.get('content-type') || '';
  let body = null;
  if (contentType.includes('application/json')) {
    body = await res.json().catch(() => null);
  } else {
    body = await res.text().catch(() => null);
  }

  if (!res.ok) {
    const message = (body && body.detail) || res.statusText || 'Request failed';
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

// PUBLIC_INTERFACE
export const api = {
  /** GET JSON helper */
  get: (path) => request(path, { method: 'GET' }),

  /** POST JSON helper */
  post: (path, data) =>
    request(path, { method: 'POST', body: JSON.stringify(data) }),

  /** PUT JSON helper */
  put: (path, data) =>
    request(path, { method: 'PUT', body: JSON.stringify(data) }),

  /** DELETE helper */
  del: (path) => request(path, { method: 'DELETE' }),
};
